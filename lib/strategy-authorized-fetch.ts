import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

/** Same-origin fetch with Supabase access token when the client holds a session. */
export async function strategyAuthorizedFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const sb = createBrowserSupabaseClient();
  const {
    data: { session },
  } = await sb.auth.getSession();
  const headers = new Headers(init?.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return fetch(input, {
    ...init,
    headers,
    credentials: init?.credentials ?? "same-origin",
  });
}
