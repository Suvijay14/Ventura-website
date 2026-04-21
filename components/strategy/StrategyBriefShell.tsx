"use client";

import { useCallback, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import type {
  FullReportPayload,
  QuickBriefResult,
  ResearchDepth,
  StrategyBriefStatus,
} from "@/lib/strategy-types";
import FullReport from "@/components/strategy/FullReport";
import ProgressTracker from "@/components/strategy/ProgressTracker";
import QuickBrief from "@/components/strategy/QuickBrief";

export interface StrategyBriefInitial {
  id: string;
  status: StrategyBriefStatus;
  title: string;
  created_at: string;
  completed_at: string | null;
  quick_brief: QuickBriefResult | null;
  full_report: FullReportPayload | null;
}

export interface StrategySourceInitial {
  id: string;
  section: string | null;
  source_title: string | null;
  source_url: string | null;
  snippet: string | null;
  relevance_score: number | null;
}

export default function StrategyBriefShell({
  id,
  initial,
}: {
  id: string;
  initial: StrategyBriefInitial;
}) {
  const [row, setRow] = useState(initial);
  const [sources, setSources] = useState<StrategySourceInitial[]>([]);

  const refresh = useCallback(async () => {
    const sb = createBrowserSupabaseClient();
    const { data } = await sb.from("strategy_briefs").select("*").eq("id", id).maybeSingle();
    if (data) {
      setRow({
        id: data.id as string,
        status: data.status as StrategyBriefStatus,
        title: data.title as string,
        created_at: data.created_at as string,
        completed_at: (data.completed_at as string | null) ?? null,
        quick_brief: (data.quick_brief as QuickBriefResult | null) ?? null,
        full_report: (data.full_report as FullReportPayload | null) ?? null,
      });
    }
    const { data: src } = await sb.from("strategy_sources").select("*").eq("brief_id", id);
    if (src) {
      setSources(
        src.map((s) => ({
          id: s.id as string,
          section: (s.section as string | null) ?? null,
          source_title: (s.source_title as string | null) ?? null,
          source_url: (s.source_url as string | null) ?? null,
          snippet: (s.snippet as string | null) ?? null,
          relevance_score:
            typeof s.relevance_score === "number" ? s.relevance_score : (s.relevance_score as number | null),
        })),
      );
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (row.status === "complete" || row.status === "failed") {
      return undefined;
    }
    const t = setInterval(() => {
      void refresh();
    }, 5000);
    return () => clearInterval(t);
  }, [row.status, refresh]);

  const depth: ResearchDepth =
    row.full_report?._pipeline?.research_depth === "quick" ? "quick" : "deep";

  const showProgress = row.status === "pending" || row.status === "researching";

  const onBriefReady = useCallback(() => {
    void refresh();
  }, [refresh]);

  if (row.status === "failed" && !row.quick_brief) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-lg font-semibold text-[#C0392B]">Research failed</p>
        <p className="mt-2 text-sm text-slate-600">
          The pipeline stopped before a quick brief could be generated. Please try again with a
          shorter document or simpler prompt.
        </p>
      </div>
    );
  }

  if (showProgress) {
    return (
      <ProgressTracker briefId={id} researchDepth={depth} onBriefReady={onBriefReady} />
    );
  }

  if (row.quick_brief) {
    return (
      <>
        <QuickBrief
          brief={row.quick_brief}
          createdAt={row.created_at}
          completedAt={row.completed_at}
          sourceCount={sources.length}
        />
        <FullReport
          briefId={id}
          fullReport={row.full_report}
          quickBrief={row.quick_brief}
          sources={sources}
        />
      </>
    );
  }

  return (
    <div className="space-y-4 px-6 py-16">
      <div className="mx-auto max-w-xl animate-pulse space-y-3">
        <div className="h-6 w-2/3 rounded-md bg-[#F4F6F9]" />
        <div className="h-4 w-full rounded-md bg-[#F4F6F9]" />
        <div className="h-4 w-5/6 rounded-md bg-[#F4F6F9]" />
      </div>
      <p className="text-center text-sm text-slate-500">Preparing your brief…</p>
    </div>
  );
}
