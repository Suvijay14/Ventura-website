import Link from "next/link";
import {
  Database,
  Eye,
  FileText,
  Shield,
  ScrollText,
  MessageSquare,
  Activity,
  ClipboardCheck,
} from "lucide-react";
import { capabilities } from "@/lib/capabilities";

const capabilityIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "data-governance": Database,
  "human-oversight": Eye,
  "technical-documentation": FileText,
  "risk-management": Shield,
  "logging-record-keeping": ScrollText,
  transparency: MessageSquare,
  "accuracy-robustness": Activity,
  "quality-management": ClipboardCheck,
};

export const metadata = {
  title: "Capabilities | Ventura",
  description:
    "Comprehensive EU AI Act compliance coverage: data governance, human oversight, technical documentation, and risk management.",
};

export default function CapabilitiesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8 lg:px-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
            Regulatory Capabilities
          </p>
          <h1 className="text-[48px] sm:text-[56px] font-light leading-[1.2] text-[#0f172a] mb-6">
            Comprehensive Coverage Across EU AI Act Requirements
          </h1>
          <p className="text-xl text-[#64748b]">
            Ventura scans your codebase against all major EU AI Act
            requirements, identifying violations at the source code level.
          </p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = capabilityIcons[cap.id] ?? FileText;
              return (
              <div
                key={cap.id}
                className="bg-white border border-[#e2e8f0] rounded-lg p-8"
              >
                <div className="w-14 h-14 rounded-lg bg-[#f1f5f9] flex items-center justify-center mb-6">
                  <Icon
                    className="w-7 h-7 text-[#64748b]"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-[13px] tracking-[0.05em] text-[#64748b] mb-2">
                  {cap.article}
                </p>
                <h3 className="text-2xl font-light text-[#0f172a] mb-4">
                  {cap.title}
                </h3>
                <p className="text-[#475569] mb-6 leading-relaxed">
                  {cap.description}
                </p>
                <ul className="space-y-2 text-[#64748b]">
                  {cap.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#94a3b8]">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={cap.title.includes("Data Governance") ? "/demo" : "/contact"}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0f172a] text-white mt-8 hover:bg-[#1e293b] transition-colors"
                  aria-label={`Learn more about ${cap.title}`}
                >
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
                </Link>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[600px] mx-auto px-8 text-center">
          <Link
            href="/get-started"
            className="inline-block px-8 py-4 border-2 border-[#0f172a] text-[#0f172a] text-[15px] font-medium rounded hover:bg-[#0f172a] hover:text-white transition-colors"
          >
            Discover our solution
          </Link>
        </div>
      </section>
    </main>
  );
}
