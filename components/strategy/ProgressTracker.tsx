"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Circle } from "lucide-react";
import { strategyAuthorizedFetch } from "@/lib/strategy-authorized-fetch";
import type { ResearchDepth, StrategyBriefStatus } from "@/lib/strategy-types";

interface ProgressPayload {
  status: StrategyBriefStatus;
  current_phase: string | null;
  progress_pct: number;
  phase_label: string;
}

const DEEP_STEPS: Array<{ phase: string; label: string; est: string }> = [
  { phase: "parsing", label: "Situation parsing", est: "~1 min" },
  { phase: "market_intel", label: "Company & market intelligence", est: "~3 min" },
  { phase: "competitive", label: "Competitive landscape", est: "~2 min" },
  { phase: "financial", label: "Financial signals", est: "~2 min" },
  { phase: "risks", label: "Risk identification", est: "~2 min" },
  { phase: "opportunities", label: "Strategic opportunities", est: "~2 min" },
  { phase: "brief", label: "Quick brief", est: "~2 min" },
  { phase: "summary", label: "Executive summary", est: "~1 min" },
];

const QUICK_STEPS: Array<{ phase: string; label: string; est: string }> = [
  { phase: "parsing", label: "Situation parsing", est: "~1 min" },
  { phase: "market_intel", label: "Company & market intelligence", est: "~2 min" },
  { phase: "competitive", label: "Competitive landscape", est: "~1 min" },
  { phase: "brief", label: "Quick brief", est: "~1 min" },
  { phase: "summary", label: "Executive summary", est: "~1 min" },
];

function phaseToIndex(steps: Array<{ phase: string }>, phase: string | null, status: StrategyBriefStatus) {
  if (status === "complete" || status === "failed") {
    return steps.length;
  }
  const norm = phase === "pending" ? "parsing" : phase ?? "parsing";
  const idx = steps.findIndex((s) => s.phase === norm);
  if (idx === -1) {
    return 0;
  }
  return idx;
}

function estimateRemainingMinutes(progress: number): number {
  const remaining = Math.max(0, 100 - progress);
  return Math.max(1, Math.round((remaining / 100) * 12));
}

interface ProgressTrackerProps {
  briefId: string;
  researchDepth: ResearchDepth;
  onBriefReady: () => void;
}

export default function ProgressTracker({
  briefId,
  researchDepth,
  onBriefReady,
}: ProgressTrackerProps) {
  const steps = useMemo(
    () => (researchDepth === "quick" ? QUICK_STEPS : DEEP_STEPS),
    [researchDepth],
  );

  const [payload, setPayload] = useState<ProgressPayload | null>(null);
  const briefSignalRef = useRef(false);

  useEffect(() => {
    const ac = new AbortController();
    const cancelledRef = { current: false };

    const deliver = (next: ProgressPayload) => {
      if (cancelledRef.current) return;
      setPayload(next);
      if (next.status === "brief_ready" && !briefSignalRef.current) {
        briefSignalRef.current = true;
        onBriefReady();
      }
    };

    void (async () => {
      try {
        const res = await strategyAuthorizedFetch(`/api/strategy/status/${briefId}`, {
          signal: ac.signal,
        });
        if (!res.ok || !res.body) return;
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        while (!cancelledRef.current) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          for (;;) {
            const sep = buf.indexOf("\n\n");
            if (sep === -1) break;
            const block = buf.slice(0, sep);
            buf = buf.slice(sep + 2);
            const dataLine = block.split("\n").find((l) => l.startsWith("data:"));
            if (!dataLine) continue;
            try {
              const json = dataLine.replace(/^data:\s*/, "").trim();
              const next = JSON.parse(json) as ProgressPayload;
              deliver(next);
              if (next.status === "complete" || next.status === "failed") {
                cancelledRef.current = true;
                ac.abort();
                return;
              }
            } catch {
              /* ignore malformed chunk */
            }
          }
        }
      } catch {
        /* aborted or network */
      }
    })();

    return () => {
      cancelledRef.current = true;
      ac.abort();
    };
  }, [briefId, onBriefReady]);

  const pct = payload?.progress_pct ?? 0;
  const phase = payload?.current_phase ?? "pending";
  const label = payload?.phase_label ?? "Initialising research pipeline...";
  const status = payload?.status ?? ("researching" as StrategyBriefStatus);

  const currentIdx = phaseToIndex(steps, phase, status);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="min-h-[70vh] bg-white px-4 py-10"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-xs font-semibold tracking-wide text-[#0D1B2A]">
          VENTURA | Strategy Intelligence
        </p>
        <p className="mt-1 text-center text-xs text-slate-500">
          Structured research for high-stakes decisions
        </p>

        <div className="mt-10 rounded-md border border-[#E0E6EE] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-center text-xl font-semibold text-[#0D1B2A]">
            Researching your situation…
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Our AI research team is working through{" "}
            {researchDepth === "quick" ? "focused" : "eight"} analysis phases
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <div className="relative h-3 flex-1 overflow-hidden rounded-md bg-[#E0E6EE]">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#E8A838]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="w-12 text-right text-sm font-semibold text-[#0D1B2A]">
                {Math.round(pct)}%
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm italic text-slate-500">{label}</p>

          {status === "failed" ? (
            <p className="mt-6 text-center text-sm font-medium text-[#C0392B]">
              Research encountered an error. Any partial brief will appear when ready.
            </p>
          ) : null}

          <ul className="mt-8 space-y-3">
            {steps.map((s, i) => {
              const done = i < currentIdx || status === "complete";
              const active =
                i === currentIdx && status !== "complete" && status !== "failed" && status !== "brief_ready";
              return (
                <li key={s.phase} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5">
                    {done ? (
                      <Check className="h-5 w-5 text-[#1E8449]" aria-hidden />
                    ) : active ? (
                      <ArrowRight className="h-5 w-5 animate-pulse text-[#E8A838]" aria-hidden />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300" aria-hidden />
                    )}
                  </span>
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-medium text-[#0D1B2A]">{s.label}</span>
                    <span className="text-xs text-slate-500">{s.est}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 border-t border-[#E0E6EE] pt-6 text-center text-sm text-slate-600">
            <p>Estimated time remaining: ~{estimateRemainingMinutes(pct)} minutes</p>
            <p className="mt-2 text-xs text-slate-500">
              You can leave this page — we&apos;ll save your results
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
