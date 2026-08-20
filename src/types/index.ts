export type ViewMode3D = 'constellation' | 'neural' | 'globe' | 'matrix';

export interface BrandFoundationItem {
  number: string;
  title: string;
  statement: string;
  description: string;
  icon: string;
  color: string;
}

export interface ManifestoBelief {
  id: string;
  topic: string;
  subtitle: string;
  content: string;
  quote?: string;
  icon: string;
  accent: string;
}

export interface Chapter {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  story: string[];
  takeaway: string;
  tags: string[];
  icon: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProjectL3Stage {
  phaseNumber: string;
  title: string;
  desc: string;
}

export interface ProjectL3Belief {
  title: string;
  desc: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  type: string;
  status?: string;
  summary: string;
  details?: string[];
  excerpt?: string;
}

export interface RecognitionItem {
  id: string;
  level: string;
  badge: string;
  title: string;
  subtitle: string;
  story: string;
  icon: string;
}
