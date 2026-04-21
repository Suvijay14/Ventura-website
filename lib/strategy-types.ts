export type StrategyBriefStatus =
  | "pending"
  | "researching"
  | "brief_ready"
  | "complete"
  | "failed";

export type StrategyInputType = "text" | "document" | "both";

export type ResearchDepth = "quick" | "deep";

export type StrategyPhaseKey =
  | "pending"
  | "parsing"
  | "market_intel"
  | "competitive"
  | "financial"
  | "risks"
  | "opportunities"
  | "brief"
  | "summary"
  | "complete";

export interface StrategySourceRow {
  title: string;
  url: string;
  snippet: string;
}

export interface SituationParserResult {
  situation_type:
    | "acquisition"
    | "market_entry"
    | "competitive"
    | "due_diligence"
    | "general";
  company_name: string | null;
  industry: string;
  geography: string;
  deal_size_estimate: string | null;
  key_question: string;
  context_summary: string;
  research_priorities: string[];
}

export interface MarketIntelResult {
  company_overview: string;
  founding_year: string | null;
  headquarters: string | null;
  estimated_revenue: string | null;
  employee_count: string | null;
  business_model: string;
  market_size_tam: string;
  market_size_sam: string;
  market_growth_rate: string;
  key_market_trends: string[];
  market_maturity: "emerging" | "growing" | "mature" | "declining";
  sources: StrategySourceRow[];
}

export interface CompetitiveLandscapeResult {
  direct_competitors: Array<{
    name: string;
    description: string;
    strengths: string;
    weaknesses: string;
    market_share_est: string;
  }>;
  indirect_competitors: Array<{
    name: string;
    description: string;
    threat_level: "low" | "medium" | "high";
  }>;
  competitive_moats: string[];
  competitive_vulnerabilities: string[];
  market_position: "leader" | "challenger" | "niche" | "emerging";
  disruption_risk: "low" | "medium" | "high";
  sources: StrategySourceRow[];
}

export interface FinancialSignalsResult {
  revenue_estimate: string;
  revenue_growth_signal: "accelerating" | "stable" | "declining" | "unknown";
  profitability_signal: "profitable" | "breakeven" | "loss-making" | "unknown";
  funding_history: string;
  valuation_estimate: string | null;
  financial_red_flags: string[];
  financial_green_flags: string[];
  burn_rate_signal: string | null;
  sources: StrategySourceRow[];
}

export interface RiskIdentificationResult {
  risk_summary: string;
  risks: Array<{
    category:
      | "strategic"
      | "regulatory"
      | "operational"
      | "financial"
      | "reputational"
      | "technology";
    title: string;
    description: string;
    likelihood: "low" | "medium" | "high";
    impact: "low" | "medium" | "high";
    mitigation: string;
  }>;
  regulatory_environment: string;
  eu_ai_act_relevance: string | null;
}

export interface StrategicOpportunitiesResult {
  opportunity_summary: string;
  opportunities: Array<{
    title: string;
    description: string;
    time_horizon: "immediate" | "1-2 years" | "3-5 years";
    value_potential: "low" | "medium" | "high" | "transformational";
    effort_required: "low" | "medium" | "high";
  }>;
  synergies: string[] | null;
  white_space: string;
}

export interface QuickBriefResult {
  title: string;
  situation: string;
  complication: string;
  key_question: string;
  answer: string;
  three_key_findings: Array<{ headline: string; detail: string }>;
  go_no_go: "go" | "no_go" | "conditional";
  confidence_score: number;
  go_no_go_rationale: string;
  conditions: string[] | null;
  immediate_next_steps: string[];
  research_limitations: string[];
}

export interface ExecutiveSummaryResult {
  executive_summary: string;
}

export interface FullReportPayload {
  _pipeline?: {
    research_depth: ResearchDepth;
    model: string;
    started_at: string;
    completed_at?: string;
    run_time_ms?: number;
    agents_completed: number;
  };
  situation_parser?: SituationParserResult;
  market_intel?: MarketIntelResult;
  competitive_landscape?: CompetitiveLandscapeResult;
  financial_signals?: FinancialSignalsResult;
  risk_identification?: RiskIdentificationResult;
  strategic_opportunities?: StrategicOpportunitiesResult;
  quick_brief_agent?: QuickBriefResult;
  executive_summary?: ExecutiveSummaryResult;
  errors?: Record<string, string>;
}

export interface StrategyBriefRow {
  id: string;
  org_id: string;
  created_by: string | null;
  title: string;
  input_type: StrategyInputType;
  raw_input: string | null;
  document_name: string | null;
  document_content: string | null;
  status: StrategyBriefStatus;
  current_phase: string | null;
  progress_pct: number | null;
  quick_brief: QuickBriefResult | null;
  full_report: FullReportPayload | null;
  go_no_go: string | null;
  confidence_score: number | null;
  created_at: string;
  completed_at: string | null;
}
