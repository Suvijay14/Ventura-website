"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

/** Browser Supabase client for reading session / tokens in client components. */
export function createClient() {
  return createBrowserSupabaseClient();
}
