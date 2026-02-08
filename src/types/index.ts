export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'design' | 'other' | 'SDK';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  skillType: 'technical' | 'soft';
}

import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Hobby {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  skills?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'techniques' | 'veille-techno' | 'experiences';
  tags: string[];
  publishedAt: string;
  readTime?: number;
  featured: boolean;
  author: string;
  image: string;
  content?: string;
  // Champs pour les séries
  series?: string;           // ID de la série (extrait du chemin)
  seriesTitle?: string;      // Titre de la série (de SERIES.md)
  seriesPart?: number;       // Position dans la série (du nom de fichier)
  seriesColor?: string;      // Couleur de la série (de SERIES.md)
  seriesTotalExpected?: number; // Total attendu (de SERIES.md)
  isSeriesArticle?: boolean;  // Flag pour différencier les articles de série
}

export interface SeriesMetadata {
  title: string;
  description?: string;
  color?: string;
  totalExpected?: number;
}

export interface Series {
  id: string;
  title: string;
  description?: string;
  color?: string;
  posts: BlogPost[];
  totalPosts: number;
  totalExpected?: number;
  isComplete: boolean;
  category: string;
}