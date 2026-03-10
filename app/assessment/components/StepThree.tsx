"use client";

import { useAssessment } from "../AssessmentContext";
import StepLayout from "./StepLayout";
import { PROHIBITED_PRACTICES } from "../constants";
import { RiskLevel } from "../types";

const HIGH_RISK_INDICATORS = [
  "recruitment",
  "performance-eval",
  "task-allocation",
  "promotion",
  "credit-scoring",
  "loan-approval",
  "fraud-detection",
  "insurance-underwriting",
  "risk-assessment",
  "diagnostic-support",
  "medical-imaging",
  "patient-triage",
  "treatment-recommendations",
  "clinical-decision",
  "facial-recognition",
  "emotion-recognition",
  "biometric-categorization",
  "remote-biometric-realtime",
  "remote-biometric-post",
  "energy-systems",
  "transportation-safety",
  "water-gas-supply",
  "emergency-dispatch",
  "criminal-risk-assessment",
  "lie-detection",
  "evidence-reliability",
  "predictive-policing",
  "student-assessment",
  "admission",
  "student-monitoring",
  "immigration-asylum",
  "social-benefits",
  "essential-public-services",
];

function formatLabel(value: string) {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function StepThree() {
  const { answers, toggleArrayAnswer, setStep, setRiskLevel } = useAssessment();

  const handleNext = () => {
    // Determine risk level
    if (answers.prohibitedPractices.length > 0) {
      setRiskLevel("prohibited");
    } else if (
      answers.aiSystemPurposes.some((p) => HIGH_RISK_INDICATORS.includes(p))
    ) {
      setRiskLevel("high-risk");
    } else {
      setRiskLevel("limited-risk");
    }
    setStep(4);
  };

  const isProhibited = answers.prohibitedPractices.length > 0;
  const isHighRisk =
    !isProhibited &&
    answers.aiSystemPurposes.some((p) => HIGH_RISK_INDICATORS.includes(p));

  return (
    <StepLayout
      step={3}
      totalSteps={5}
      title="Risk Classification"
      subtitle="Based on your AI system details. Approximately 3 minutes."
      onBack={() => setStep(2)}
      onNext={handleNext}
    >
      <div className="space-y-12">
        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            3.1 Prohibited Practices Check
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Does your AI system perform any of the following? (Article 5)
          </p>
          {isProhibited && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-[15px] font-medium text-red-800">
                ⚠️ System may be PROHIBITED under EU AI Act
              </p>
              <p className="text-sm text-red-700 mt-1">
                Consult legal counsel for specific guidance.
              </p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-2">
            {PROHIBITED_PRACTICES.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 p-3 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={answers.prohibitedPractices.includes(opt)}
                  onChange={() => toggleArrayAnswer("prohibitedPractices", opt)}
                  className="rounded"
                />
                <span className="text-[14px] text-[#475569]">
                  {formatLabel(opt)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border border-[#e2e8f0] rounded">
          <h3 className="text-[17px] font-medium text-[#0f172a] mb-4">
            3.2 Preliminary Risk Determination
          </h3>
          <p className="text-[15px] text-[#475569] leading-relaxed">
            Based on your AI system purposes (recruitment, credit scoring,
            healthcare, biometric, etc.), your system is preliminarily classified
            as:
          </p>
          <div className="mt-4 p-4 bg-[#f8fafc] rounded">
            {isProhibited ? (
              <p className="text-[17px] font-medium text-red-700">
                PROHIBITED — Requires immediate legal review
              </p>
            ) : isHighRisk ? (
              <p className="text-[17px] font-medium text-[#0f172a]">
                HIGH-RISK — Full compliance requirements apply (Articles 9-15,
                16-29)
              </p>
            ) : (
              <p className="text-[17px] font-medium text-[#0f172a]">
                LIMITED-RISK — Transparency obligations apply
              </p>
            )}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
