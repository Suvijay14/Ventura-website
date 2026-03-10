import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo | Ventura",
  description:
    "See Ventura in action. Request a personalized demo and learn how to transform EU AI Act compliance with full visibility, continuous testing, and audit-ready evidence.",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
