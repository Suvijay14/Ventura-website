// app/api/demo-requests/route.ts
// Uses service_role key to bypass RLS - protect this route in production (e.g. add auth)

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching demo requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch demo requests" },
      { status: 500 }
    );
  }
}
