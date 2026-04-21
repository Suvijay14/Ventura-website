import { notFound } from "next/navigation";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server";
import StrategyBriefShell, {
  type StrategyBriefInitial,
} from "@/components/strategy/StrategyBriefShell";
import type { FullReportPayload, QuickBriefResult, StrategyBriefStatus } from "@/lib/strategy-types";

export default async function StrategyBriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseRouteHandlerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <p className="text-sm text-slate-600">Sign in to view this brief.</p>
      </div>
    );
  }

  const { data, error } = await supabase.from("strategy_briefs").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    notFound();
  }

  const initial: StrategyBriefInitial = {
    id: data.id as string,
    status: data.status as StrategyBriefStatus,
    title: data.title as string,
    created_at: data.created_at as string,
    completed_at: (data.completed_at as string | null) ?? null,
    quick_brief: (data.quick_brief as QuickBriefResult | null) ?? null,
    full_report: (data.full_report as FullReportPayload | null) ?? null,
  };

  return <StrategyBriefShell id={id} initial={initial} />;
}
