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
}