import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Compliance Assessment | Ventura",
  description:
    "Comprehensive 15-20 minute assessment. Get a detailed compliance report with gap analysis, remediation roadmap, and code-level recommendations.",
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
