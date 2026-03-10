// lib/supabase.ts

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as unknown as SupabaseClient);

// Server-side client with service role (bypasses RLS - use only in API routes)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server credentials");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

// Types
export interface DemoRequest {
  id?: string;
  email: string;
  company?: string;
  name?: string;
  created_at?: string;
  status?: "pending" | "contacted" | "completed";
  notes?: string;
}
