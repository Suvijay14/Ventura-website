// lib/capabilities.ts

export interface Capability {
  id: string;
  article: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
}

export const capabilities: Capability[] = [
  {
    id: 'data-governance',
    article: 'Article 10(2)(f)',
    title: 'Data Governance & Bias Prevention',
    description: 'Automated identification of protected characteristics and bias patterns in training datasets. Ensures compliance with EU AI Act requirements for data quality and representativeness.',
    features: [
      'Protected characteristic identification in code and data',
      'Bias assessment in feature selection',
      'Data quality validation frameworks',
      'Dataset representativeness analysis',
      'Automated documentation of data governance practices'
    ]
  },
  {
    id: 'human-oversight',
    article: 'Article 14',
    title: 'Human Oversight Mechanisms',
    description: 'Validation of human oversight implementation including decision review requirements, override mechanisms, and explainability features.',
    features: [
      'Human-in-the-loop pattern detection',
      'Override mechanism validation',
      'Decision explainability implementation check',
      'Confidence threshold analysis',
      'Human oversight documentation verification'
    ]
  },
  {
    id: 'technical-documentation',
    article: 'Article 11, Annex IV',
    title: 'Technical Documentation',
    description: 'Comprehensive technical documentation generation covering system architecture, development methodology, and performance metrics.',
    features: [
      'Automated system architecture documentation',
      'Development methodology tracking',
      'Performance metrics extraction',
      'Known limitations identification',
      'Annex IV compliance verification'
    ]
  },
  {
    id: 'risk-management',
    article: 'Article 9',
    title: 'Risk Management',
    description: 'Continuous risk identification, assessment, and mitigation throughout the AI system lifecycle.',
    features: [
      'Automated risk identification in code',
      'Risk severity classification',
      'Mitigation measure validation',
      'Fundamental rights impact assessment',
      'Regular risk review tracking'
    ]
  },
  {
    id: 'logging-record-keeping',
    article: 'Article 12',
    title: 'Logging & Record-Keeping',
    description: 'Automated logging infrastructure validation ensuring traceability and audit trail requirements are met.',
    features: [
      'Automatic event logging verification',
      'Traceability requirement checks',
      'Tamper-protection validation',
      'Audit trail completeness analysis',
      'Log retention policy compliance'
    ]
  },
  {
    id: 'transparency',
    article: 'Article 13',
    title: 'Transparency & Disclosure',
    description: 'Ensures AI systems provide clear instructions, system characteristics, and performance level disclosures.',
    features: [
      'User instruction completeness check',
      'System capability disclosure validation',
      'Performance level documentation',
      'Limitation disclosure verification',
      'Transparency requirement tracking'
    ]
  },
  {
    id: 'accuracy-robustness',
    article: 'Article 15',
    title: 'Accuracy, Robustness & Cybersecurity',
    description: 'Technical validation of accuracy metrics, resilience testing, and security measures implementation.',
    features: [
      'Accuracy metric definition validation',
      'Resilience testing verification',
      'Error handling implementation check',
      'Cybersecurity measure assessment',
      'Robustness documentation compliance'
    ]
  },
  {
    id: 'quality-management',
    article: 'Article 17',
    title: 'Quality Management System',
    description: 'Overall quality management system compliance including testing procedures, post-market monitoring, and documentation standards.',
    features: [
      'Compliance strategy documentation',
      'Testing procedure validation',
      'Post-market monitoring setup check',
      'Change management process verification',
      'Quality documentation standards compliance'
    ]
  }
];
