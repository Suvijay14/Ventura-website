/**
 * Base URL for the Ventura MVP app (separate deployment / dev server).
 * Set NEXT_PUBLIC_MVP_URL in .env.local (e.g. http://localhost:3000).
 */
export function getMvpBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_MVP_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function mvpUrl(path: string): string {
  const base = getMvpBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
