import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server";

/**
 * Resolve the signed-in user for Strategy API routes: cookie session first,
 * then `Authorization: Bearer <access_token>` (same JWT the browser client holds).
 */
export async function getStrategyRouteUser(request: Request): Promise<{
  user: User | null;
  error: unknown;
}> {
  const cookieSb = await createSupabaseRouteHandlerClient();
  const cookieRes = await cookieSb.auth.getUser();
  if (cookieRes.data.user && !cookieRes.error) {
    return { user: cookieRes.data.user, error: null };
  }

  const auth =
    request.headers.get("authorization") ?? request.headers.get("Authorization");
  const jwt = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!jwt || !url || !anonKey) {
    return { user: null, error: cookieRes.error ?? new Error("Unauthorized") };
  }

  const tokenClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const jwtRes = await tokenClient.auth.getUser(jwt);
  if (jwtRes.data.user && !jwtRes.error) {
    return { user: jwtRes.data.user, error: null };
  }
  return { user: null, error: jwtRes.error ?? cookieRes.error ?? new Error("Unauthorized") };
}
