"use client";

import Link from "next/link";

interface StepLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
}

const STEPS = [
  "Company Profile",
  "AI System Details",
  "Risk Classification",
  "Technical Assessment",
  "Compliance Report",
];

export default function StepLayout({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  showBack = true,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-[90px] pb-20">
      <div className="max-w-[900px] mx-auto px-8 lg:px-20">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded ${
                  i + 1 <= step ? "bg-[#0f172a]" : "bg-[#e2e8f0]"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-[#64748b]">
            Step {step} of {totalSteps}: {STEPS[step - 1]}
          </p>
        </div>

        {/* Header */}
        <h1 className="text-[36px] sm:text-[42px] font-light leading-[1.2] text-[#0f172a]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-[#64748b]">{subtitle}</p>
        )}

        {/* Content */}
        <div className="mt-12">{children}</div>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between">
          <div>
            {showBack && step > 1 && (
              <button
                onClick={onBack}
                className="text-[15px] font-medium text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 text-[15px] font-medium text-[#64748b] hover:text-[#0f172a] transition-colors"
            >
              Save & Exit
            </Link>
            {onNext && (
              <button
                onClick={onNext}
                className="px-8 py-3 bg-[#0f172a] text-white text-[15px] font-medium hover:bg-[#1e293b] transition-colors"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
