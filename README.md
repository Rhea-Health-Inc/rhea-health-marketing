# Rhea Health — Marketing Site

The public marketing site for Rhea Health, split out of the original combined
Lovable project (`Rhea-Health-Inc/rhea-health`) on 2026-11-11.

## Pages

| Route      | Page                 |
| ---------- | -------------------- |
| `/`        | Home                 |
| `/about`   | About                |
| `/pricing` | Pricing              |
| `/loop`    | Rhea Loop (wearable) |

Sign in / sign up live in the dashboard app (`rhea-health-app`), not here.
Links to them are built with `src/lib/app-url.ts`.

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_APP_URL` — base URL of the dashboard app, e.g. `https://app.rhea.example`.
  Leave empty to keep auth links on the same origin (local dev).

## Development

```sh
npm install
npm run dev
npm run build   # production build
npm run lint    # eslint + prettier check
npx tsc --noEmit
```

Stack: TanStack Start (React 19, file-based routing), Vite, Tailwind CSS 4.

## Assets

The home hero video (`src/assets/hero-clinic.mp4`, with poster
`src/assets/hero-poster.jpg`) is a real file in the repo — the original
Lovable-hosted asset pointer was replaced on 2026-11-12 with a stock
consultation clip ("A Doctor Talking to his Patient" by olia danilevich,
Pexels video 4352136, Pexels License — free to use, no attribution required;
credited here as a courtesy). The file is muted by design and ships without
an audio track.
(The Rhea logo was resolved on 2026-11-11: `src/assets/rhea-logo.png` is the real file.)
