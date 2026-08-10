import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files — emit a fully static site into `out/`.
  output: "export",
  // Keeps the existing public URLs (`/join/`) byte-for-byte identical.
  trailingSlash: true,
  // Served from github.com/jef000/pips-liberty, so GitHub Pages publishes it
  // under /pips-liberty/ rather than at the domain root.
  basePath: "/pips-liberty",
  assetPrefix: "/pips-liberty",
};

export default nextConfig;
