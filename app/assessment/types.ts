export type OrganizationType =
  | "startup"
  | "sme"
  | "midmarket"
  | "enterprise"
  | "public"
  | "research"
  | "nonprofit";

export type GeographicScope =
  | "eu-based"
  | "non-eu-serving-eu"
  | "global-eu-ops"
  | "non-eu-no-eu";

export type UserRole =
  | "provider"
  | "deployer"
  | "distributor"
  | "importer"
  | "manufacturer"
  | "authorized-rep"
  | "multiple";

export type DecisionAuthority =
  | "fully-automated"
  | "human-in-loop-proforma"
  | "ai-recommends-human-decides"
  | "ai-assists-meaningful-oversight"
  | "ai-information-only";

export type RiskLevel = "prohibited" | "high-risk" | "limited-risk" | "minimal-risk" | "unknown";

export interface AssessmentAnswers {
  // Step 1: Company Profile
  organizationType?: OrganizationType;
  geographicScope?: GeographicScope;
  userRole?: UserRole;

  // Step 2: AI System Details
  aiSystemPurposes: string[];
  dataSources: string[];
  decisionAuthority?: DecisionAuthority;

  // Step 3: Risk Classification
  prohibitedPractices: string[];
  highRiskDetermination: string[];

  // Step 4: Technical Assessment
  riskManagement: string[];
  dataGovernance: string[];
  technicalDocumentation: string[];
  loggingRecordKeeping: string[];
  transparency: string[];
  humanOversight: string[];
  accuracyRobustness: string[];
  qualityManagement: string[];
  conformityAssessment: string[];
  deployerObligations: string[];

  // Metadata
  companyName?: string;
  aiSystemName?: string;
}

export const DEFAULT_ANSWERS: AssessmentAnswers = {
  aiSystemPurposes: [],
  dataSources: [],
  prohibitedPractices: [],
  highRiskDetermination: [],
  riskManagement: [],
  dataGovernance: [],
  technicalDocumentation: [],
  loggingRecordKeeping: [],
  transparency: [],
  humanOversight: [],
  accuracyRobustness: [],
  qualityManagement: [],
  conformityAssessment: [],
  deployerObligations: [],
};
