"use client";

export default function TheChallenge() {
  return (
    <section className="bg-[#f8fafc] py-40">
      <div className="max-w-[900px] mx-auto px-8 lg:px-20">
        <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] text-center">
          The Regulatory Challenge
        </p>
        <h2 className="mt-6 text-4xl sm:text-5xl font-light leading-[1.25] tracking-[-0.01em] text-[#0f172a] text-center max-w-[800px] mx-auto">
          Organizations deploying artificial intelligence systems face
          unprecedented regulatory complexity
        </h2>
        <div className="mt-12 text-lg font-normal leading-[1.8] text-[#475569] text-center max-w-[700px] mx-auto space-y-6">
          <p>
            The European Union&apos;s Artificial Intelligence Act introduces
            comprehensive requirements for high-risk AI systems across
            employment, financial services, healthcare, and critical
            infrastructure sectors.
          </p>
          <p>
            Organizations must demonstrate compliance through technical
            documentation, risk assessments, data governance frameworks, and
            human oversight mechanisms—requirements that traditional
            consulting approaches address through manual analysis over 6-12 month
            engagements.
          </p>
          <p>
            Our approach applies proprietary source code analysis to identify
            regulatory gaps systematically, reducing compliance timelines while
            maintaining the rigor organizations require for regulatory
            confidence.
          </p>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="text-[48px] sm:text-[60px] font-light text-[#0f172a]">
              92%
            </div>
            <p className="mt-3 text-[15px] font-medium text-[#64748b]">
              Compliance gap
            </p>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed">
              of AI organizations unaware of specific obligations
            </p>
          </div>
          <div className="text-center">
            <div className="text-[48px] sm:text-[60px] font-light text-[#0f172a]">
              €200K–500K
            </div>
            <p className="mt-3 text-[15px] font-medium text-[#64748b]">
              Traditional approach
            </p>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed">
              typical consultant engagement costs
            </p>
          </div>
          <div className="text-center">
            <div className="text-[48px] sm:text-[60px] font-light text-[#0f172a]">
              18 months
            </div>
            <p className="mt-3 text-[15px] font-medium text-[#64748b]">
              Implementation timeline
            </p>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed">
              average time to manual compliance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
