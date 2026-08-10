# Pips & Liberty · Proof Over Hype

The landing site for the Pips & Liberty free trading-psychology community, built with
Next.js (App Router) and Tailwind CSS, and shipped as a static export to GitHub
Pages.

## Pages

| Route    | What it does                                                                     |
| -------- | -------------------------------------------------------------------------------- |
| `/`      | Link-in-bio hub: PU Prime signup, the community, the prop firm, and trust markers. |
| `/join/` | Lead-capture form plus a self-select router to the right next step.               |

`/join/` embeds a Google Form for lead capture (name, email, experience —
whatever fields the form asks), then a "which one are you?" question lets the
trader pick their own path, since Google Forms can't branch the page after
submitting:

| Choice                       | Panel shown                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| Already under Pips & Liberty  | WhatsApp invite, with an automatic hand-off after a short countdown |
| Unsure whose it is            | A pre-filled PU Prime migration email, copy or `mailto:` — see note below |
| Don't have one yet            | Open a live account first, then come back                         |

**Setting up the form:** create it in Google Forms, then paste its public link
(Send → the link icon) into `GOOGLE_FORM_URL` in
[`src/lib/site.ts`](src/lib/site.ts). Until then the page shows a small setup
notice instead of a broken embed. Google Forms don't auto-size in an iframe —
after pasting the real link, open the form standalone and adjust
`GOOGLE_FORM_EMBED_HEIGHT` to match.

**Finishing the account-migration flow:** the "unsure whose it is" panel was
originally written for Valetax's specific process (raise a ticket, then send a
templated email to Valetax's support address naming their partner code). PU
Prime's equivalent contact address, cc, and partner code aren't known yet, so
`reparent` in [`src/lib/site.ts`](src/lib/site.ts) is still placeholder values
and the panel shows a "coming soon" notice instead of guessing. Fill in `to`,
`cc` (optional), `partnerName`, and `partnerEmail` once you have the real PU
Prime details, and the full instructions + pre-filled email come back
automatically.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run serve      # preview the built export
npm run typecheck
npm run lint
```

`npm run build` runs a `postbuild` step,
[`scripts/flatten-segments.mjs`](scripts/flatten-segments.mjs), which works
around a Next.js 16.3 static-export bug: the per-route RSC prefetch payloads are
written to a path the client never requests, so prefetching `/join/` 404s
without it. The script is a no-op once Next fixes the naming.

## Editing content

Copy, outbound links, stats, and the migration email template all live in
[`src/lib/site.ts`](src/lib/site.ts). Changing a partner link or the follower
counts should not require touching any page markup.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the static export and publishes `out/` to GitHub Pages. Set
**Settings → Pages → Source** to **GitHub Actions** once.

`trailingSlash` is on so the live URLs (`/join/`) stay exactly as they were
before the rewrite.
