import { after } from "next/server";
import { NextResponse } from "next/server";
import { runStrategyPipeline } from "@/lib/strategy-pipeline";
import { createServerClient as createAdminSupabaseClient } from "@/lib/supabase";
import { getStrategyRouteUser } from "@/lib/strategy-route-auth";

interface RunBody {
  briefId?: string;
}

export async function POST(request: Request) {
  let body: RunBody;
  try {
    body = (await request.json()) as RunBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const briefId = body.briefId?.trim();
  if (!briefId) {
    return NextResponse.json({ error: "briefId is required" }, { status: 400 });
  }

  const { user, error: authError } = await getStrategyRouteUser(request);

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();

  const { data: row, error: rowError } = await admin
    .from("strategy_briefs")
    .select("id")
    .eq("id", briefId)
    .eq("created_by", user.id)
    .maybeSingle();

  if (rowError || !row) {
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });
  }

  after(async () => {
    try {
      await runStrategyPipeline(briefId, { rerun: true });
    } catch (e) {
      const admin = createAdminSupabaseClient();
      await admin
        .from("strategy_briefs")
        .update({
          status: "failed",
          current_phase: "complete",
          progress_pct: 100,
        })
        .eq("id", briefId);
      console.error("Strategy pipeline re-run failed", e);
    }
  });

  return NextResponse.json({ ok: true });
}
