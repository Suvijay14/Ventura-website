export interface Integration {
  id: string;
  name: string;
  category: "Version Control" | "CI/CD" | "IDEs" | "Collaboration";
  description: string;
  features: string[];
  tags: { label: string; color: string }[];
  docsHref: string;
  ring?: 1 | 2 | 3; // For orbital viz: 1=inner, 2=mid, 3=outer
}

export const integrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    category: "Version Control",
    description:
      "Automatic PR checks with inline violation comments and suggested fixes. Integrates with GitHub Actions and status checks.",
    features: [
      "PR status checks",
      "Inline comments",
      "Suggested fixes",
      "Branch protection",
    ],
    tags: [
      { label: "Easy Setup", color: "green" },
      { label: "OAuth", color: "blue" },
      { label: "GitHub App", color: "violet" },
    ],
    docsHref: "/docs/integrations/github",
    ring: 1,
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "Version Control",
    description:
      "Merge request checks, pipeline integration, and compliance reports in the GitLab UI. Security dashboard widgets.",
    features: [
      "Merge request checks",
      "Pipeline integration",
      "Security dashboard",
      "Compliance reports",
    ],
    tags: [
      { label: "Easy Setup", color: "green" },
      { label: "CI/CD", color: "blue" },
    ],
    docsHref: "/docs/integrations/gitlab",
    ring: 1,
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    category: "Version Control",
    description:
      "Pull request checks and Bitbucket Pipelines integration. Code insights for compliance visibility.",
    features: [
      "Pull request checks",
      "Bitbucket Pipelines",
      "Code insights",
    ],
    tags: [
      { label: "Easy Setup", color: "green" },
    ],
    docsHref: "/docs/integrations/bitbucket",
    ring: 1,
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "IDEs",
    description:
      "Real-time inline warnings as you type. Hover for article references, quick fixes, and Problems panel integration.",
    features: [
      "Real-time scanning",
      "Inline squiggles",
      "Quick fix suggestions",
      "Status bar indicator",
    ],
    tags: [
      { label: "Developer Favorite", color: "violet" },
      { label: "Free", color: "green" },
    ],
    docsHref: "/docs/integrations/vscode",
    ring: 1,
  },
  {
    id: "jetbrains",
    name: "JetBrains",
    category: "IDEs",
    description:
      "PyCharm, IntelliJ, WebStorm support. Inspection integration and Alt+Enter intention actions for quick fixes.",
    features: [
      "Inspection integration",
      "Intention actions",
      "Multi-IDE support",
    ],
    tags: [
      { label: "PyCharm", color: "blue" },
      { label: "IntelliJ", color: "blue" },
    ],
    docsHref: "/docs/integrations/jetbrains",
    ring: 1,
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "CI/CD",
    description:
      "Run Ventura scans in your CI pipeline. Fail on critical violations, post results as PR comments.",
    features: [
      "Workflow integration",
      "PR annotations",
      "Fail on critical",
      "Artifact reports",
    ],
    tags: [
      { label: "Marketplace", color: "blue" },
      { label: "5 min setup", color: "green" },
    ],
    docsHref: "/docs/integrations/github-actions",
    ring: 2,
  },
  {
    id: "jenkins",
    name: "Jenkins",
    category: "CI/CD",
    description:
      "Pipeline stage for compliance checks. Publish HTML reports and block builds on critical violations.",
    features: [
      "Pipeline stage",
      "HTML reports",
      "Build blocking",
    ],
    tags: [
      { label: "Enterprise", color: "violet" },
    ],
    docsHref: "/docs/integrations/jenkins",
    ring: 2,
  },
  {
    id: "circleci",
    name: "CircleCI",
    category: "CI/CD",
    description:
      "Orb for one-line integration. Scan on every build with configurable fail conditions.",
    features: [
      "Orb available",
      "One-line setup",
      "Configurable rules",
    ],
    tags: [
      { label: "Orb", color: "blue" },
    ],
    docsHref: "/docs/integrations/circleci",
    ring: 2,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Collaboration",
    description:
      "Compliance alerts in channels. Daily digest reports, interactive fix suggestions, and team notifications.",
    features: [
      "Channel alerts",
      "Daily digest",
      "Slash commands",
      "Fix suggestions",
    ],
    tags: [
      { label: "OAuth", color: "blue" },
      { label: "Bot", color: "violet" },
    ],
    docsHref: "/docs/integrations/slack",
    ring: 2,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Collaboration",
    description:
      "Adaptive cards for rich compliance alerts. Bot commands and channel notifications for your team.",
    features: [
      "Adaptive cards",
      "Bot commands",
      "Channel notifications",
    ],
    tags: [
      { label: "Enterprise", color: "violet" },
    ],
    docsHref: "/docs/integrations/teams",
    ring: 2,
  },
  {
    id: "jira",
    name: "Jira",
    category: "Collaboration",
    description:
      "Auto-create tickets for violations. Link to existing issues, status sync, and compliance dashboard.",
    features: [
      "Auto-create tickets",
      "Link violations",
      "Status sync",
      "Dashboard",
    ],
    tags: [
      { label: "Atlassian", color: "blue" },
    ],
    docsHref: "/docs/integrations/jira",
    ring: 2,
  },
];

export const categories = [
  "Version Control",
  "CI/CD",
  "IDEs",
  "Collaboration",
] as const;

export function getIntegrationsByCategory() {
  return categories.map((cat) => ({
    category: cat,
    integrations: integrations.filter((i) => i.category === cat),
  }));
}
