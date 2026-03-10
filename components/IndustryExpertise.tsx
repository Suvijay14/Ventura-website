"use client";

import {
  Briefcase,
  DollarSign,
  Heart,
  Fingerprint,
  Building2,
  Scale,
  GraduationCap,
  Users,
} from "lucide-react";
import { industries } from "@/lib/industries";

const industryIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  employment: Briefcase,
  financial: DollarSign,
  healthcare: Heart,
  biometric: Fingerprint,
  "critical-infrastructure": Building2,
  "law-enforcement": Scale,
  education: GraduationCap,
  "social-services": Users,
};

export default function IndustryExpertise() {
  return (
    <section id="industries" className="bg-white py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-[40%_60%] gap-16 lg:gap-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
              Sector Expertise
            </p>
            <h2 className="mt-4 text-[42px] font-light leading-[1.2] text-[#0f172a]">
              Industry-Specific Regulatory Guidance
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-[#64748b]">
              Our compliance analysis methodology adapts to sector-specific
              requirements across high-risk AI applications.
            </p>
          </div>

          <div>
            {industries.map((industry) => {
              const Icon = industryIcons[industry.id] ?? Building2;
              return (
              <div
                key={industry.id}
                className="group flex items-start gap-6 border-t border-[#e2e8f0] py-8 hover:bg-[#f8fafc] transition-colors -mx-8 px-8"
              >
                <div className="w-12 h-12 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#64748b]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[22px] font-normal text-[#0f172a]">
                    {industry.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#64748b]">
                    {industry.riskLevel === "prohibited" ? "Prohibited / High-Risk" : "High-Risk Classification"}: {industry.annexReference}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#64748b]">
                    {industry.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-4 text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
