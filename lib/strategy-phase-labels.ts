import type { StrategyPhaseKey } from "@/lib/strategy-types";

export function getStrategyPhaseLabel(phase: string | null | undefined): string {
  const key = (phase ?? "pending") as StrategyPhaseKey;
  const map: Record<StrategyPhaseKey, string> = {
    pending: "Initialising research pipeline...",
    parsing: "Parsing your situation...",
    market_intel: "Researching company & market...",
    competitive: "Mapping competitive landscape...",
    financial: "Analysing financial signals...",
    risks: "Identifying strategic risks...",
    opportunities: "Finding strategic opportunities...",
    brief: "Writing your strategic brief...",
    summary: "Finalising executive summary...",
    complete: "Research complete",
  };
  return map[key] ?? "Initialising research pipeline...";
}
