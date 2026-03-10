import { AssessmentAnswers, RiskLevel } from "../types";

export function calculateComplianceScore(answers: AssessmentAnswers): number {
  const sections = [
    answers.riskManagement?.length || 0,
    answers.dataGovernance?.length || 0,
    answers.technicalDocumentation?.length || 0,
    answers.loggingRecordKeeping?.length || 0,
    answers.transparency?.length || 0,
    answers.humanOversight?.length || 0,
    answers.accuracyRobustness?.length || 0,
    answers.qualityManagement?.length || 0,
  ];

  const totals = [6, 8, 15, 5, 10, 8, 8, 7];
  let totalScore = 0;
  let maxScore = 0;

  sections.forEach((score, i) => {
    totalScore += score;
    maxScore += totals[i] || 0;
  });

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
}

export function getCriticalGaps(answers: AssessmentAnswers): number {
  const score = calculateComplianceScore(answers);
  if (score >= 80) return 0;
  if (score >= 60) return 2;
  if (score >= 40) return 5;
  return 8;
}

export function getHighPriorityGaps(answers: AssessmentAnswers): number {
  const score = calculateComplianceScore(answers);
  if (score >= 80) return 2;
  if (score >= 60) return 6;
  if (score >= 40) return 10;
  return 12;
}

export function getDaysUntilDeadline(): number {
  const deadline = new Date("2026-08-02");
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const ARTICLE_MAPPING: { key: keyof AssessmentAnswers; article: string; total: number }[] = [
  { key: "riskManagement", article: "Article 9: Risk Management", total: 6 },
  { key: "dataGovernance", article: "Article 10: Data Governance", total: 8 },
  { key: "technicalDocumentation", article: "Article 11: Technical Documentation", total: 15 },
  { key: "loggingRecordKeeping", article: "Article 12: Logging", total: 5 },
  { key: "transparency", article: "Article 13: Transparency", total: 10 },
  { key: "humanOversight", article: "Article 14: Human Oversight", total: 8 },
  { key: "accuracyRobustness", article: "Article 15: Accuracy & Cybersecurity", total: 8 },
  { key: "qualityManagement", article: "Article 17: Quality Management", total: 7 },
];

export function getArticleGaps(answers: AssessmentAnswers) {
  return ARTICLE_MAPPING.map(({ key, article, total }) => {
    const completed = (answers[key] as string[])?.length || 0;
    return {
      article,
      completed,
      total,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });
}
