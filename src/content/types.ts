export type SocialPlatform = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
}

export interface Role {
  title: string;
  /** ISO-like `YYYY-MM` strings keep sorting and formatting predictable. */
  start: string;
  end: string | 'present';
  location: string;
  summary?: string;
  highlights: string[];
  stack: string[];
}

export interface Company {
  name: string;
  roles: Role[];
}

export type ProjectKind = 'personal' | 'professional';

export interface ProjectLinks {
  /** Leave undefined until the URL is confirmed. Never guess. */
  github?: string;
  live?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  kind: ProjectKind;
  /** Shown on professional work to make ownership explicit. */
  context?: string;
  stack: string[];
  highlights: string[];
  links: ProjectLinks;
  visual: 'whiteboard' | 'pipeline' | 'review';
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}
