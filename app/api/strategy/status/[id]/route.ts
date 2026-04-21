import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getStrategyPhaseLabel } from "@/lib/strategy-phase-labels";
import type { StrategyBriefStatus } from "@/lib/strategy-types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!id) {
    return new Response("Missing id", { status: 400 });
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
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let pollInterval: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const cleanup = () => {
        if (pollInterval) clearInterval(pollInterval);
        pollInterval = undefined;
      };

      const send = (payload: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      const tick = async () => {
        const { data: row, error } = await supabase
          .from("strategy_briefs")
          .select("status,current_phase,progress_pct")
          .eq("id", id)
          .maybeSingle();

        if (error || !row) {
          send({
            error: error?.message ?? "Not found",
            status: "failed" as StrategyBriefStatus,
            current_phase: "complete",
            progress_pct: 100,
            phase_label: getStrategyPhaseLabel("complete"),
          });
          cleanup();
          controller.close();
          return;
        }

        const status = row.status as StrategyBriefStatus;
        const current_phase = row.current_phase as string | null;
        const progress_pct = typeof row.progress_pct === "number" ? row.progress_pct : 0;
        const phase_label = getStrategyPhaseLabel(current_phase ?? undefined);

        send({ status, current_phase, progress_pct, phase_label });

        if (status === "complete" || status === "failed") {
          cleanup();
          controller.close();
        }
      };

      await tick();
      pollInterval = setInterval(() => {
        void tick();
      }, 2000);
    },
    cancel() {
      if (pollInterval) clearInterval(pollInterval);
      pollInterval = undefined;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
