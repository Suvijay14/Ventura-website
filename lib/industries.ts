// lib/industries.ts

export interface Industry {
  id: string;
  name: string;
  annexReference: string;
  description: string;
  useCases: string[];
  riskLevel: 'prohibited' | 'high-risk' | 'limited-risk' | 'minimal-risk';
  specificRequirements: string[];
}

export const industries: Industry[] = [
  {
    id: 'employment',
    name: 'Employment & Human Resources',
    annexReference: 'Annex III, Point 4(a)',
    description: 'AI systems used for recruitment, performance evaluation, task allocation, and monitoring of persons in work-related contexts.',
    useCases: [
      'Automated CV screening and candidate ranking',
      'Interview analysis and scoring systems',
      'Performance evaluation algorithms',
      'Workforce monitoring and productivity tracking',
      'Promotion and termination decision support'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Bias detection in hiring algorithms',
      'Transparency in evaluation criteria',
      'Human oversight of final decisions',
      'Regular accuracy and fairness testing',
      'Documentation of selection methodology'
    ]
  },
  {
    id: 'financial',
    name: 'Financial Services',
    annexReference: 'Annex III, Point 5(b)',
    description: 'AI systems for credit scoring, creditworthiness assessment, and evaluation of eligibility for financial services.',
    useCases: [
      'Credit scoring and risk assessment',
      'Loan approval automation',
      'Insurance premium calculation',
      'Fraud detection systems',
      'Investment recommendation engines'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Protected characteristics exclusion',
      'Explainable credit decisions',
      'Fairness testing across demographics',
      'Human review for adverse decisions',
      'Comprehensive audit trails'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical Devices',
    annexReference: 'Annex III, Point 2(b)',
    description: 'AI systems intended for medical diagnosis, treatment recommendations, and health outcome prediction.',
    useCases: [
      'Medical imaging diagnosis assistance',
      'Treatment recommendation systems',
      'Patient risk stratification',
      'Drug interaction prediction',
      'Clinical decision support tools'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Clinical validation and testing',
      'Healthcare professional oversight',
      'Patient safety monitoring',
      'Adverse event reporting',
      'Medical device regulation compliance'
    ]
  },
  {
    id: 'biometric',
    name: 'Biometric Identification',
    annexReference: 'Annex III, Point 1; Article 5',
    description: 'Real-time and post remote biometric identification systems, including facial recognition.',
    useCases: [
      'Facial recognition systems',
      'Fingerprint authentication',
      'Iris scanning',
      'Voice identification',
      'Gait recognition'
    ],
    riskLevel: 'prohibited',
    specificRequirements: [
      'Real-time remote biometric identification generally prohibited',
      'Strict limitations on law enforcement use',
      'Fundamental rights impact assessment',
      'Data protection compliance (GDPR)',
      'Transparency and consent requirements'
    ]
  },
  {
    id: 'critical-infrastructure',
    name: 'Critical Infrastructure',
    annexReference: 'Annex III, Point 2(a)',
    description: 'AI systems used as safety components in critical infrastructure management including water, gas, electricity, and transportation.',
    useCases: [
      'Power grid optimization and control',
      'Water treatment monitoring',
      'Transportation network management',
      'Emergency response systems',
      'Infrastructure predictive maintenance'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Safety-critical system validation',
      'Redundancy and fail-safe mechanisms',
      'Continuous monitoring and logging',
      'Human oversight capabilities',
      'Emergency shutdown procedures'
    ]
  },
  {
    id: 'law-enforcement',
    name: 'Law Enforcement & Border Control',
    annexReference: 'Annex III, Point 6',
    description: 'AI systems for law enforcement, migration control, and justice administration.',
    useCases: [
      'Predictive policing algorithms',
      'Risk assessment for bail decisions',
      'Border crossing automation',
      'Lie detection systems',
      'Crime hotspot prediction'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Fundamental rights safeguards',
      'Judicial oversight mechanisms',
      'Bias and discrimination prevention',
      'Transparency in decision-making',
      'Independent external audits'
    ]
  },
  {
    id: 'education',
    name: 'Education & Vocational Training',
    annexReference: 'Annex III, Point 3',
    description: 'AI systems for student assessment, admission decisions, and educational outcome prediction.',
    useCases: [
      'Automated student assessment',
      'University admission scoring',
      'Learning path recommendations',
      'Exam proctoring systems',
      'Performance prediction models'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Fair and unbiased assessment',
      'Transparency in grading criteria',
      'Human educator oversight',
      'Equal opportunity safeguards',
      'Regular accuracy validation'
    ]
  },
  {
    id: 'social-services',
    name: 'Social Services & Benefits',
    annexReference: 'Annex III, Point 5(a)',
    description: 'AI systems for eligibility assessment for essential public services and benefits.',
    useCases: [
      'Social benefit eligibility assessment',
      'Public housing allocation',
      'Healthcare subsidy determination',
      'Emergency service prioritization',
      'Welfare fraud detection'
    ],
    riskLevel: 'high-risk',
    specificRequirements: [
      'Non-discrimination assurance',
      'Explainable eligibility decisions',
      'Human review processes',
      'Accessibility compliance',
      'Appeals mechanism implementation'
    ]
  }
];
