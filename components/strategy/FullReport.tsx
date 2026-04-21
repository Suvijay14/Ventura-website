"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import type {
  CompetitiveLandscapeResult,
  FinancialSignalsResult,
  FullReportPayload,
  MarketIntelResult,
  QuickBriefResult,
  RiskIdentificationResult,
  StrategicOpportunitiesResult,
} from "@/lib/strategy-types";
import SourcesList from "@/components/strategy/SourcesList";

interface SourceRow {
  id: string;
  section: string | null;
  source_title: string | null;
  source_url: string | null;
  snippet: string | null;
  relevance_score: number | null;
}

interface FullReportProps {
  briefId: string;
  fullReport: FullReportPayload | null;
  quickBrief: QuickBriefResult | null;
  sources: SourceRow[];
}

const rank = (v: "low" | "medium" | "high") => (v === "high" ? 3 : v === "medium" ? 2 : 1);

const valueRank = (v: "low" | "medium" | "high" | "transformational") =>
  v === "transformational" ? 4 : v === "high" ? 3 : v === "medium" ? 2 : 1;

function SectionShell({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-[#E0E6EE] bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold text-[#0D1B2A] hover:bg-[#F4F6F9]"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open ? <div className="border-t border-[#E0E6EE] px-4 py-4">{children}</div> : null}
    </div>
  );
}

export default function FullReport({ briefId, fullReport, quickBrief, sources }: FullReportProps) {
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("company");

  const market = fullReport?.market_intel as MarketIntelResult | undefined;
  const competitive = fullReport?.competitive_landscape as CompetitiveLandscapeResult | undefined;
  const financial = fullReport?.financial_signals as FinancialSignalsResult | undefined;
  const risks = fullReport?.risk_identification as RiskIdentificationResult | undefined;
  const opportunities = fullReport?.strategic_opportunities as StrategicOpportunitiesResult | undefined;
  const exec = fullReport?.executive_summary?.executive_summary ?? "";
  const pipeline = fullReport?._pipeline;

  const sortedRisks = useMemo(() => {
    const list = risks?.risks ?? [];
    return [...list].sort(
      (a, b) => rank(b.likelihood) * rank(b.impact) - rank(a.likelihood) * rank(a.impact),
    );
  }, [risks]);

  const sortedOpps = useMemo(() => {
    const list = opportunities?.opportunities ?? [];
    return [...list].sort((a, b) => valueRank(b.value_potential) - valueRank(a.value_potential));
  }, [opportunities]);

  const toggle = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const rerun = async () => {
    await fetch("/api/strategy/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ briefId }),
    });
    window.location.reload();
  };

  const copyExec = async () => {
    if (!exec) return;
    await navigator.clipboard.writeText(exec);
  };

  return (
    <div id="full-report" className="mx-auto max-w-5xl px-4 py-10">
      {!expanded ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-md border border-[#E0E6EE] bg-white px-4 py-2 text-sm font-semibold text-[#0D1B2A] shadow-sm hover:border-[#1A3A5C]"
          >
            View Full Report
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <SectionShell
            title="1. Company & market overview"
            open={openSection === "company"}
            onToggle={() => toggle("company")}
          >
            {market ? (
              <div className="space-y-4 text-sm text-slate-700">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Fact label="Founding" value={market.founding_year} />
                  <Fact label="Headquarters" value={market.headquarters} />
                  <Fact label="Revenue (est.)" value={market.estimated_revenue} />
                  <Fact label="Employees (est.)" value={market.employee_count} />
                  <Fact label="Business model" value={market.business_model} className="sm:col-span-2" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric label="TAM" value={market.market_size_tam} />
                  <Metric label="SAM" value={market.market_size_sam} />
                  <Metric label="Growth" value={market.market_growth_rate} />
                </div>
                <p className="text-xs font-semibold text-[#1A3A5C]">Market maturity</p>
                <span className="inline-block rounded-md border border-[#E0E6EE] bg-[#F4F6F9] px-2 py-1 text-xs font-semibold capitalize text-[#0D1B2A]">
                  {market.market_maturity}
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#1A3A5C]">Key trends</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {market.key_market_trends.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <EmptyBlock />
            )}
          </SectionShell>

          <SectionShell
            title="2. Competitive landscape"
            open={openSection === "competitive"}
            onToggle={() => toggle("competitive")}
          >
            {competitive ? (
              <div className="space-y-4 text-sm">
                <div className="overflow-x-auto rounded-md border border-[#E0E6EE]">
                  <table className="min-w-full text-left text-xs">
                    <thead className="bg-[#F4F6F9] text-[#0D1B2A]">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Name</th>
                        <th className="px-3 py-2 font-semibold">Strengths</th>
                        <th className="px-3 py-2 font-semibold">Weaknesses</th>
                        <th className="px-3 py-2 font-semibold">Share (est.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitive.direct_competitors.map((c) => (
                        <tr key={c.name} className="border-t border-[#E0E6EE]">
                          <td className="px-3 py-2 font-medium text-[#0D1B2A]">{c.name}</td>
                          <td className="px-3 py-2 text-slate-700">{c.strengths}</td>
                          <td className="px-3 py-2 text-slate-700">{c.weaknesses}</td>
                          <td className="px-3 py-2 text-slate-700">{c.market_share_est}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap gap-2">
                  {competitive.competitive_moats.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-[#D5F5E3] px-2 py-1 text-xs font-medium text-[#1E8449]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {competitive.competitive_vulnerabilities.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-[#FADBD8] px-2 py-1 text-xs font-medium text-[#C0392B]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge label="Position" value={competitive.market_position} />
                  <Badge label="Disruption risk" value={competitive.disruption_risk} />
                </div>
              </div>
            ) : (
              <EmptyBlock />
            )}
          </SectionShell>

          <SectionShell
            title="3. Financial signals"
            open={openSection === "financial"}
            onToggle={() => toggle("financial")}
          >
            {financial ? (
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <p className="text-xs font-semibold text-[#1E8449]">Green flags</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {financial.financial_green_flags.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#C0392B]">Red flags</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {financial.financial_red_flags.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-[#1A3A5C]">Funding history</p>
                  <p className="mt-2 text-slate-700">{financial.funding_history}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:col-span-2 text-xs">
                  <Badge label="Revenue (est.)" value={financial.revenue_estimate} />
                  <Badge label="Growth signal" value={financial.revenue_growth_signal} />
                  <Badge label="Profitability" value={financial.profitability_signal} />
                </div>
              </div>
            ) : (
              <EmptyBlock />
            )}
          </SectionShell>

          <SectionShell
            title="4. Risk matrix"
            open={openSection === "risks"}
            onToggle={() => toggle("risks")}
          >
            {sortedRisks.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {sortedRisks.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-4 text-sm shadow-sm"
                  >
                    <span className="inline-block rounded-md bg-white px-2 py-1 text-xs font-semibold capitalize text-[#0D1B2A]">
                      {r.category}
                    </span>
                    <p className="mt-2 font-semibold text-[#0D1B2A]">{r.title}</p>
                    <p className="mt-2 text-slate-700">{r.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <Badge label="Likelihood" value={r.likelihood} warn />
                      <Badge label="Impact" value={r.impact} warn />
                    </div>
                    <p className="mt-3 text-xs text-slate-600">
                      <span className="font-semibold text-[#1A3A5C]">Mitigation: </span>
                      {r.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyBlock />
            )}
          </SectionShell>

          <SectionShell
            title="5. Strategic opportunities"
            open={openSection === "opportunities"}
            onToggle={() => toggle("opportunities")}
          >
            {sortedOpps.length ? (
              <div className="space-y-3 text-sm">
                {sortedOpps.map((o) => (
                  <div key={o.title} className="rounded-md border border-[#E0E6EE] bg-white p-4 shadow-sm">
                    <p className="font-semibold text-[#0D1B2A]">{o.title}</p>
                    <p className="mt-2 text-slate-700">{o.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <Badge label="Horizon" value={o.time_horizon} />
                      <Badge label="Value" value={o.value_potential} />
                      <Badge label="Effort" value={o.effort_required} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyBlock />
            )}
          </SectionShell>

          <SectionShell
            title="6. Executive summary"
            open={openSection === "exec"}
            onToggle={() => toggle("exec")}
          >
            <blockquote className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-4 text-sm leading-relaxed text-slate-800">
              {exec || "Summary not available."}
            </blockquote>
            <button
              type="button"
              onClick={() => void copyExec()}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#E0E6EE] bg-white px-3 py-2 text-xs font-semibold text-[#0D1B2A] shadow-sm hover:border-[#1A3A5C]"
            >
              <Copy className="h-4 w-4" aria-hidden />
              Copy to clipboard
            </button>
          </SectionShell>

          <SectionShell
            title="7. Sources & research basis"
            open={openSection === "sources"}
            onToggle={() => toggle("sources")}
          >
            <SourcesList sources={sources} />
          </SectionShell>

          <SectionShell
            title="8. Research metadata"
            open={openSection === "meta"}
            onToggle={() => toggle("meta")}
          >
            <dl className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold text-slate-500">Run time</dt>
                <dd>{pipeline?.run_time_ms ? `${Math.round(pipeline.run_time_ms / 1000)}s` : "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">Agents completed</dt>
                <dd>{pipeline?.agents_completed ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">Model</dt>
                <dd>{pipeline?.model ?? "gemini-2.5-flash"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">Completed</dt>
                <dd>{pipeline?.completed_at ?? "—"}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => void rerun()}
              className="mt-4 rounded-md bg-[#0D1B2A] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
            >
              Re-run Research
            </button>
            {quickBrief?.research_limitations?.length ? (
              <p className="mt-3 text-xs text-slate-500">
                Limitations: {quickBrief.research_limitations.join(" · ")}
              </p>
            ) : null}
          </SectionShell>
        </div>
      )}
    </div>
  );
}

function Fact({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-[#0D1B2A]">{value && String(value).trim() ? value : "—"}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-[#0D1B2A]">{value || "—"}</p>
    </div>
  );
}

function Badge({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-semibold capitalize ${
        warn ? "border-[#E8A838] bg-[#FDEBD0] text-[#0D1B2A]" : "border-[#E0E6EE] bg-white text-[#0D1B2A]"
      }`}
    >
      {label}: {value}
    </span>
  );
}

function EmptyBlock() {
  return <p className="text-sm text-slate-500">This section was skipped or had no usable output.</p>;
}
