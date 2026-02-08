import { BlogPost } from '@/types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CreatePostOptions {
  title: string;
  category: 'techniques' | 'veille-techno' | 'experiences';
  description: string;
  tags: string[];
  featured?: boolean;
}

export function validateFrontmatter(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  
  // Validation titre
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Le titre est requis et ne peut pas être vide');
  } else if (typeof data.title === 'string' && data.title.length > 100) {
    errors.push('Le titre doit faire moins de 100 caractères');
  }
  
  // Validation description
  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.push('La description est requise et ne peut pas être vide');
  } else if (typeof data.description === 'string' && data.description.length > 200) {
    errors.push('La description doit faire moins de 200 caractères');
  }
  
  // Validation catégorie
  const validCategories = ['techniques', 'veille-techno', 'experiences'];
  if (!data.category || !validCategories.includes(String(data.category))) {
    errors.push('La catégorie doit être : techniques, veille-techno ou experiences');
  }
  
  // Validation tags
  if (!data.tags || !Array.isArray(data.tags)) {
    errors.push('Les tags sont requis et doivent être un tableau');
  } else if (data.tags.length > 5) {
    errors.push('Maximum 5 tags autorisés');
  } else if (data.tags.some((tag: unknown) => typeof tag !== 'string' || tag.length > 20)) {
    errors.push('Chaque tag doit faire moins de 20 caractères');
  }
  
  // Validation date
  if (!data.publishedAt) {
    errors.push('La date de publication est requise');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.publishedAt))) {
    errors.push('La date doit être au format YYYY-MM-DD');
  }
  
  // Validation auteur
  if (!data.author || typeof data.author !== 'string' || data.author.trim().length === 0) {
    errors.push('L\'auteur est requis');
  }
  
  // Validation image (optionnelle)
  if (data.image && typeof data.image === 'string') {
    if (!data.image.startsWith('/blog/')) {
      errors.push('L\'image doit commencer par /blog/');
    }
  }
  
  // Validation featured (optionnel)
  if (data.featured !== undefined && typeof data.featured !== 'boolean') {
    errors.push('Le champ featured doit être un booléen');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateAllPosts(posts: BlogPost[]): ValidationResult {
  const allErrors: string[] = [];
  
  posts.forEach((post, index) => {
    const result = validateFrontmatter(post as unknown as Record<string, unknown>);
    if (!result.valid) {
      allErrors.push(`Article ${index + 1}: ${result.errors.join(', ')}`);
    }
  });
  
  return {
    valid: allErrors.length === 0,
    errors: allErrors
  };
}

export function generateSlug(title: string, date: string): string {
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${date}-${normalizedTitle}`;
}

export function formatTitleForFile(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-');
}

export function getCategoryDirectory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'techniques': 'techniques',
    'veille-techno': 'veille-techno',
    'experiences': 'experiences'
  };
  
  return categoryMap[category] || 'techniques';
}