interface GoNoGoBadgeProps {
  verdict: "go" | "no_go" | "conditional";
  className?: string;
}

export default function GoNoGobadge({ verdict, className = "" }: GoNoGoBadgeProps) {
  const label =
    verdict === "go" ? "GO" : verdict === "no_go" ? "NO-GO" : "CONDITIONAL";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-[28px] font-semibold leading-none text-[#0D1B2A] ${className}`}
    >
      {label}
    </span>
  );
}
