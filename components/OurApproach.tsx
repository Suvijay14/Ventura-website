"use client";

import { Search, FileCheck, Activity } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Regulatory Mapping",
    description:
      "Comprehensive analysis of source code against EU AI Act requirements. Our proprietary technology identifies regulatory gaps at the implementation level, mapping findings to specific articles and annexes.",
    outputs: [
      "Article-level compliance mapping",
      "Risk classification assessment",
      "Gap analysis documentation",
    ],
    icon: Search,
  },
  {
    number: "02",
    title: "Implementation Framework",
    description:
      "Specific remediation strategies mapped to organizational workflows. We provide prioritized recommendations with technical implementation guidance and documentation templates aligned to regulatory requirements.",
    outputs: [
      "Prioritized remediation roadmap",
      "Technical implementation guidance",
      "Documentation templates",
    ],
    icon: FileCheck,
  },
  {
    number: "03",
    title: "Ongoing Monitoring",
    description:
      "Continuous compliance verification integrated into development workflows. Automated validation ensures regulatory alignment as systems evolve, with monitoring for regulatory updates and audit trail management.",
    outputs: [
      "Automated compliance validation",
      "Regulatory update monitoring",
      "Audit trail management",
    ],
    icon: Activity,
  },
];

export default function OurApproach() {
  return (
    <section className="bg-white py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
              Our Methodology
            </p>
            <h2 className="mt-4 text-[36px] font-light leading-[1.2] text-[#0f172a]">
              Systematic Compliance Analysis
            </h2>
          </div>

          <div className="max-w-[800px]">
            {phases.map((phase, i) => (
              <div key={phase.number}>
                {i > 0 && <div className="my-20 border-t border-[#e2e8f0]" />}
                <div className="relative">
                  <div className="text-[200px] font-extralight text-[#f1f5f9] leading-none select-none">
                    {phase.number}
                  </div>
                  <div className="relative -mt-32 flex gap-6">
                    <div className="w-12 h-12 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
                      <phase.icon className="w-6 h-6 text-[#64748b]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[28px] font-normal text-[#0f172a]">
                        {phase.title}
                      </h3>
                      <p className="mt-5 text-[17px] leading-[1.75] text-[#475569]">
                        {phase.description}
                      </p>
                      <div className="mt-8 space-y-2">
                        {phase.outputs.map((output) => (
                          <p key={output} className="text-[15px] leading-[2.5] text-[#64748b]">
                            — {output}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
