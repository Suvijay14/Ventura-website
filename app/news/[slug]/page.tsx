import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<
  string,
  { title: string; date: string; category: string; content: string }
> = {
  "ai-day-2026": {
    title: "Ventura Launches at AI Day 2026",
    date: "March 3, 2026",
    category: "Announcement",
    content: `Introducing automated EU AI Act compliance for developers. Ventura brings source code analysis, risk classification, and continuous monitoring to your development workflow.

Our proprietary technology identifies compliance gaps at the source code level, enabling organizations to address EU AI Act requirements systematically and efficiently. Unlike manual assessment tools, Ventura integrates directly into your CI/CD pipeline and IDE.

Key capabilities now available:
- CLI for local and CI/CD scanning
- VS Code extension for real-time feedback
- Automated Annex III risk classification
- Actionable remediation guidance`,
  },
  "prohibited-deadline": {
    title: "Prohibited Practices Deadline: February 2025",
    date: "February 2, 2025",
    category: "Regulatory",
    content: `The EU AI Act's provisions on prohibited AI practices came into force. Systems using subliminal techniques, exploitation of vulnerabilities, or social scoring must be discontinued.

Article 5 of the regulation bans:
- Subliminal techniques beyond a person's consciousness
- Exploitation of vulnerabilities of specific groups
- Biometric categorization to infer sensitive attributes
- Social scoring by public authorities
- Real-time remote biometric identification in public spaces (with limited exceptions)`,
  },
  "gpai-august-2025": {
    title: "GPAI Requirements: August 2025",
    date: "August 1, 2025",
    category: "Regulatory",
    content: `General Purpose AI systems face new obligations. Providers of GPAI models with systemic risk must comply with model evaluation, adversarial testing, and incident reporting.

The AI Office will designate GPAI models with systemic risk based on capabilities and impact. These models require:
- Model evaluation
- Adversarial testing
- Incident reporting
- Cybersecurity measures`,
  },
  "high-risk-august-2026": {
    title: "High-Risk AI Requirements: August 2026",
    date: "August 2, 2026",
    category: "Regulatory",
    content: `Full applicability of high-risk AI system requirements. Conformity assessments, technical documentation, and post-market monitoring become mandatory for Annex III systems.

Organizations deploying AI in recruitment, credit scoring, biometric identification, and other Annex III areas must ensure full compliance by this date.`,
  },
  "cli-1.0": {
    title: "Ventura CLI 1.0 Release",
    date: "March 1, 2026",
    category: "Product",
    content: `First stable release of the Ventura CLI. Scan local repositories, integrate with CI/CD, and get actionable compliance reports directly from your terminal.

Install with: npm install -g @ventura/cli

Features:
- Local repository scanning
- CI/CD integration (GitHub Actions, GitLab CI)
- JSON and human-readable output
- 50+ EU AI Act rules`,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <main>
      <article className="pt-32 pb-24 bg-white">
        <div className="max-w-[680px] mx-auto px-8 lg:px-20">
          <Link
            href="/news"
            className="text-sm text-[#64748b] hover:text-[#0f172a] mb-6 inline-block"
          >
            ← Back to News
          </Link>
          <span className="inline-block px-3 py-1 bg-[#f1f5f9] text-[#64748b] text-xs font-semibold rounded mb-4">
            {article.category}
          </span>
          <h1 className="text-[40px] font-light text-[#0f172a] mb-4">
            {article.title}
          </h1>
          <p className="text-[#64748b] mb-12">{article.date}</p>
          <div className="prose prose-slate max-w-none">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#475569] leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
