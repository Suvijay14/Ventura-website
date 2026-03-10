// lib/videos.ts

export interface OfficialVideo {
  id: string;
  title: string;
  source: string;
  institution: 'European Parliament' | 'European Commission' | 'Council of the EU' | 'AI4GOV';
  youtubeId: string;
  description: string;
  publishDate: string;
  duration: string;
  authority: 1 | 2 | 3 | 4 | 5; // 5 = highest authority
  tags: string[];
  thumbnailUrl?: string;
}

export const officialVideos: OfficialVideo[] = [
  {
    id: 'ep-adoption-video',
    title: 'AI Act: MEPs on the EU Regulation',
    source: 'European Parliament',
    institution: 'European Parliament',
    youtubeId: '7PTqb0YxOCs',
    description: "AI Coffeebreak interviews leading MEPs on the EU's Artificial Intelligence Act. Watch legislators explain the significance of the world's first comprehensive AI regulation (523-46-49 vote).",
    publishDate: '2024-03-13',
    duration: '3:45',
    authority: 5,
    tags: ['Official', 'Historic', 'Voting', 'Adoption', 'Parliament']
  },
  {
    id: 'ec-explainer',
    title: "The EU's AI Act Explained - European Commission",
    source: 'European Commission',
    institution: 'European Commission',
    youtubeId: 's_rxOnCt3HQ',
    description: 'Official European Commission explainer video breaking down the key provisions of the AI Act, including the risk-based approach, prohibited practices, high-risk requirements, and implementation timeline. Essential viewing for understanding how the regulation works in practice.',
    publishDate: '2024-08-01',
    duration: '5:20',
    authority: 5,
    tags: ['Official', 'Explainer', 'Education', 'Overview', 'Commission']
  },
  {
    id: 'council-approval',
    title: 'AI Act: Making AI Safe',
    source: 'Council of the European Union',
    institution: 'Council of the EU',
    youtubeId: 'wM3wrB-82oY',
    description: "European Commission video on the AI Act's key safeguards—bans on dangerous AI, strict rules for high-risk systems, and support for innovation.",
    publishDate: '2024-05-21',
    duration: '5:15',
    authority: 5,
    tags: ['Official', 'Approval', 'Council', 'Final Step', 'Legislative Process']
  },
  {
    id: 'ai4gov-introduction',
    title: 'The First Law on AI Regulation',
    source: 'AI4GOV (EU-funded project)',
    institution: 'AI4GOV',
    youtubeId: 'JOKXONV7LuA',
    description: "Accessible introduction to the AI Act explaining practical implications for governments, businesses, and citizens in straightforward language.",
    publishDate: '2024-08-15',
    duration: '12:30',
    authority: 4,
    tags: ['Education', 'Introduction', 'Context', 'EU-funded', 'Comprehensive']
  }
];

// Helper functions
export function getVideosByInstitution(institution: OfficialVideo['institution']): OfficialVideo[] {
  return officialVideos.filter(video => video.institution === institution);
}

export function getVideosByAuthority(minAuthority: number = 4): OfficialVideo[] {
  return officialVideos.filter(video => video.authority >= minAuthority);
}

export function getFeaturedVideos(): OfficialVideo[] {
  // Return top 3 videos by authority
  return officialVideos
    .sort((a, b) => b.authority - a.authority)
    .slice(0, 3);
}
