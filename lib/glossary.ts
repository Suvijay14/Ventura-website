export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Legal" | "Technical" | "Business";
  relatedArticles: string[];
  euArticle?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "High-Risk AI System",
    definition:
      "AI systems classified under Annex III of the EU AI Act that pose significant risks to health, safety, or fundamental rights. Examples include recruitment AI, credit scoring systems, and biometric identification.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 6",
  },
  {
    term: "Provider",
    definition:
      "Natural or legal person, public authority, agency or other body that develops an AI system or has an AI system developed and places it on the market or puts it into service under its own name or trademark.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 3(3)",
  },
  {
    term: "Deployer",
    definition:
      "A natural or legal person, public authority, agency or other body using an AI system under its authority, except where the AI system is used in the course of a personal, non-professional activity.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 3(4)",
  },
  {
    term: "Annex III",
    definition:
      "The annex listing AI systems that are considered high-risk. Covers areas such as biometric identification, critical infrastructure, education, employment, access to essential services, law enforcement, and migration management.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Annex III",
  },
  {
    term: "Conformity Assessment",
    definition:
      "The process of demonstrating that an AI system complies with the requirements of the EU AI Act. Can be based on internal control (for certain systems) or involve notified bodies.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 43",
  },
  {
    term: "Post-Market Monitoring",
    definition:
      "Activities carried out by providers to collect and analyze data on the performance of AI systems placed on the market, to identify risks and ensure continuous compliance.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 72",
  },
  {
    term: "Prohibited AI Practices",
    definition:
      "AI practices that are banned under the EU AI Act, including subliminal techniques, exploitation of vulnerabilities, social scoring, and real-time biometric identification in publicly accessible spaces (with limited exceptions).",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 5",
  },
  {
    term: "General Purpose AI (GPAI)",
    definition:
      "AI systems that can be used for a wide range of tasks. GPAI models with systemic risk face additional obligations including model evaluation, adversarial testing, and incident reporting.",
    category: "Technical",
    relatedArticles: ["/insights"],
    euArticle: "Article 52",
  },
  {
    term: "Risk Management System",
    definition:
      "A continuous iterative process run by providers to identify and mitigate risks of high-risk AI systems throughout their lifecycle.",
    category: "Technical",
    relatedArticles: ["/insights"],
    euArticle: "Article 9",
  },
  {
    term: "Human Oversight",
    definition:
      "Measures that enable human operators to understand AI system capabilities, interpret outputs, and intervene or override decisions. Required for high-risk AI systems.",
    category: "Technical",
    relatedArticles: ["/insights"],
    euArticle: "Article 14",
  },
  {
    term: "Transparency Obligations",
    definition:
      "Requirements for AI systems to inform users when they are interacting with an AI, including for chatbots and deepfakes. Ensures users can make informed decisions.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 50",
  },
  {
    term: "Technical Documentation",
    definition:
      "Documentation that providers must draw up for high-risk AI systems, demonstrating compliance with the regulation. Must be kept up to date and made available to authorities.",
    category: "Technical",
    relatedArticles: ["/insights"],
    euArticle: "Article 11",
  },
  {
    term: "CE Marking",
    definition:
      "The conformity marking indicating that an AI system meets EU requirements. High-risk AI systems must bear CE marking before being placed on the market.",
    category: "Business",
    relatedArticles: ["/insights"],
    euArticle: "Article 49",
  },
  {
    term: "Notified Body",
    definition:
      "An independent organization designated by a Member State to assess conformity of high-risk AI systems. Required for certain categories under Annex III.",
    category: "Legal",
    relatedArticles: ["/insights"],
    euArticle: "Article 43",
  },
  {
    term: "Accuracy",
    definition:
      "For high-risk AI systems, accuracy must be appropriate to the intended purpose. Providers must design systems to achieve accuracy levels that minimize risks.",
    category: "Technical",
    relatedArticles: ["/insights"],
    euArticle: "Article 15",
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const byLetter: Record<string, GlossaryTerm[]> = {};
  ALPHABET.forEach((letter) => {
    byLetter[letter] = glossary.filter(
      (t) => t.term.toUpperCase().startsWith(letter)
    );
  });
  return byLetter;
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return glossary;
  return glossary.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
