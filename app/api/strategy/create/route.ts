import { after } from "next/server";
import { NextResponse } from "next/server";
import { runStrategyPipeline } from "@/lib/strategy-pipeline";
import { createServerClient } from "@/lib/supabase";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server";
import type { ResearchDepth, StrategyInputType } from "@/lib/strategy-types";

interface CreateBody {
  situation: string;
  company?: string;
  documentName?: string | null;
  documentContent?: string | null;
  researchDepth?: ResearchDepth;
}

function buildRawInput(situation: string, company?: string) {
  const c = company?.trim();
  if (!c) return situation.trim();
  return `Company/target anchor: ${c}\n\n${situation.trim()}`;
}

function deriveInputType(
  situation: string,
  documentContent: string | null | undefined,
): StrategyInputType {
  const hasDoc = Boolean(documentContent?.trim());
  const hasText = Boolean(situation.trim());
  if (hasDoc && hasText) return "both";
  if (hasDoc) return "document";
  return "text";
}

export async function POST(request: Request) {
  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const situation = body.situation?.trim() ?? "";
  if (!situation || situation.length > 5000) {
    return NextResponse.json({ error: "Situation is required (max 5000 characters)." }, { status: 400 });
  }

  const researchDepth: ResearchDepth =
    body.researchDepth === "quick" || body.researchDepth === "deep" ? body.researchDepth : "deep";

  const documentContent = body.documentContent?.trim() ? body.documentContent : null;
  const documentName = body.documentName?.trim() ? body.documentName : null;

  if (documentContent && documentContent.length > 1_200_000) {
    return NextResponse.json({ error: "Extracted document text is too large." }, { status: 400 });
  }

  const supabase = await createSupabaseRouteHandlerClient();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("org_id")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr || !profile?.org_id) {
    return NextResponse.json({ error: "Profile or organisation not found." }, { status: 400 });
  }

  const rawInput = buildRawInput(situation, body.company);
  const inputType = deriveInputType(situation, documentContent);
  const title = situation.slice(0, 80) + (situation.length > 80 ? "…" : "");

  const initialReport = {
    _pipeline: {
      research_depth: researchDepth,
    },
  };

  const { data: inserted, error: insertErr } = await supabase
    .from("strategy_briefs")
    .insert({
      org_id: profile.org_id,
      created_by: user.id,
      title,
      input_type: inputType,
      raw_input: rawInput,
      document_name: documentName,
      document_content: documentContent,
      status: "pending",
      current_phase: "pending",
      progress_pct: 0,
      full_report: initialReport,
    })
    .select("id")
    .single();

  if (insertErr || !inserted?.id) {
    return NextResponse.json({ error: insertErr?.message ?? "Insert failed" }, { status: 500 });
  }

  const briefId = inserted.id as string;

  after(async () => {
    try {
      await runStrategyPipeline(briefId);
    } catch (e) {
      const admin = createServerClient();
      await admin
        .from("strategy_briefs")
        .update({
          status: "failed",
          current_phase: "complete",
          progress_pct: 100,
        })
        .eq("id", briefId);
      console.error("Strategy pipeline failed", e);
    }
  });

  return NextResponse.json({ id: briefId });
}
