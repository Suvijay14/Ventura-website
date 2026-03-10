"use client";

import { useAssessment } from "../AssessmentContext";
import StepLayout from "./StepLayout";
import {
  ORGANIZATION_TYPES,
  GEOGRAPHIC_SCOPES,
  USER_ROLES,
} from "../constants";

export default function StepOne() {
  const { answers, updateAnswers, setStep } = useAssessment();

  return (
    <StepLayout
      step={1}
      totalSteps={5}
      title="Company Profile"
      subtitle="Help us understand your organization. Approximately 2 minutes."
      showBack={false}
      onNext={() => setStep(2)}
    >
      <div className="space-y-12">
        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            1.1 Organization Type
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Used for: SME-specific guidance, regulatory sandbox eligibility
          </p>
          <div className="space-y-3">
            {ORGANIZATION_TYPES.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-4 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
              >
                <input
                  type="radio"
                  name="orgType"
                  value={opt.value}
                  checked={answers.organizationType === opt.value}
                  onChange={() =>
                    updateAnswers({
                      organizationType: opt.value as typeof answers.organizationType,
                    })
                  }
                  className="mt-1"
                />
                <span className="text-[15px] text-[#475569]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            1.2 Geographic Scope
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Used for: Scope determination (Article 2)
          </p>
          <div className="space-y-3">
            {GEOGRAPHIC_SCOPES.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-4 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
              >
                <input
                  type="radio"
                  name="geoScope"
                  value={opt.value}
                  checked={answers.geographicScope === opt.value}
                  onChange={() =>
                    updateAnswers({
                      geographicScope: opt.value as typeof answers.geographicScope,
                    })
                  }
                  className="mt-1"
                />
                <span className="text-[15px] text-[#475569]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[15px] font-medium text-[#0f172a] mb-4">
            1.3 Your Role
          </label>
          <p className="text-sm text-[#64748b] mb-4">
            Used for: Obligation mapping (Articles 16-29)
          </p>
          <div className="space-y-3">
            {USER_ROLES.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-4 bg-white border border-[#e2e8f0] rounded cursor-pointer hover:border-[#64748b] transition-colors"
              >
                <input
                  type="radio"
                  name="userRole"
                  value={opt.value}
                  checked={answers.userRole === opt.value}
                  onChange={() =>
                    updateAnswers({
                      userRole: opt.value as typeof answers.userRole,
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
