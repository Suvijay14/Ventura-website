export const ORGANIZATION_TYPES = [
  { value: "startup", label: "Startup (< 50 employees, < €10M revenue)" },
  { value: "sme", label: "SME (< 250 employees, < €50M revenue)" },
  { value: "midmarket", label: "Mid-market (250-1000 employees)" },
  { value: "enterprise", label: "Enterprise (> 1000 employees)" },
  { value: "public", label: "Public sector / Government" },
  { value: "research", label: "Research institution" },
  { value: "nonprofit", label: "Non-profit" },
];

export const GEOGRAPHIC_SCOPES = [
  { value: "eu-based", label: "EU-based company" },
  { value: "non-eu-serving-eu", label: "Non-EU company serving EU market" },
  { value: "global-eu-ops", label: "Global company with EU operations" },
  { value: "non-eu-no-eu", label: "Non-EU company, no EU operations" },
];

export const USER_ROLES = [
  { value: "provider", label: "Provider (developing/placing AI on market)" },
  { value: "deployer", label: "Deployer (using AI systems)" },
  { value: "distributor", label: "Distributor (making AI available in EU)" },
  { value: "importer", label: "Importer (placing AI from third country into EU)" },
  { value: "manufacturer", label: "Product Manufacturer (integrating AI into product)" },
  { value: "authorized-rep", label: "Authorized Representative" },
  { value: "multiple", label: "Multiple roles" },
];

export const AI_SYSTEM_PURPOSES = [
  { group: "Employment & HR", options: [
    "recruitment", "performance-eval", "task-allocation", "promotion",
  ]},
  { group: "Financial Services", options: [
    "credit-scoring", "loan-approval", "fraud-detection", "insurance-underwriting", "risk-assessment",
  ]},
  { group: "Healthcare", options: [
    "diagnostic-support", "medical-imaging", "patient-triage", "treatment-recommendations", "clinical-decision",
  ]},
  { group: "Biometric", options: [
    "facial-recognition", "emotion-recognition", "biometric-categorization", "remote-biometric-realtime", "remote-biometric-post",
  ]},
  { group: "Critical Infrastructure", options: [
    "energy-systems", "transportation-safety", "water-gas-supply", "emergency-dispatch",
  ]},
  { group: "Law Enforcement", options: [
    "criminal-risk-assessment", "lie-detection", "evidence-reliability", "predictive-policing",
  ]},
  { group: "Education", options: [
    "student-assessment", "admission", "student-monitoring",
  ]},
  { group: "Other High-Risk", options: [
    "immigration-asylum", "social-benefits", "essential-public-services",
  ]},
];

export const DATA_SOURCES = [
  { group: "Personal Data", options: [
    "names-contact", "age", "gender", "race-ethnicity", "religious-beliefs", "political-opinions",
    "health-data", "genetic-data", "biometric-data", "location-data", "financial-info",
    "employment-history", "education-records", "criminal-records", "social-media",
  ]},
  { group: "Technical Data", options: [
    "images", "video", "audio-speech", "text-documents", "sensor-data", "timeseries",
  ]},
];

export const DECISION_AUTHORITY_OPTIONS = [
  { value: "fully-automated", label: "AI makes fully automated decisions" },
  { value: "human-in-loop-proforma", label: "AI makes decisions with human in loop (pro forma)" },
  { value: "ai-recommends-human-decides", label: "AI provides recommendations, human decides" },
  { value: "ai-assists-meaningful-oversight", label: "AI assists, human has meaningful oversight" },
  { value: "ai-information-only", label: "AI only provides information/analysis" },
];

export const PROHIBITED_PRACTICES = [
  "social-scoring",
  "behavior-manipulation",
  "vulnerability-exploitation",
  "realtime-biometric-public",
  "biometric-categorization-sensitive",
  "emotion-recognition-workplace",
  "facial-scraping",
  "predictive-policing",
];

export const RISK_MANAGEMENT_ITEMS = [
  "documented-risk-system",
  "risk-identification",
  "risk-estimation",
  "risk-evaluation-rights",
  "risk-mitigation",
  "regular-updating",
];

export const DATA_GOVERNANCE_ITEMS = [
  "relevant-representative-datasets",
  "free-from-errors",
  "complete-statistical",
  "data-governance-practices",
  "bias-examination",
  "bias-mitigation",
  "protected-characteristics-attention",
  "special-categories-justified",
];

export const TECHNICAL_DOC_ITEMS = [
  "intended-purpose",
  "versions-changes",
  "provider-info",
  "instructions-use",
  "system-architecture",
  "computational-resources",
  "development-methodology",
  "design-choices",
  "data-requirements",
  "data-provenance",
  "bias-detection-results",
  "validation-testing",
  "performance-capabilities",
  "known-limitations",
  "accuracy-metrics",
];

export const LOGGING_ITEMS = [
  "automatic-logging",
  "traceability-level",
  "operation-periods",
  "compliance-demonstration",
  "tampering-protection",
];

export const TRANSPARENCY_ITEMS = [
  "provider-identity",
  "system-characteristics",
  "performance-levels",
  "changes-updates",
  "oversight-measures",
  "expected-lifetime",
  "cybersecurity-measures",
  "intended-purpose-deployers",
  "accuracy-level",
  "known-limitations-deployers",
];

export const HUMAN_OVERSIGHT_ITEMS = [
  "understand-capabilities",
  "automation-bias-awareness",
  "interpret-output",
  "override-decision",
  "interrupt-system",
  "technical-measures",
  "user-friendly",
  "context-appropriate",
];

export const ACCURACY_ITEMS = [
  "accuracy-specified",
  "metrics-defined",
  "performance-tested",
  "resilient-errors",
  "technical-solutions",
  "fallback-plan",
  "cybersecurity-resilience",
  "adversarial-protection",
];

export const QMS_ITEMS = [
  "qms-compliance-strategy",
  "examination-testing",
  "data-management",
  "post-market-monitoring",
  "documentation-records",
  "resource-management",
  "accountability-framework",
];
