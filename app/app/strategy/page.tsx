import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server";
import type { QuickBriefResult, StrategyBriefStatus } from "@/lib/strategy-types";

interface BriefListRow {
  id: string;
  title: string;
  input_type: string;
  go_no_go: string | null;
  confidence_score: number | null;
  status: StrategyBriefStatus;
  created_at: string;
  quick_brief?: QuickBriefResult | null;
}

function statusPill(status: StrategyBriefStatus) {
  if (status === "complete") {
    return (
      <span className="inline-flex rounded-md bg-[#D5F5E3] px-2 py-1 text-xs font-semibold text-[#1E8449]">
        Complete
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex rounded-md bg-[#FADBD8] px-2 py-1 text-xs font-semibold text-[#C0392B]">
        Failed
      </span>
    );
  }
  if (status === "brief_ready") {
    return (
      <span className="inline-flex animate-pulse rounded-md bg-[#FDEBD0] px-2 py-1 text-xs font-semibold text-[#0D1B2A]">
        Brief ready
      </span>
    );
  }
  return (
    <span className="inline-flex animate-pulse rounded-md bg-[#FDEBD0] px-2 py-1 text-xs font-semibold text-[#0D1B2A]">
      Researching
    </span>
  );
}

function goBadge(go: string | null) {
  if (!go) return <span className="text-xs text-slate-400">—</span>;
  const label = go === "no_go" ? "NO-GO" : go === "conditional" ? "CONDITIONAL" : "GO";
  const cls =
    go === "go"
      ? "bg-[#D5F5E3] text-[#1E8449]"
      : go === "no_go"
        ? "bg-[#FADBD8] text-[#C0392B]"
        : "bg-[#FDEBD0] text-[#0D1B2A]";
  return <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${cls}`}>{label}</span>;
}

export default async function StrategyListPage() {
  const supabase = await createSupabaseRouteHandlerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-[#0D1B2A]">Strategy Intelligence</h1>
        <p className="mt-3 text-sm text-slate-600">
          Sign in with your Ventura account to view and run strategic research briefs.
        </p>
      </div>
    );
  }

  const { data: rows, error } = await supabase
    .from("strategy_briefs")
    .select("id,title,input_type,go_no_go,confidence_score,status,created_at,quick_brief")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="px-6 py-16">
        <p className="text-sm text-[#C0392B]">Could not load briefs: {error.message}</p>
      </div>
    );
  }

  const list = (rows ?? []) as BriefListRow[];
  const completed = list.filter((r) => r.status === "complete");
  const scores = completed
    .map((r) => r.confidence_score)
    .filter((n): n is number => typeof n === "number");
  const avgConfidence =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const lastDate =
    list.length > 0
      ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(list[0].created_at))
      : "—";

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-[28px] font-semibold text-[#0D1B2A]">Strategy Intelligence</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              AI-powered strategic research for consultants. Deep analysis in 12–15 minutes.
            </p>
          </div>
          <Link
            href="/app/strategy/new"
            className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
          >
            <Plus className="h-4 w-4" aria-hidden />
            New Research
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Total briefs</p>
            <p className="mt-2 text-2xl font-semibold text-[#0D1B2A]">{list.length}</p>
          </div>
          <div className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Avg confidence</p>
            <p className="mt-2 text-2xl font-semibold text-[#0D1B2A]">
              {avgConfidence != null ? `${avgConfidence}/100` : "—"}
            </p>
          </div>
          <div className="rounded-md border border-[#E0E6EE] bg-[#F4F6F9] p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Last research</p>
            <p className="mt-2 text-lg font-semibold text-[#0D1B2A]">{lastDate}</p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-md border border-[#E0E6EE] bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F4F6F9] text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">GO / NO-GO</th>
                <th className="hidden px-4 py-3 sm:table-cell">Confidence</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 md:table-cell">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <p className="text-sm font-semibold text-[#0D1B2A]">No research yet</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Run your first multi-agent brief to populate this table.
                    </p>
                    <Link
                      href="/app/strategy/new"
                      className="mt-6 inline-flex rounded-md bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1A3A5C]"
                    >
                      Start first brief
                    </Link>
                  </td>
                </tr>
              ) : (
                list.map((r) => {
                  const qb = r.quick_brief;
                  const conf =
                    typeof r.confidence_score === "number"
                      ? r.confidence_score
                      : typeof qb?.confidence_score === "number"
                        ? qb.confidence_score
                        : null;
                  return (
                    <tr key={r.id} className="border-t border-[#E0E6EE]">
                      <td className="px-4 py-3 font-medium text-[#0D1B2A]">{r.title}</td>
                      <td className="px-4 py-3 capitalize text-slate-600">{r.input_type}</td>
                      <td className="px-4 py-3">{goBadge(r.go_no_go)}</td>
                      <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                        {conf != null ? `${conf}/100` : "—"}
                      </td>
                      <td className="px-4 py-3">{statusPill(r.status)}</td>
                      <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                        {new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(
                          new Date(r.created_at),
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/app/strategy/${r.id}`} className="font-semibold text-[#1A3A5C] underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
