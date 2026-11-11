/**
 * Base URL of the Rhea dashboard app (where /signin and /signup live).
 * Set VITE_APP_URL at deploy time, e.g. VITE_APP_URL=https://app.rhea.example
 * When unset, links stay on the same origin (local dev / combined deploys).
 */
const raw = import.meta.env.VITE_APP_URL as string | undefined;
export const APP_URL = (raw ?? "").replace(/\/$/, "");

/** Absolute link into the dashboard app, e.g. appLink("/signin"). */
export function appLink(path: string): string {
  return `${APP_URL}${path}`;
}
