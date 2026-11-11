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

## Known issue carried over from the original project

The Rhea logo (`src/assets/rhea-logo.png.asset.json`) and the home hero video
(`src/assets/hero-clinic.mp4.asset.json`) are Lovable-hosted asset pointers —
their URLs (`/__l5e/assets-v1/…`) only resolve inside Lovable's hosting.
Drop the real `rhea-logo.png` / `hero-clinic.mp4` files into `src/assets/`
and update the imports in `src/components/clinik/Nav.tsx` and
`src/routes/index.tsx` before deploying anywhere else.
