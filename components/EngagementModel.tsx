"use client";

const engagements = [
  {
    title: "Compliance Assessment",
    type: "Fixed-scope engagement",
    description:
      "Comprehensive regulatory gap analysis with prioritized remediation framework. Delivered within 2-3 weeks.",
    scope: [
      "Source code analysis",
      "Compliance gap documentation",
      "Remediation roadmap",
      "Executive summary",
    ],
    investment: "From €15,000",
    cta: "Discuss assessment",
    highlighted: false,
  },
  {
    title: "Implementation Partnership",
    type: "Ongoing engagement",
    description:
      "Comprehensive compliance implementation with continuous monitoring and regulatory updates.",
    scope: [
      "Continuous compliance validation",
      "Technical implementation support",
      "Regulatory change management",
      "Audit preparation",
      "Documentation maintenance",
    ],
    investment: "From €4,000/month",
    cta: "Schedule consultation",
    highlighted: true,
  },
  {
    title: "Enterprise Program",
    type: "Custom engagement",
    description:
      "Tailored compliance framework with dedicated advisory support for complex organizational requirements.",
    scope: [
      "Custom regulatory frameworks",
      "Multi-system analysis",
      "Dedicated compliance advisor",
      "Board-level reporting",
      "Audit representation",
    ],
    investment: "Custom pricing",
    cta: "Contact our team",
    highlighted: false,
  },
];

export default function EngagementModel() {
  return (
    <section id="engagement" className="bg-[#f8fafc] py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
            Engagement Models
          </p>
          <h2 className="mt-6 text-4xl sm:text-5xl font-light leading-[1.2] text-[#0f172a]">
            Flexible Engagement Options
          </h2>
          <p className="mt-6 text-lg text-[#64748b] max-w-[600px] mx-auto">
            Tailored to organizational requirements and compliance maturity
          </p>
        </div>

        <div className="mt-24 grid md:grid-cols-3 md:gap-px md:bg-[#e2e8f0]">
          {engagements.map((eng) => (
            <div
              key={eng.title}
              className={`px-8 lg:px-12 py-12 md:bg-[#f8fafc] ${
                eng.highlighted
                  ? "md:bg-white md:border md:border-[#e2e8f0] md:-m-px md:py-16 md:shadow-sm"
                  : ""
              }`}
            >
              <h3 className="text-[28px] font-light leading-[1.2] text-[#0f172a]">
                {eng.title}
              </h3>
              <p className="mt-4 text-sm text-[#64748b]">{eng.type}</p>
              <p className="mt-6 text-base leading-[1.75] text-[#475569]">
                {eng.description}
              </p>
              <div className="mt-8 space-y-2">
                {eng.scope.map((item) => (
                  <p
                    key={item}
                    className="text-[15px] leading-[2] text-[#64748b]"
                  >
                    — {item}
                  </p>
                ))}
              </div>
              <p className="mt-10 text-xl font-normal text-[#0f172a]">
                {eng.investment}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-6 text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
              >
                {eng.cta}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0f172a] text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
