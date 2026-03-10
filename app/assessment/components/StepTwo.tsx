"use client";

import { useAssessment } from "../AssessmentContext";
import StepLayout from "./StepLayout";
import {
  AI_SYSTEM_PURPOSES,
  DATA_SOURCES,
  DECISION_AUTHORITY_OPTIONS,
} from "../constants";

function formatLabel(value: string) {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function StepTwo() {
  const { answers, updateAnswers, toggleArrayAnswer, setStep } = useAssessment();

  return (
    <StepLayout
      step={2}
      totalSteps={5}
      title="AI System Details"
      subtitle="Describe your AI system and its use cases. Approximately 5 minutes."
      onBack={() => setStep(1)}
      onNext={() => setStep(3)}
    >
      <div className="space-y-12">
        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            2.1 AI System Purpose
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Check all that apply. Used for: High-risk classification (Annex III)
          </p>
          <div className="space-y-6">
            {AI_SYSTEM_PURPOSES.map((group) => (
              <div key={group.group}>
                <p className="text-[13px] font-medium text-[#64748b] mb-3 uppercase tracking-wide">
                  {group.group}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {group.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 p-3 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={answers.aiSystemPurposes.includes(opt)}
                        onChange={() => toggleArrayAnswer("aiSystemPurposes", opt)}
                        className="rounded"
                      />
                      <span className="text-[14px] text-[#475569]">
                        {formatLabel(opt)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            2.2 Data Sources
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            What data does your AI system process? Used for: Article 10
          </p>
          <div className="space-y-6">
            {DATA_SOURCES.map((group) => (
              <div key={group.group}>
                <p className="text-[13px] font-medium text-[#64748b] mb-3 uppercase tracking-wide">
                  {group.group}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {group.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 p-3 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={answers.dataSources.includes(opt)}
                        onChange={() => toggleArrayAnswer("dataSources", opt)}
                        className="rounded"
                      />
                      <span className="text-[14px] text-[#475569]">
                        {formatLabel(opt)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            2.3 Decision Authority
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Who makes final decisions based on AI output? Used for: Article 14
          </p>
          <div className="space-y-3">
            {DECISION_AUTHORITY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-4 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
              >
                <input
                  type="radio"
                  name="decisionAuthority"
                  value={opt.value}
                  checked={answers.decisionAuthority === opt.value}
                  onChange={() =>
                    updateAnswers({
                      decisionAuthority: opt.value as typeof answers.decisionAuthority,
                    })
                  }
                  className="mt-1"
                />
                <span className="text-[15px] text-[#475569]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
