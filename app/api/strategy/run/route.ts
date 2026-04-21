import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { after } from "next/server";
import { NextResponse } from "next/server";
import { runStrategyPipeline } from "@/lib/strategy-pipeline";
import { createServerClient as createAdminSupabaseClient } from "@/lib/supabase";

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

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: row, error } = await supabase
    .from("strategy_briefs")
    .select("id")
    .eq("id", briefId)
    .maybeSingle();

  if (error || !row) {
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
