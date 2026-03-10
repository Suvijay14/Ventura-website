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

export const metadata = {
  title: "Industries | Ventura",
  description:
    "Industry-specific EU AI Act compliance guidance for employment, financial services, healthcare, biometric systems, and critical infrastructure.",
};

export default function IndustriesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Sector Expertise
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Industry-Specific Regulatory Guidance
          </h1>
          <p className="text-xl text-[#64748b]">
            Our compliance analysis methodology adapts to sector-specific
            requirements across high-risk AI applications.
          </p>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-20">
          <div className="space-y-0">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.id] ?? Building2;
              return (
              <div
                key={industry.id}
                className="border-t border-[#e2e8f0] py-8 hover:bg-[#f8fafc] transition-colors -mx-8 px-8 rounded-lg"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#f1f5f9] flex items-center justify-center mb-4">
                      <Icon
                        className="w-6 h-6 text-[#64748b]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-2xl font-light text-[#0f172a] mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-[#64748b]">
                      {industry.riskLevel === "prohibited" ? "Prohibited / High-Risk" : "High-Risk Classification"}: {industry.annexReference}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[#64748b] leading-relaxed">
                      {industry.description}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 mt-4 text-[15px] font-medium text-[#0f172a] hover:opacity-80 transition-opacity"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
