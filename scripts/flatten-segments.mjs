/**
 * Works around a Next.js static-export bug (seen in 16.3.0) where the
 * per-segment RSC prefetch payloads are written under a name the client never
 * asks for, so every prefetch on a nested route 404s.
 *
 *   exporter  → out/join/__next.join/__PAGE__.txt   (segment path keeps its "/")
 *   client    → out/join/__next.join.__PAGE__.txt   (segment path "/" → ".")
 *
 * Compare node_modules/next/dist/export/routes/app-page.js (writer) with
 * node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.js
 * (reader). This renames the files to match the reader.
 *
 * Self-healing: once Next writes flat names there is nothing left to match and
 * this becomes a no-op, so it is safe to leave in the build.
 */
import { readdir, rename, rmdir } from "node:fs/promises";
import { basename, dirname, join, relative, sep } from "node:path";

const OUT = "out";

/** Every file below `dir`, deepest included, as full paths. */
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    }),
  );
  return found.flat();
}

/** Directories named `__next…` — these hold the mis-pathed segment payloads. */
async function segmentDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const found = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const path = join(dir, entry.name);
        return entry.name.startsWith("__next") ? [path] : segmentDirs(path);
      }),
  );
  return found.flat();
}

/** Remove `dir` and anything below it, provided it is empty. */
async function pruneEmpty(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.isDirectory()) await pruneEmpty(join(dir, entry.name));
  }
  await rmdir(dir).catch(() => {});
}

let moved = 0;

for (const dir of await segmentDirs(OUT)) {
  for (const file of await filesIn(dir)) {
    // "__next.join" + "__PAGE__.txt" → "__next.join.__PAGE__.txt", written
    // beside the directory rather than inside it.
    const tail = relative(dir, file).split(sep).join(".");
    await rename(file, join(dirname(dir), `${basename(dir)}.${tail}`));
    moved += 1;
  }
  await pruneEmpty(dir);
}

console.log(
  moved
    ? `flatten-segments: renamed ${moved} RSC segment payload(s)`
    : "flatten-segments: nothing to do",
);
