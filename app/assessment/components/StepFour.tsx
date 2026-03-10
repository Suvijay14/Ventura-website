"use client";

import { useAssessment } from "../AssessmentContext";
import StepLayout from "./StepLayout";
import {
  RISK_MANAGEMENT_ITEMS,
  DATA_GOVERNANCE_ITEMS,
  TECHNICAL_DOC_ITEMS,
  LOGGING_ITEMS,
  TRANSPARENCY_ITEMS,
  HUMAN_OVERSIGHT_ITEMS,
  ACCURACY_ITEMS,
  QMS_ITEMS,
} from "../constants";

const SECTIONS = [
  {
    key: "riskManagement",
    title: "4.1 Risk Management (Article 9)",
    items: RISK_MANAGEMENT_ITEMS,
  },
  {
    key: "dataGovernance",
    title: "4.2 Data Governance (Article 10)",
    items: DATA_GOVERNANCE_ITEMS,
  },
  {
    key: "technicalDocumentation",
    title: "4.3 Technical Documentation (Article 11 & Annex IV)",
    items: TECHNICAL_DOC_ITEMS,
  },
  {
    key: "loggingRecordKeeping",
    title: "4.4 Logging & Record-Keeping (Article 12)",
    items: LOGGING_ITEMS,
  },
  {
    key: "transparency",
    title: "4.5 Transparency (Article 13)",
    items: TRANSPARENCY_ITEMS,
  },
  {
    key: "humanOversight",
    title: "4.6 Human Oversight (Article 14)",
    items: HUMAN_OVERSIGHT_ITEMS,
  },
  {
    key: "accuracyRobustness",
    title: "4.7 Accuracy, Robustness, Cybersecurity (Article 15)",
    items: ACCURACY_ITEMS,
  },
  {
    key: "qualityManagement",
    title: "5.1 Quality Management (Article 17)",
    items: QMS_ITEMS,
  },
];

function formatLabel(value: string) {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function StepFour() {
  const { answers, toggleArrayAnswer, setStep, riskLevel } = useAssessment();

  if (riskLevel === "prohibited") {
    return (
      <StepLayout
        step={4}
        totalSteps={5}
        title="Technical Assessment"
        subtitle="Skipped — Prohibited systems require legal consultation."
        onBack={() => setStep(3)}
        onNext={() => setStep(5)}
        nextLabel="View Report"
      >
        <div className="p-8 bg-white border border-[#e2e8f0] rounded">
          <p className="text-[17px] text-[#475569] leading-relaxed">
            Your system has been preliminarily classified as prohibited under
            Article 5 of the EU AI Act. Technical assessment questions do not
            apply. We recommend scheduling a compliance consultation for
            detailed guidance.
          </p>
        </div>
      </StepLayout>
    );
  }

  return (
    <StepLayout
      step={4}
      totalSteps={5}
      title="Technical Assessment"
      subtitle="For high-risk systems. Check all that apply. Approximately 7 minutes."
      onBack={() => setStep(3)}
      onNext={() => setStep(5)}
      nextLabel="Generate Report"
    >
      <div className="space-y-12">
        {SECTIONS.map((section) => {
          const selected = (answers[section.key as keyof typeof answers] as string[]) || [];
          const total = section.items.length;
          const completed = selected.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <div key={section.key}>
              <div className="flex items-center justify-between mb-4">
                <label className="text-[15px] font-medium text-[#0f172a]">
                  {section.title}
                </label>
                <span className="text-sm text-[#64748b]">
                  {completed}/{total} ({pct}%)
                </span>
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 p-3 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item)}
                      onChange={() =>
                        toggleArrayAnswer(
                          section.key as keyof typeof answers,
                          item
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-[14px] text-[#475569]">
                      {formatLabel(item)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </StepLayout>
  );
}
