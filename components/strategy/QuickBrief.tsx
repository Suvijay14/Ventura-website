"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { QuickBriefResult } from "@/lib/strategy-types";
import GoNoGobadge from "@/components/strategy/GoNoGobadge";

interface QuickBriefProps {
  brief: QuickBriefResult;
  createdAt: string;
  completedAt: string | null;
  sourceCount: number;
}

function formatDurationMs(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function bannerClasses(verdict: QuickBriefResult["go_no_go"]) {
  if (verdict === "go") return "bg-[#D5F5E3]";
  if (verdict === "no_go") return "bg-[#FADBD8]";
  return "bg-[#FDEBD0]";
}

export default function QuickBrief({
  brief,
  createdAt,
  completedAt,
  sourceCount,
}: QuickBriefProps) {
  const [limOpen, setLimOpen] = useState(false);

  const durationLabel = useMemo(() => {
    const start = new Date(createdAt).getTime();
    const end = completedAt ? new Date(completedAt).getTime() : Date.now();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return "Research in progress";
    }
    return `Research completed in ${formatDurationMs(end - start)}`;
  }, [createdAt, completedAt]);

  const verdict = brief.go_no_go;

  const scrollToReport = () => {
    const el = document.getElementById("full-report");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const exportPdf = () => {
    window.print();
  };

  return (
    <div className="bg-white pb-28">
      <section className={`rounded-md px-4 py-6 sm:px-8 ${bannerClasses(verdict)}`}>
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <GoNoGobadge verdict={verdict} />
          <div className="sm:text-right">
            <p className="text-sm font-semibold text-[#0D1B2A]">
              Confidence: {brief.confidence_score}/100
            </p>
            <div className="mt-2 h-2 w-full max-w-xs rounded-md bg-white/80 sm:ml-auto">
              <div
                className="h-2 rounded-md bg-[#E8A838]"
                style={{ width: `${Math.min(100, Math.max(0, brief.confidence_score))}%` }}
              />
            </div>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-5xl text-sm italic text-slate-800">{brief.go_no_go_rationale}</p>
      </section>

      <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Situation</h3>
          <p className="mt-3 text-sm text-slate-700">{brief.situation}</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Complication</h3>
          <p className="mt-3 text-sm text-slate-700">{brief.complication}</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#1A3A5C]">Resolution</h3>
          <p className="mt-3 text-sm text-slate-800">{brief.answer}</p>
        </article>
      </div>

      <section className="mx-auto mt-10 max-w-5xl">
        <h3 className="text-lg font-semibold text-[#0D1B2A]">Key findings</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {brief.three_key_findings.slice(0, 3).map((f, idx) => (
            <article
              key={`${f.headline}-${idx}`}
              className="rounded-md border border-[#E0E6EE] border-l-4 border-l-[#E8A838] bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold text-[#E8A838]">
                {(idx + 1).toString().padStart(2, "0")}
              </p>
              <p className="mt-2 font-semibold text-[#0D1B2A]">{f.headline}</p>
              <p className="mt-2 text-sm text-slate-600">{f.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {verdict === "conditional" && brief.conditions && brief.conditions.length > 0 ? (
        <section className="mx-auto mt-10 max-w-5xl rounded-md bg-[#FDEBD0] px-5 py-5">
          <h3 className="font-semibold text-[#0D1B2A]">Conditions for a GO</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            {brief.conditions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto mt-10 max-w-5xl">
        <h3 className="text-lg font-semibold text-[#0D1B2A]">Recommended next steps</h3>
        <ol className="mt-4 space-y-3">
          {brief.immediate_next_steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-slate-800">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-[#E0E6EE] bg-[#F4F6F9] text-xs font-semibold text-[#0D1B2A]">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-8 max-w-5xl">
        <button
          type="button"
          onClick={() => setLimOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium text-slate-500"
        >
          {limOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          Research limitations
        </button>
        {limOpen ? (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            {brief.research_limitations.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <div className="no-print fixed bottom-0 left-0 right-0 z-20 border-t border-[#E0E6EE] bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            {durationLabel} · {sourceCount} source{sourceCount === 1 ? "" : "s"} found
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={scrollToReport}
              className="rounded-md bg-[#0D1B2A] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
            >
              View Full Report ↓
            </button>
            <button
              type="button"
              onClick={exportPdf}
              className="rounded-md border border-[#E0E6EE] bg-white px-3 py-2 text-xs font-semibold text-[#0D1B2A] shadow-sm hover:border-[#1A3A5C]"
            >
              Export PDF
            </button>
            <button
              type="button"
              className="rounded-md border border-[#E0E6EE] bg-white px-3 py-2 text-xs font-semibold text-[#0D1B2A] shadow-sm hover:border-[#1A3A5C]"
              onClick={() => {
                /* reserved for product wiring */
              }}
            >
              Save to Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
