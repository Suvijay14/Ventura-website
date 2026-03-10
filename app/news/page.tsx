import Link from "next/link";

const updates = [
  {
    id: "ai-day-2026",
    category: "Announcement",
    title: "Ventura Launches at AI Day 2026",
    date: "March 3, 2026",
    excerpt:
      "Introducing automated EU AI Act compliance for developers. Ventura brings source code analysis, risk classification, and continuous monitoring to your development workflow.",
    href: "/news/ai-day-2026",
  },
  {
    id: "prohibited-deadline",
    category: "Regulatory",
    title: "Prohibited Practices Deadline: February 2025",
    date: "February 2, 2025",
    excerpt:
      "The EU AI Act's provisions on prohibited AI practices came into force. Systems using subliminal techniques, exploitation of vulnerabilities, or social scoring must be discontinued.",
    href: "/news/prohibited-deadline",
  },
  {
    id: "gpai-august-2025",
    category: "Regulatory",
    title: "GPAI Requirements: August 2025",
    date: "August 1, 2025",
    excerpt:
      "General Purpose AI systems face new obligations. Providers of GPAI models with systemic risk must comply with model evaluation, adversarial testing, and incident reporting.",
    href: "/news/gpai-august-2025",
  },
  {
    id: "high-risk-august-2026",
    category: "Regulatory",
    title: "High-Risk AI Requirements: August 2026",
    date: "August 2, 2026",
    excerpt:
      "Full applicability of high-risk AI system requirements. Conformity assessments, technical documentation, and post-market monitoring become mandatory for Annex III systems.",
    href: "/news/high-risk-august-2026",
  },
  {
    id: "product-update-march",
    category: "Product",
    title: "Ventura CLI 1.0 Release",
    date: "March 1, 2026",
    excerpt:
      "First stable release of the Ventura CLI. Scan local repositories, integrate with CI/CD, and get actionable compliance reports directly from your terminal.",
    href: "/news/cli-1.0",
  },
];

export const metadata = {
  title: "News & Updates | Ventura",
  description:
    "Regulatory updates, AI Act implementation timeline, and Ventura product announcements.",
};

export default function NewsPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            News & Updates
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Regulatory & Product Timeline
          </h1>
          <p className="text-xl text-[#64748b]">
            AI Act developments and Ventura updates
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[800px] mx-auto px-8 lg:px-20">
          <div className="space-y-8">
            {updates.map((update) => (
              <Link
                key={update.id}
                href={update.href}
                className="block group"
              >
                <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 hover:border-[#cbd5e1] transition-colors">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#f1f5f9] text-[#64748b] text-xs font-semibold rounded">
                      {update.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0f172a] mb-2 group-hover:text-[#1e3a8a] transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-[#64748b] mb-2">{update.date}</p>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {update.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 p-6 bg-white border border-[#e2e8f0] rounded-lg">
            <h3 className="text-lg font-medium text-[#0f172a] mb-2">
              Subscribe to Updates
            </h3>
            <p className="text-sm text-[#64748b] mb-4">
              Get regulatory and product updates delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-2.5 border border-[#e2e8f0] rounded text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded hover:bg-[#1e293b] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
