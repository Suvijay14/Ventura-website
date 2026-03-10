// lib/articles.ts

export interface OfficialArticle {
  id: string;
  title: string;
  source: string;
  sourceType: 'official-regulation' | 'government-announcement' | 'press-release' | 'summary' | 'guidance';
  url: string;
  publishDate: string;
  description: string;
  screenshot?: string;
  authority: 1 | 2 | 3 | 4 | 5; // 5 = highest authority
  tags: string[];
  institution: 'European Parliament' | 'European Commission' | 'Council of the EU' | 'EUR-Lex';
}

export const officialArticles: OfficialArticle[] = [
  {
    id: 'eurlex-regulation',
    title: 'Regulation (EU) 2024/1689 - Official EU AI Act',
    source: 'EUR-Lex',
    sourceType: 'official-regulation',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
    publishDate: '2024-07-12',
    description: 'The complete official text of the EU AI Act as published in the Official Journal of the European Union. This is the definitive legal source covering all 113 articles and 13 annexes.',
    screenshot: '/screenshots/eurlex-regulation.png',
    authority: 5,
    tags: ['Official', 'Complete Text', 'Legal Source', 'EUR-Lex'],
    institution: 'EUR-Lex'
  },
  {
    id: 'ec-entry-into-force',
    title: 'AI Act Enters into Force - Official Announcement',
    source: 'European Commission',
    sourceType: 'government-announcement',
    url: 'https://commission.europa.eu/news/ai-act-enters-force-2024-08-01_en',
    publishDate: '2024-08-01',
    description: 'European Commission official announcement of the AI Act entering into force on August 1, 2024. Includes implementation timeline and key deadlines for compliance.',
    screenshot: '/screenshots/ec-entry-force.png',
    authority: 5,
    tags: ['Official', 'Timeline', 'Implementation', 'Deadlines'],
    institution: 'European Commission'
  },
  {
    id: 'ep-adoption',
    title: 'Parliament Adopts AI Act - Press Release',
    source: 'European Parliament',
    sourceType: 'press-release',
    url: 'https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015',
    publishDate: '2024-03-13',
    description: 'European Parliament press release announcing the historic adoption of the AI Act with 523 votes in favor, 46 against, and 49 abstentions.',
    screenshot: '/screenshots/ep-adoption.png',
    authority: 5,
    tags: ['Official', 'Adoption', 'Historic', 'Voting Results'],
    institution: 'European Parliament'
  },
  {
    id: 'eurlex-summary',
    title: 'Rules for Trustworthy AI in the EU - Official Summary',
    source: 'EUR-Lex',
    sourceType: 'summary',
    url: 'https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence-in-the-eu.html',
    publishDate: '2024-07-12',
    description: 'EUR-Lex official summary providing an accessible overview of the AI Act, including key provisions, risk categories, and compliance requirements.',
    screenshot: '/screenshots/eurlex-summary.png',
    authority: 5,
    tags: ['Official', 'Summary', 'Overview', 'Accessible'],
    institution: 'EUR-Lex'
  },
  {
    id: 'ec-guidelines',
    title: 'European Commission Implementation Guidelines',
    source: 'European Commission',
    sourceType: 'guidance',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    publishDate: '2024-08-01',
    description: 'Official European Commission guidelines for implementing the AI Act, including practical guidance for providers, deployers, and regulatory authorities.',
    screenshot: '/screenshots/ec-guidelines.png',
    authority: 5,
    tags: ['Official', 'Guidelines', 'Implementation', 'Practical'],
    institution: 'European Commission'
  },
  {
    id: 'ai-office-resources',
    title: 'European AI Office - Resources & Support',
    source: 'European Commission - AI Office',
    sourceType: 'guidance',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
    publishDate: '2024-08-01',
    description: 'The European AI Office provides ongoing support, resources, and updates on AI Act implementation, including FAQs, toolkits, and sector-specific guidance.',
    screenshot: '/screenshots/ai-office-resources.png',
    authority: 5,
    tags: ['Official', 'Resources', 'Support', 'FAQs'],
    institution: 'European Commission'
  }
];

// Helper functions
export function getArticlesByAuthority(minAuthority: number = 4): OfficialArticle[] {
  return officialArticles.filter(article => article.authority >= minAuthority);
}

export function getArticlesByInstitution(institution: OfficialArticle['institution']): OfficialArticle[] {
  return officialArticles.filter(article => article.institution === institution);
}

export function getArticlesByType(sourceType: OfficialArticle['sourceType']): OfficialArticle[] {
  return officialArticles.filter(article => article.sourceType === sourceType);
}
