"use client";

import { useState } from "react";

export interface Violation {
  line: number;
  severity: "CRITICAL" | "WARNING" | "INFO";
  article: string;
  articleFull: string;
  title: string;
  description: string;
  suggestedFix: string;
  riskLevel?: string;
}

export interface CodeFile {
  filename: string;
  language: string;
  code: string;
  violations: Violation[];
}

function ViolationsSummary({ violations }: { violations: Violation[] }) {
  const critical = violations.filter((v) => v.severity === "CRITICAL").length;
  const warnings = violations.filter((v) => v.severity === "WARNING").length;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-start gap-3">
        {critical > 0 && (
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
        )}
        <div>
          <h2 className="text-[20px] font-semibold text-[#111827]">
            {critical} Critical Violation{critical !== 1 ? "s" : ""}
          </h2>
          {warnings > 0 && (
            <p className="text-sm text-[#6B7280] mt-1">
              {warnings} warning{warnings !== 1 ? "s" : ""} found
            </p>
          )}
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
  const severityColor =
    violation.severity === "CRITICAL"
      ? "border-[#DC2626]"
      : violation.severity === "WARNING"
        ? "border-[#D97706]"
        : "border-[#2563EB]";

  return (
    <div
      className={`bg-white border-l-4 ${severityColor} border border-[#E5E7EB] rounded-r-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6 mb-4 transition-all duration-200 hover:border-[#BFDBFE] hover:translate-x-0.5`}
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
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                violation.severity === "CRITICAL"
                  ? "bg-[#FEE2E2] text-[#991B1B]"
                  : violation.severity === "WARNING"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
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
        aria-controls={`article-${violation.line}`}
      >
        {showFullArticle ? "Hide" : "View"} full article text
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showFullArticle ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
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
        <div
          id={`article-${violation.line}`}
          className="mt-4 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-md"
        >
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

function CodeWithHighlights({
  code,
  violations,
}: {
  code: string;
  violations: Violation[];
}) {
  const lines = code.split("\n");
  const violationLines = new Set(violations.map((v) => v.line));

  return (
    <div className="font-mono text-sm leading-[1.6]">
      {lines.map((line, index) => {
        const lineNumber = index + 1;
        const hasViolation = violationLines.has(lineNumber);

        return (
          <div
            key={index}
            className={`flex ${hasViolation ? "bg-[#FEF2F2] border-l-2 border-[#DC2626]" : ""}`}
          >
            <span className="inline-block w-12 text-right pr-4 text-[#9CA3AF] select-none flex-shrink-0">
              {lineNumber}
            </span>
            <span
              className={`flex-1 ${hasViolation ? "text-[#7F1D1D] font-medium" : "text-[#1F2937]"}`}
            >
              {line || " "}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ViolationAnalysis({ file }: { file: CodeFile }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 pt-[90px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-[30px] font-light text-[#111827] leading-tight mb-2">
            {file.filename} – Ventura Analysis
          </h1>
          <p className="text-base text-[#6B7280]">EU AI Act Compliance Scan</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:order-1 order-2 bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="bg-[#F3F4F6] border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#374151]">
                {file.filename}
              </span>
              <span className="text-xs text-[#6B7280]">{file.language}</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <CodeWithHighlights
                code={file.code}
                violations={file.violations}
              />
            </div>
          </div>

          <div className="lg:order-2 order-1 space-y-0">
            <ViolationsSummary violations={file.violations} />
            <div className="space-y-0">
              {file.violations.map((violation, index) => (
                <ViolationCard
                  key={index}
                  violation={violation}
                  articleId={violation.article
                    .split("(")[0]
                    .replace("Article ", "")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
