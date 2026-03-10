"use client";

import { useState, useCallback, useMemo } from "react";

export interface Violation {
  id: string;
  line: number;
  severity: "CRITICAL" | "WARNING" | "INFO";
  article: string;
  articleFull: string;
  title: string;
  description: string;
  suggestedFix: string;
  riskLevel?: string;
  checkFixed: (code: string) => boolean;
}

const INITIAL_CODE = `# train.py - AI Recruitment System

import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def train_model():
    df = pd.read_csv('candidates.csv')
    
    features = ['age', 'gender', 'race', 'education']
    X = df[features]
    y = df['hired']
    
    model = RandomForestClassifier()
    model.fit(X, y)
    
    return model`;

const FIXED_CODE = `# train.py - AI Recruitment System

import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def train_model():
    df = pd.read_csv('candidates.csv')
    
    features = ['education', 'experience']
    X = df[features]
    y = df['hired']
    
    model = RandomForestClassifier()
    validate_completeness(df)
    check_bias(df, features)
    model.fit(X, y)
    
    return model`;

const VIOLATION_DEFINITIONS: Violation[] = [
  {
    id: "v1",
    line: 9,
    severity: "CRITICAL",
    article: "Article 10(2)(f)",
    articleFull: "Article 10(2)(f)",
    title: "Protected characteristics detected",
    description:
      "Using 'gender' and 'race' as model features creates discriminatory outcomes.",
    suggestedFix: "features = ['education', 'experience']",
    riskLevel: "€20M fine",
    checkFixed: (code) => {
      const featuresLine = code.match(/features\s*=\s*\[([^\]]+)\]/);
      if (!featuresLine) return false;
      const features = featuresLine[1].toLowerCase();
      return (
        !features.includes("gender") &&
        !features.includes("race") &&
        !features.includes("age")
      );
    },
  },
  {
    id: "v2",
    line: 14,
    severity: "CRITICAL",
    article: "Article 10(3)",
    articleFull: "Article 10(3)",
    title: "No data quality validation",
    description:
      "Training data loaded without bias checks or validation.",
    suggestedFix: `validate_completeness(df)
check_bias(df, features)`,
    checkFixed: (code) =>
      code.includes("validate_completeness") && code.includes("check_bias"),
  },
];

const CONSULTANTS = [
  {
    id: "maria",
    name: "Maria Chen",
    role: "Lead Compliance Advisor",
    expertise: "Data governance & bias prevention",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    bookingUrl: "https://calendly.com/ventura/maria",
  },
  {
    id: "james",
    name: "James Okonkwo",
    role: "Senior AI Compliance Specialist",
    expertise: "Technical documentation & risk assessment",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bookingUrl: "https://calendly.com/ventura/james",
  },
  {
    id: "sophie",
    name: "Sophie Laurent",
    role: "EU Regulatory Expert",
    expertise: "AI Act implementation & audits",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    bookingUrl: "https://calendly.com/ventura/sophie",
  },
];

function ViolationsSummary({
  count,
  onFixAll,
}: {
  count: number;
  onFixAll: () => void;
}) {
  if (count === 0) return null;
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-start gap-3">
        <svg
          className="w-6 h-6 text-[#DC2626] flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            {count} Critical Violation{count !== 1 ? "s" : ""}
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Fix the issues in the code to achieve compliance
          </p>
          <button
            type="button"
            onClick={onFixAll}
            className="mt-4 px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded hover:bg-[#1e293b] transition-colors"
          >
            Fix code
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessBanner({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-6 mb-6 transition-all duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-[20px] font-semibold text-[#166534]">
            All violations resolved
          </h2>
          <p className="text-sm text-[#15803D] mt-0.5">
            Your code now meets EU AI Act requirements for this demo.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-3 text-sm font-medium text-[#166534] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

function ViolationCard({
  violation,
  articleId,
}: {
  violation: Violation;
  articleId: string;
}) {
  const [showFullArticle, setShowFullArticle] = useState(false);

  return (
    <div
      className="bg-white border-l-4 border-[#DC2626] border border-[#E5E7EB] rounded-r-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6 mb-4 transition-all duration-200 hover:border-[#BFDBFE] hover:translate-x-0.5"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-[#FEF2F2] rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-[#DC2626]"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[13px] font-medium text-[#6B7280]">
              Line {violation.line}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase bg-[#FEE2E2] text-[#991B1B]">
              {violation.severity}
            </span>
            <a
              href={`/compliance/article-${articleId}`}
              className="text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 rounded"
            >
              {violation.articleFull}
            </a>
          </div>
          <h3 className="text-[18px] font-semibold text-[#111827] mt-2">
            {violation.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-[#374151] leading-relaxed mb-4">
        {violation.description}
      </p>

      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-md p-4 mb-4">
        <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-wider mb-2">
          Suggested fix:
        </p>
        <pre className="text-[13px] font-mono text-[#15803D] bg-white border border-[#86EFAC] rounded p-3 overflow-x-auto">
          <code>{violation.suggestedFix}</code>
        </pre>
      </div>

      {violation.riskLevel && (
        <p className="text-sm text-[#6B7280] mb-4">
          <span className="font-medium">Risk:</span> {violation.riskLevel}
        </p>
      )}

      <button
        onClick={() => setShowFullArticle(!showFullArticle)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowFullArticle((v) => !v);
          }
          if (e.key === "Escape") setShowFullArticle(false);
        }}
        className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 rounded"
        aria-expanded={showFullArticle}
      >
        {showFullArticle ? "Hide" : "View"} full article text
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showFullArticle ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showFullArticle && (
        <div className="mt-4 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-md">
          <p className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-wider mb-2">
            Official EU AI Act Text:
          </p>
          <p className="text-[13px] text-[#1E3A8A] leading-relaxed">
            Training, validation and testing data sets shall be subject to
            appropriate data governance and management practices. Appropriate
            measures shall be taken to detect, prevent and mitigate possible
            biases in the data sets.
          </p>
          <a
            href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
          >
            Read complete article →
          </a>
        </div>
      )}
    </div>
  );
}

function EditableCodeEditor({
  code,
  onChange,
  violations,
}: {
  code: string;
  onChange: (code: string) => void;
  violations: Violation[];
}) {
  const lines = code.split("\n");
  const violationLines = new Set(violations.map((v) => v.line));
  const lineHeight = 1.6;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="relative font-mono text-sm">
      <div
        className="absolute top-0 left-0 w-12 pr-4 text-right text-[#9CA3AF] select-none pointer-events-none"
        style={{ lineHeight: lineHeight, minHeight: lines.length * lineHeight + "em" }}
      >
        {lines.map((_, i) => (
          <div
            key={i}
            className={violationLines.has(i + 1) ? "bg-[#FEF2F2]" : ""}
            style={{ minHeight: lineHeight + "em" }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        spellCheck={false}
        rows={Math.max(18, lines.length + 1)}
        className="block w-full pl-14 pr-4 py-0 resize-y bg-transparent border-0 focus:ring-0 focus:outline-none text-[#1F2937] font-mono text-sm align-top"
        style={{ tabSize: 4, lineHeight: lineHeight }}
        placeholder="Edit the code to fix violations..."
        aria-label="Editable code"
      />
    </div>
  );
}

function ConsultantSection({
  selectedId,
  onSelect,
  isVisible,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  isVisible: boolean;
}) {
  const selected = CONSULTANTS.find((c) => c.id === selectedId);

  if (!isVisible) return null;

  return (
    <section className="mt-12 pt-12 border-t border-[#E5E7EB]">
      <div className="mb-8">
        <h2 className="text-[24px] font-light text-[#111827] mb-2">
          Schedule a consultation
        </h2>
        <p className="text-[15px] text-[#6B7280]">
          Choose an advisor to book a compliance review call
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {CONSULTANTS.map((consultant) => (
          <button
            key={consultant.id}
            onClick={() => onSelect(selectedId === consultant.id ? null : consultant.id)}
            className={`group text-left p-6 rounded-lg border-2 transition-all duration-200 ${
              selectedId === consultant.id
                ? "border-[#0f172a] bg-[#f8fafc] shadow-md"
                : "border-[#E5E7EB] bg-white hover:border-[#94a3b8]"
            }`}
          >
            <div className="aspect-square w-full max-w-[140px] mx-auto mb-4 rounded-full overflow-hidden bg-[#e2e8f0]">
              <img
                src={consultant.photo}
                alt={consultant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-[17px] font-semibold text-[#111827]">
              {consultant.name}
            </h3>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              {consultant.role}
            </p>
            <p className="text-[12px] text-[#94a3b8] mt-2">
              {consultant.expertise}
            </p>
            <span
              className={`inline-block mt-3 text-sm font-medium ${
                selectedId === consultant.id
                  ? "text-[#0f172a]"
                  : "text-[#64748b] group-hover:text-[#0f172a]"
              }`}
            >
              {selectedId === consultant.id ? "Selected" : "Select"} →
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-[#0f172a] rounded-lg p-8 text-white text-center">
          <p className="text-[15px] text-[#94a3b8] mb-2">
            Book a call with {selected.name}
          </p>
          <a
            href={selected.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0f172a] text-[15px] font-medium rounded hover:bg-[#f1f5f9] transition-colors"
          >
            Book a call
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}

export default function InteractiveViolationDemo() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(
    null
  );

  const activeViolations = useMemo(() => {
    return VIOLATION_DEFINITIONS.filter((v) => !v.checkFixed(code));
  }, [code]);

  const allFixed = activeViolations.length === 0;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 pt-[90px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-[30px] font-light text-[#111827] leading-tight mb-2">
            train.py – Ventura Analysis
          </h1>
          <p className="text-base text-[#6B7280]">
            EU AI Act Compliance Scan · Edit the code to fix violations
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className={`lg:order-1 order-2 bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-500 ${
              allFixed ? "blur-sm pointer-events-none select-none" : ""
            }`}
          >
            <div className="bg-[#F3F4F6] border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#374151]">
                train.py
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCode(INITIAL_CODE)}
                  className="text-xs font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  Reset
                </button>
                <span className="text-xs text-[#6B7280]">Python</span>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <EditableCodeEditor
                code={code}
                onChange={setCode}
                violations={activeViolations}
              />
            </div>
          </div>

          <div className="lg:order-2 order-1">
            {allFixed ? (
              <SuccessBanner onReset={() => setCode(INITIAL_CODE)} />
            ) : (
              <ViolationsSummary
                count={activeViolations.length}
                onFixAll={() => setCode(FIXED_CODE)}
              />
            )}

            <div className="space-y-0">
              {activeViolations.map((violation) => (
                <ViolationCard
                  key={violation.id}
                  violation={violation}
                  articleId={violation.article.split("(")[0].replace("Article ", "")}
                />
              ))}
            </div>

            <ConsultantSection
              selectedId={selectedConsultant}
              onSelect={setSelectedConsultant}
              isVisible={allFixed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
