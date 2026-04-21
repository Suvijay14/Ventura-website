import { GoogleGenAI } from "@google/genai";
import { createServerClient } from "@/lib/supabase";
import type {
  CompetitiveLandscapeResult,
  ExecutiveSummaryResult,
  FinancialSignalsResult,
  FullReportPayload,
  MarketIntelResult,
  QuickBriefResult,
  ResearchDepth,
  RiskIdentificationResult,
  SituationParserResult,
  StrategicOpportunitiesResult,
  StrategySourceRow,
} from "@/lib/strategy-types";

const MODEL = "gemini-2.5-flash";

function getAdmin() {
  return createServerClient();
}

export function parseModelJson<T>(raw: string): T {
  const trimmed = raw.trim();
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
  const inner = fence ? fence[1].trim() : trimmed;
  return JSON.parse(inner) as T;
}

async function generateJson(
  ai: GoogleGenAI,
  systemInstruction: string,
  userText: string,
): Promise<string> {
  const res = await ai.models.generateContent({
    model: MODEL,
    contents: userText,
    config: {
      temperature: 0.2,
      systemInstruction,
      responseMimeType: "application/json",
    },
  });
  const text = res.text;
  if (!text) {
    throw new Error("Empty model response");
  }
  return text;
}

async function mergeFullReport(briefId: string, patch: Partial<FullReportPayload>) {
  const admin = getAdmin();
  const { data, error } = await admin
    .from("strategy_briefs")
    .select("full_report")
    .eq("id", briefId)
    .single();
  if (error) throw error;
  const prev = (data?.full_report as FullReportPayload | null) ?? {};
  const { errors: patchErrors, ...restPatch } = patch;
  const next: FullReportPayload = {
    ...prev,
    ...restPatch,
  };
  if (patchErrors !== undefined) {
    next.errors = { ...(prev.errors ?? {}), ...patchErrors };
  }
  const { error: upErr } = await admin
    .from("strategy_briefs")
    .update({ full_report: next as unknown as Record<string, unknown> })
    .eq("id", briefId);
  if (upErr) throw upErr;
}

async function updateBrief(
  briefId: string,
  fields: Record<string, unknown>,
) {
  const admin = getAdmin();
  const { error } = await admin.from("strategy_briefs").update(fields).eq("id", briefId);
  if (error) throw error;
}

async function insertSources(
  briefId: string,
  orgId: string,
  section: string,
  sources: StrategySourceRow[],
) {
  if (sources.length === 0) return;
  const admin = getAdmin();
  const rows = sources.map((s, i) => ({
    brief_id: briefId,
    org_id: orgId,
    section,
    source_title: s.title,
    source_url: s.url,
    snippet: s.snippet,
    relevance_score: Math.max(0, 1 - i * 0.05),
  }));
  const { error } = await admin.from("strategy_sources").insert(rows);
  if (error) throw error;
}

async function clearSources(briefId: string) {
  const admin = getAdmin();
  await admin.from("strategy_sources").delete().eq("brief_id", briefId);
}

function emptySituationParser(): SituationParserResult {
  return {
    situation_type: "general",
    company_name: null,
    industry: "Unknown",
    geography: "Unknown",
    deal_size_estimate: null,
    key_question: "Strategic assessment",
    context_summary: "Insufficient structured output from the model.",
    research_priorities: [],
  };
}

function emptyMarketIntel(): MarketIntelResult {
  return {
    company_overview: "",
    founding_year: null,
    headquarters: null,
    estimated_revenue: null,
    employee_count: null,
    business_model: "",
    market_size_tam: "",
    market_size_sam: "",
    market_growth_rate: "",
    key_market_trends: [],
    market_maturity: "growing",
    sources: [],
  };
}

function emptyCompetitive(): CompetitiveLandscapeResult {
  return {
    direct_competitors: [],
    indirect_competitors: [],
    competitive_moats: [],
    competitive_vulnerabilities: [],
    market_position: "emerging",
    disruption_risk: "medium",
    sources: [],
  };
}

function emptyFinancial(): FinancialSignalsResult {
  return {
    revenue_estimate: "Unknown",
    revenue_growth_signal: "unknown",
    profitability_signal: "unknown",
    funding_history: "Unknown",
    valuation_estimate: null,
    financial_red_flags: [],
    financial_green_flags: [],
    burn_rate_signal: null,
    sources: [],
  };
}

function emptyRisks(): RiskIdentificationResult {
  return {
    risk_summary: "",
    risks: [],
    regulatory_environment: "",
    eu_ai_act_relevance: null,
  };
}

function emptyOpportunities(): StrategicOpportunitiesResult {
  return {
    opportunity_summary: "",
    opportunities: [],
    synergies: null,
    white_space: "",
  };
}

function emptyQuickBrief(): QuickBriefResult {
  return {
    title: "Strategic brief",
    situation: "",
    complication: "",
    key_question: "",
    answer: "",
    three_key_findings: [
      { headline: "Finding 1", detail: "" },
      { headline: "Finding 2", detail: "" },
      { headline: "Finding 3", detail: "" },
    ],
    go_no_go: "conditional",
    confidence_score: 0,
    go_no_go_rationale: "",
    conditions: null,
    immediate_next_steps: [],
    research_limitations: [],
  };
}

function emptyExecutiveSummary(): ExecutiveSummaryResult {
  return { executive_summary: "" };
}

export async function runStrategyPipeline(briefId: string, options?: { rerun?: boolean }) {
  const admin = getAdmin();
  const started = Date.now();
  const { data: brief, error: loadErr } = await admin
    .from("strategy_briefs")
    .select("*")
    .eq("id", briefId)
    .single();
  if (loadErr || !brief) {
    throw new Error(loadErr?.message ?? "Brief not found");
  }

  const orgId = brief.org_id as string;
  const rawInput = (brief.raw_input as string | null) ?? "";
  const documentContent = (brief.document_content as string | null) ?? "";
  const fullReportExisting = (brief.full_report as FullReportPayload | null) ?? {};
  const researchDepth: ResearchDepth =
    fullReportExisting._pipeline?.research_depth === "quick" ? "quick" : "deep";

  if (options?.rerun) {
    await clearSources(briefId);
    await updateBrief(briefId, {
      status: "researching",
      current_phase: "pending",
      progress_pct: 0,
      quick_brief: null,
      go_no_go: null,
      confidence_score: null,
      completed_at: null,
      full_report: {
        _pipeline: {
          research_depth: researchDepth,
          model: MODEL,
          started_at: new Date().toISOString(),
          agents_completed: 0,
        },
      } as unknown as Record<string, unknown>,
    });
  } else {
    await updateBrief(briefId, {
      status: "researching",
      current_phase: "parsing",
      progress_pct: 1,
      full_report: {
        ...fullReportExisting,
        _pipeline: {
          research_depth: researchDepth,
          model: MODEL,
          started_at: new Date().toISOString(),
          agents_completed: 0,
        },
      } as unknown as Record<string, unknown>,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    await updateBrief(briefId, {
      status: "failed",
      current_phase: "complete",
      progress_pct: 100,
    });
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const errors: Record<string, string> = {};

  const combinedContext = [
    "USER_SITUATION_TEXT:",
    rawInput,
    "",
    "UPLOADED_DOCUMENT_TEXT:",
    documentContent || "(none)",
    "",
    "NOTE: Any company/target anchor is included at the top of USER_SITUATION_TEXT if provided.",
  ].join("\n");

  let situation: SituationParserResult = emptySituationParser();
  let market: MarketIntelResult = emptyMarketIntel();
  let competitive: CompetitiveLandscapeResult = emptyCompetitive();
  let financial: FinancialSignalsResult = emptyFinancial();
  let risks: RiskIdentificationResult = emptyRisks();
  let opportunities: StrategicOpportunitiesResult = emptyOpportunities();
  let quick: QuickBriefResult = emptyQuickBrief();
  let execSummary: ExecutiveSummaryResult = emptyExecutiveSummary();

  const runQuickPath = researchDepth === "quick";

  /* ─── Agent 1 ─── */
  try {
    await updateBrief(briefId, { current_phase: "parsing", progress_pct: 5 });
    const text = await generateJson(
      ai,
      "You are a senior McKinsey-trained strategy analyst. Parse the input and extract structured intelligence. Reply with JSON only matching the requested shape.",
      `Extract JSON with keys: situation_type (acquisition|market_entry|competitive|due_diligence|general), company_name (string|null), industry, geography, deal_size_estimate (string|null), key_question, context_summary (3-4 sentences), research_priorities (array of 5-6 strings).\n\n${combinedContext}`,
    );
    situation = { ...emptySituationParser(), ...parseModelJson<Partial<SituationParserResult>>(text) };
    await mergeFullReport(briefId, { situation_parser: situation });
    await updateBrief(briefId, { progress_pct: runQuickPath ? 20 : 5 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    errors.agent1_situation_parser = msg;
    await mergeFullReport(briefId, { situation_parser: situation, errors: { ...errors } });
  }

  const companyName =
    (situation.company_name && situation.company_name.trim()) || "(not specified)";

  /* ─── Agent 2 ─── */
  try {
    await updateBrief(briefId, { current_phase: "market_intel", progress_pct: runQuickPath ? 35 : 20 });
    const text = await generateJson(
      ai,
      "You are a market intelligence analyst. Provide accurate, current market data. Always cite sources. If uncertain about a figure, say so explicitly — never fabricate numbers. JSON only.",
      `Using the situation JSON and company anchor, return JSON keys: company_overview, founding_year, headquarters, estimated_revenue, employee_count, business_model, market_size_tam, market_size_sam, market_growth_rate, key_market_trends (4-5 strings), market_maturity (emerging|growing|mature|declining), sources (array of {title,url,snippet}).\n\nSITUATION:\n${JSON.stringify(
        situation,
      )}\nCOMPANY_NAME:\n${companyName}`,
    );
    market = { ...emptyMarketIntel(), ...parseModelJson<Partial<MarketIntelResult>>(text) };
    await mergeFullReport(briefId, { market_intel: market });
    await insertSources(briefId, orgId, "Company & Market", market.sources ?? []);
    await updateBrief(briefId, { progress_pct: runQuickPath ? 55 : 20 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    errors.agent2_market_intel = msg;
    await mergeFullReport(briefId, { market_intel: market, errors: { ...errors } });
  }

  /* ─── Agent 3 ─── */
  try {
    await updateBrief(briefId, { current_phase: "competitive", progress_pct: runQuickPath ? 70 : 35 });
    const text = await generateJson(
      ai,
      "You are a competitive strategy analyst. JSON only. Use credible public sources in the sources array.",
      `Return JSON keys: direct_competitors (top 4-5 objects: name, description, strengths, weaknesses, market_share_est), indirect_competitors (top 3: name, description, threat_level low|medium|high), competitive_moats (strings), competitive_vulnerabilities (strings), market_position (leader|challenger|niche|emerging), disruption_risk (low|medium|high), sources[].\n\nSITUATION:\n${JSON.stringify(
        situation,
      )}\nMARKET:\n${JSON.stringify(market)}`,
    );
    competitive = {
      ...emptyCompetitive(),
      ...parseModelJson<Partial<CompetitiveLandscapeResult>>(text),
    };
    await mergeFullReport(briefId, { competitive_landscape: competitive });
    await insertSources(briefId, orgId, "Competitive", competitive.sources ?? []);
    await updateBrief(briefId, { progress_pct: runQuickPath ? 80 : 35 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    errors.agent3_competitive = msg;
    await mergeFullReport(briefId, { competitive_landscape: competitive, errors: { ...errors } });
  }

  /* ─── Agent 4 ─── */
  if (!runQuickPath) {
    try {
      await updateBrief(briefId, { current_phase: "financial", progress_pct: 48 });
      const text = await generateJson(
        ai,
        "You are a financial analyst specialising in M&A due diligence. Extract financial signals from public data only. Never fabricate financial figures. If data is unavailable, explicitly state that. JSON only.",
        `Return JSON keys: revenue_estimate, revenue_growth_signal (accelerating|stable|declining|unknown), profitability_signal (profitable|breakeven|loss-making|unknown), funding_history, valuation_estimate (string|null), financial_red_flags (strings), financial_green_flags (strings), burn_rate_signal (string|null), sources[].\n\nCONTEXT:\n${JSON.stringify(
          { situation, market, competitive },
        )}`,
      );
      financial = { ...emptyFinancial(), ...parseModelJson<Partial<FinancialSignalsResult>>(text) };
      await mergeFullReport(briefId, { financial_signals: financial });
      await insertSources(briefId, orgId, "Financial", financial.sources ?? []);
      await updateBrief(briefId, { progress_pct: 48 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      errors.agent4_financial = msg;
      await mergeFullReport(briefId, { financial_signals: financial, errors: { ...errors } });
    }
  }

  /* ─── Agent 5 ─── */
  if (!runQuickPath) {
    try {
      await updateBrief(briefId, { current_phase: "risks", progress_pct: 62 });
      const text = await generateJson(
        ai,
        "You are an enterprise risk officer. JSON only.",
        `Return JSON keys: risk_summary, risks (6-10 items with category strategic|regulatory|operational|financial|reputational|technology, title, description, likelihood low|medium|high, impact low|medium|high, mitigation), regulatory_environment, eu_ai_act_relevance (string|null).\n\nCONTEXT:\n${JSON.stringify(
          { situation, market, competitive, financial },
        )}`,
      );
      risks = { ...emptyRisks(), ...parseModelJson<Partial<RiskIdentificationResult>>(text) };
      await mergeFullReport(briefId, { risk_identification: risks });
      await updateBrief(briefId, { progress_pct: 62 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      errors.agent5_risks = msg;
      await mergeFullReport(briefId, { risk_identification: risks, errors: { ...errors } });
    }
  }

  /* ─── Agent 6 ─── */
  if (!runQuickPath) {
    try {
      await updateBrief(briefId, { current_phase: "opportunities", progress_pct: 74 });
      const text = await generateJson(
        ai,
        "You are a corporate strategy partner. JSON only.",
        `Return JSON keys: opportunity_summary, opportunities (4-6 items: title, description, time_horizon immediate|1-2 years|3-5 years, value_potential low|medium|high|transformational, effort_required low|medium|high), synergies (string[]|null), white_space.\n\nCONTEXT:\n${JSON.stringify(
          { situation, market, competitive, financial, risks },
        )}`,
      );
      opportunities = {
        ...emptyOpportunities(),
        ...parseModelJson<Partial<StrategicOpportunitiesResult>>(text),
      };
      await mergeFullReport(briefId, { strategic_opportunities: opportunities });
      await updateBrief(briefId, { progress_pct: 74 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      errors.agent6_opportunities = msg;
      await mergeFullReport(briefId, { strategic_opportunities: opportunities, errors: { ...errors } });
    }
  }

  /* ─── Agent 7 ─── */
  try {
    await updateBrief(briefId, { current_phase: "brief", progress_pct: runQuickPath ? 90 : 87 });
    const text = await generateJson(
      ai,
      "You are a senior strategy partner at a top-tier consulting firm. Write in the Pyramid Principle style — answer first, then support. Be direct. Make a clear recommendation. Never hedge with 'it depends' without specifying what it depends on. JSON only.",
      `Return JSON keys: title, situation, complication, key_question, answer, three_key_findings (exactly 3: headline, detail), go_no_go (go|no_go|conditional), confidence_score (0-100 integer), go_no_go_rationale, conditions (string[]|null), immediate_next_steps (3-5 strings), research_limitations (2-3 strings).\n\nRESEARCH:\n${JSON.stringify(
        {
          situation,
          market,
          competitive,
          financial,
          risks,
          opportunities,
        },
      )}`,
    );
    quick = { ...emptyQuickBrief(), ...parseModelJson<Partial<QuickBriefResult>>(text) };
    if (!quick.three_key_findings || quick.three_key_findings.length < 3) {
      quick.three_key_findings = emptyQuickBrief().three_key_findings;
    }
    await mergeFullReport(briefId, { quick_brief_agent: quick });
    await updateBrief(briefId, {
      status: "brief_ready",
      progress_pct: runQuickPath ? 93 : 87,
      quick_brief: quick as unknown as Record<string, unknown>,
      go_no_go: quick.go_no_go,
      confidence_score: quick.confidence_score,
      title: quick.title || (brief.title as string),
    });
    await scrubSensitiveFields(briefId);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    errors.agent7_quick_brief = msg;
    await updateBrief(briefId, {
      status: "failed",
      current_phase: "brief",
      progress_pct: 87,
    });
    await mergeFullReport(briefId, { quick_brief_agent: quick, errors: { ...errors } });
    await scrubSensitiveFields(briefId);
    return;
  }

  /* ─── Agent 8 ─── */
  try {
    await updateBrief(briefId, { current_phase: "summary", progress_pct: runQuickPath ? 97 : 95 });
    const text = await generateJson(
      ai,
      "You are an executive communications director. JSON only.",
      `Return JSON { "executive_summary": "<=150 words email-ready summary>" } based on:\nQUICK_BRIEF:\n${JSON.stringify(
        quick,
      )}\nRESEARCH:\n${JSON.stringify({ situation, market, competitive, financial, risks, opportunities })}`,
    );
    execSummary = { ...emptyExecutiveSummary(), ...parseModelJson<Partial<ExecutiveSummaryResult>>(text) };
    await mergeFullReport(briefId, { executive_summary: execSummary });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    errors.agent8_executive_summary = msg;
    await mergeFullReport(briefId, {
      executive_summary: execSummary,
      errors: { ...errors },
    });
  }

  const runTime = Date.now() - started;
  let agentsCompleted = 0;
  if (!errors.agent1_situation_parser) agentsCompleted += 1;
  if (!errors.agent2_market_intel) agentsCompleted += 1;
  if (!errors.agent3_competitive) agentsCompleted += 1;
  if (!runQuickPath && !errors.agent4_financial) agentsCompleted += 1;
  if (!runQuickPath && !errors.agent5_risks) agentsCompleted += 1;
  if (!runQuickPath && !errors.agent6_opportunities) agentsCompleted += 1;
  if (!errors.agent7_quick_brief) agentsCompleted += 1;
  if (!errors.agent8_executive_summary) agentsCompleted += 1;

  await mergeFullReport(briefId, {
    executive_summary: execSummary,
    errors: Object.keys(errors).length ? { ...errors } : undefined,
    _pipeline: {
      research_depth: researchDepth,
      model: MODEL,
      started_at: new Date(started).toISOString(),
      completed_at: new Date().toISOString(),
      run_time_ms: runTime,
      agents_completed: agentsCompleted,
    },
  });

  await updateBrief(briefId, {
    status: "complete",
    current_phase: "complete",
    progress_pct: 100,
    completed_at: new Date().toISOString(),
  });
}

async function scrubSensitiveFields(briefId: string) {
  await updateBrief(briefId, {
    document_content: null,
  });
}
