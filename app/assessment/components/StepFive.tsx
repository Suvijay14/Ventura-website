"use client";

import { useAssessment } from "../AssessmentContext";
import {
  calculateComplianceScore,
  getCriticalGaps,
  getHighPriorityGaps,
  getDaysUntilDeadline,
  getArticleGaps,
} from "../utils/reportLogic";

export default function StepFive() {
  const { answers, riskLevel, reset } = useAssessment();

  const complianceScore = calculateComplianceScore(answers);
  const criticalGaps = getCriticalGaps(answers);
  const highPriorityGaps = getHighPriorityGaps(answers);
  const daysUntil = getDaysUntilDeadline();
  const articleGaps = getArticleGaps(answers);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-[90px] pb-20">
      <div className="max-w-[900px] mx-auto px-8 lg:px-20">
        <div className="mb-12 flex flex-wrap gap-4 justify-between items-center">
          <h1 className="text-[36px] font-light text-[#0f172a]">
            Compliance Assessment Report
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-[#0f172a] text-white text-[15px] font-medium hover:bg-[#1e293b] transition-colors"
            >
              Download / Print PDF
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border border-[#e2e8f0] text-[#0f172a] text-[15px] font-medium hover:bg-white transition-colors"
            >
              Start New Assessment
            </button>
          </div>
        </div>

        <div className="space-y-12 print:space-y-8">
          {/* Executive Summary */}
          <section className="bg-white border border-[#e2e8f0] rounded p-8 print:break-inside-avoid">
            <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
              Executive Summary
            </h2>
            <div className="space-y-4 font-mono text-sm text-[#475569]">
              <p>══════════════════════════════════════════════════════════</p>
              <p className="font-sans font-medium text-[#0f172a]">
                VENTURA EU AI ACT COMPLIANCE ASSESSMENT
              </p>
              <p>══════════════════════════════════════════════════════════</p>
              <p>Assessment Date: {new Date().toLocaleDateString("en-GB")}</p>
              <p>AI System: {answers.aiSystemName || "Not specified"}</p>
              <p />
              <p className="font-sans font-medium text-[#0f172a]">
                CLASSIFICATION:
              </p>
              <p>
                Risk Level:{" "}
                {riskLevel === "prohibited"
                  ? "⚠️ PROHIBITED"
                  : riskLevel === "high-risk"
                  ? "⚠️ HIGH-RISK SYSTEM"
                  : "LIMITED-RISK"}
              </p>
              <p>
                Primary Category: Based on AI system purposes (Annex III mapping)
              </p>
              <p />
              <p className="font-sans font-medium text-[#0f172a]">
                COMPLIANCE STATUS:
              </p>
              <p>Overall Compliance: {complianceScore}%</p>
              <p>Critical Issues: {criticalGaps}</p>
              <p>High Priority: {highPriorityGaps}</p>
              <p />
              <p className="font-sans font-medium text-[#0f172a]">DEADLINE:</p>
              <p>Full compliance required by: 2 August 2026</p>
              <p>Time remaining: {daysUntil} days</p>
              <p />
              <p className="font-sans font-medium text-[#0f172a]">
                RECOMMENDATION:
              </p>
              <p>
                {complianceScore < 50
                  ? "Immediate action required. Schedule compliance consultation."
                  : complianceScore < 80
                  ? "Address identified gaps. Consider compliance consultation."
                  : "Continue monitoring. Maintain documentation."}
              </p>
            </div>
          </section>

          {/* Article-by-Article Checklist */}
          {riskLevel === "high-risk" && (
            <section className="bg-white border border-[#e2e8f0] rounded p-8 print:break-inside-avoid">
              <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-6">
                Compliance Checklist
              </h2>
              <div className="space-y-4">
                {articleGaps.map((gap) => (
                  <div key={gap.article} className="flex items-center justify-between py-3 border-b border-[#e2e8f0] last:border-0">
                    <span className="text-[15px] text-[#0f172a]">
                      {gap.article}
                    </span>
                    <span
                      className={`text-[15px] font-medium ${
                        gap.pct >= 80
                          ? "text-green-600"
                          : gap.pct >= 50
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {gap.pct}% Complete
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Code-Level Recommendations */}
          {riskLevel === "high-risk" && (
            <section className="bg-white border border-[#e2e8f0] rounded p-8 print:break-inside-avoid">
              <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-4">
                Automated Code Analysis Preview
              </h2>
              <p className="text-[15px] text-[#475569] leading-relaxed mb-6">
                Based on your assessment, Ventura&apos;s automated code scanner
                will likely detect violations in your codebase. Common issues:
              </p>
              <ul className="space-y-2 text-[15px] text-[#475569]">
                <li>• Protected characteristics in features (Article 10)</li>
                <li>• Missing human oversight (Article 14)</li>
                <li>• No data validation (Article 10)</li>
                <li>• Missing logging (Article 12)</li>
              </ul>
              <a
                href="/#contact"
                className="inline-block mt-6 px-6 py-3 bg-[#0f172a] text-white text-[15px] font-medium hover:bg-[#1e293b] transition-colors"
              >
                Start Automated Code Scan
              </a>
            </section>
          )}

          {/* 90-Day Roadmap */}
          {riskLevel === "high-risk" && complianceScore < 80 && (
            <section className="bg-white border border-[#e2e8f0] rounded p-8 print:break-inside-avoid">
              <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#64748b] mb-6">
                90-Day Compliance Roadmap
              </h2>
              <div className="space-y-6 text-[15px] text-[#475569]">
                <div>
                  <p className="font-medium text-[#0f172a]">
                    Phase 1: Critical Foundations (Days 1-30)
                  </p>
                  <p className="mt-2">
                    Risk management system, data governance framework
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#0f172a]">
                    Phase 2: Technical Requirements (Days 31-60)
                  </p>
                  <p className="mt-2">
                    Technical documentation, transparency, human oversight
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#0f172a]">
                    Phase 3: Operational Compliance (Days 61-90)
                  </p>
                  <p className="mt-2">
                    Quality management, conformity assessment
                  </p>
                </div>
                <p className="text-sm text-[#64748b] pt-4">
                  Total estimated effort: 420-540 hours. Recommended team: 3-4
                  people.
                </p>
              </div>
            </section>
          )}

          {/* Next Steps */}
          <section className="bg-[#0f172a] text-white rounded p-8 print:break-inside-avoid">
            <h2 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#94a3b8] mb-6">
              Recommended Next Steps
            </h2>
            <div className="space-y-4">
              <a
                href="/#contact"
                className="block p-4 bg-white/10 rounded hover:bg-white/20 transition-colors"
              >
                <p className="font-medium">Schedule Compliance Consultation</p>
                <p className="text-sm text-[#94a3b8] mt-1">
                  Free 30-minute consultation with our specialists
                </p>
              </a>
              <a
                href="/#contact"
                className="block p-4 bg-white/10 rounded hover:bg-white/20 transition-colors"
              >
                <p className="font-medium">Start Free Code Scan</p>
                <p className="text-sm text-[#94a3b8] mt-1">
                  Line-by-line analysis with specific fixes
                </p>
              </a>
              <p className="text-sm text-[#94a3b8] pt-4">
                Email: hello@ventura.com | Use &quot;Download / Print PDF&quot; to save this report
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
