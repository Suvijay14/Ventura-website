"use client";

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

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#f8fafc] py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b]">
              Regulatory Capabilities
            </p>
            <h2 className="mt-6 text-4xl sm:text-5xl font-light leading-[1.2] text-[#0f172a] max-w-[700px]">
              8 operational modules complemented by advisory support
            </h2>
          </div>
          <a
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0f172a] text-white text-[15px] font-medium hover:bg-[#1e293b] transition-colors shrink-0 w-fit"
          >
            Discover our solution
          </a>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 gap-12">
          {capabilities.map((cap) => {
            const Icon = capabilityIcons[cap.id] ?? FileText;
            return (
            <div
              key={cap.id}
              className="group bg-white border border-[#e2e8f0] p-16 min-h-[400px] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-lg bg-[#f1f5f9] flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-[#64748b]" strokeWidth={1.5} />
              </div>
              <p className="text-[13px] tracking-[0.05em] text-[#64748b]">
                {cap.article}
              </p>
              <h3 className="mt-4 text-[32px] font-light leading-[1.2] text-[#0f172a]">
                {cap.title}
              </h3>
              <p className="mt-6 text-base leading-[1.75] text-[#475569]">
                {cap.description}
              </p>
              <div className="mt-8 space-y-2">
                {cap.features.map((item) => (
                  <p
                    key={item}
                    className="text-[15px] leading-[2] text-[#64748b]"
                  >
                    — {item}
                  </p>
                ))}
              </div>
              <a
                href={cap.title.includes("Data Governance") ? "/demo" : "/#contact"}
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
              </a>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
