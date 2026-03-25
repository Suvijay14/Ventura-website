/**
 * Base URL for the Ventura MVP app (separate deployment / dev server).
 *
 * - Local `next dev`: defaults to http://localhost:3000 when unset.
 * - Production (including Vercel): must set NEXT_PUBLIC_MVP_URL — never localhost.
 */

function trimTrailingSlashes(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getMvpBaseUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_MVP_URL?.trim();
  if (fromEnv) return trimTrailingSlashes(fromEnv);

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  return null;
}

/** Full URL to MVP login, or null if production and NEXT_PUBLIC_MVP_URL is missing. */
export function mvpLoginUrl(): string | null {
  const base = getMvpBaseUrl();
  if (!base) return null;
  return `${base}/login`;
}
