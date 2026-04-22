import type { User } from "@supabase/supabase-js";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server";

/**
 * Resolve the signed-in user for Strategy API routes: cookie session first,
 * then `Authorization: Bearer <access_token>` via the same SSR client’s
 * `getUser(jwt)` (cookie + Bearer paths share one anon client).
 */
export async function getStrategyRouteUser(request: Request): Promise<{
  user: User | null;
  error: unknown;
}> {
  const supabase = await createSupabaseRouteHandlerClient();
  const cookieRes = await supabase.auth.getUser();
  if (cookieRes.data.user && !cookieRes.error) {
    return { user: cookieRes.data.user, error: null };
  }

  const auth =
    request.headers.get("authorization") ?? request.headers.get("Authorization");
  const jwt = auth?.startsWith("Bearer ") ? auth.replace(/^Bearer\s+/i, "").trim() : null;
  if (!jwt) {
    return { user: null, error: cookieRes.error ?? new Error("Unauthorized") };
  }

  const jwtRes = await supabase.auth.getUser(jwt);
  if (jwtRes.data.user && !jwtRes.error) {
    return { user: jwtRes.data.user, error: null };
  }
  return { user: null, error: jwtRes.error ?? cookieRes.error ?? new Error("Unauthorized") };
}
