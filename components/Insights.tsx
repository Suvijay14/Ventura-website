"use client";

const insights = [
  {
    tag: "Regulatory Analysis",
    title:
      "Understanding Article 10 Data Governance Requirements for High-Risk AI Systems",
    excerpt:
      "Organizations deploying high-risk AI systems must demonstrate comprehensive data governance frameworks addressing bias prevention, quality assurance, and dataset representativeness. This analysis examines implementation requirements.",
    meta: "12 March 2026 · 8 min read",
  },
  {
    tag: "Implementation Guidance",
    title:
      "Systematic Approaches to Bias Detection in Training Datasets",
    excerpt:
      "Effective bias detection requires structured methodologies combining statistical analysis, demographic representation assessment, and validation protocols. We outline frameworks for systematic implementation.",
    meta: "5 March 2026 · 6 min read",
  },
  {
    tag: "Sector Briefing",
    title: "Financial Services AI Compliance: Key Considerations",
    excerpt:
      "Credit scoring, loan approval, and risk assessment systems face specific regulatory requirements under Annex III. This briefing addresses sector-specific compliance considerations and implementation priorities.",
    meta: "28 February 2026 · 10 min read",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="bg-white py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
            Regulatory Insights
          </p>
          <h2 className="mt-6 text-4xl sm:text-5xl font-light leading-[1.2] text-[#0f172a]">
            Perspectives on AI Compliance
          </h2>
          <p className="mt-4 text-lg text-[#64748b]">
            Analysis and guidance for navigating EU AI Act requirements
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.title}
              className="bg-[#f8fafc] p-12 hover:shadow-sm transition-shadow"
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#64748b]">
                {insight.tag}
              </p>
              <h3 className="mt-4 text-2xl font-normal leading-[1.3] text-[#0f172a]">
                {insight.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                {insight.excerpt}
              </p>
              <p className="mt-6 text-[13px] text-[#94a3b8]">{insight.meta}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-6 text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
              >
                Read analysis
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0f172a] text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
          >
            View all insights →
          </a>
        </div>
      </div>
    </section>
  );
}
