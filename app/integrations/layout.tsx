import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations | Ventura",
  description:
    "Ventura integrates with GitHub, GitLab, VS Code, Slack, Jenkins, and more. EU AI Act compliance fits into your existing developer workflow.",
};

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
