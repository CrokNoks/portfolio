import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, SeriesMetadata, Series } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

function extractCategoryFromPath(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  const parts = relativePath.split(path.sep);
  return parts[0] || 'techniques'; // Premier sous-répertoire = catégorie
}

// Fonctions pour les séries
function isSeriesArticle(filePath: string): boolean {
  const relativePath = path.relative(postsDirectory, filePath);
  const parts = relativePath.split(path.sep);
  return parts.length >= 3; // category/series/fichier.mdx
}

function extractSeriesFromPath(filePath: string): string | null {
  if (!isSeriesArticle(filePath)) return null;
  const relativePath = path.relative(postsDirectory, filePath);
  const parts = relativePath.split(path.sep);
  return parts[1]; // category/SERIES_ID/fichier.mdx
}

function extractPartFromFileName(fileName: string): number {
  const match = fileName.match(/^(\d+)-/);
  return match ? parseInt(match[1]) : 0;
}

function getSeriesMetadata(seriesPath: string): SeriesMetadata | null {
  const seriesFile = path.join(seriesPath, 'SERIES.md');
  if (fs.existsSync(seriesFile)) {
    const content = fs.readFileSync(seriesFile, 'utf8');
    const { data } = matter(content);
    
    // Valider que le titre est présent
    if (!data.title) {
      console.warn(`Series metadata missing title in ${seriesPath}`);
      return null;
    }
    
    return data as SeriesMetadata;
  }
  return null;
}

function generateIdFromPath(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  return relativePath.replace(/\//g, '-').replace(/\.mdx$/, '');
}

export function getAllPosts(): BlogPost[] {
  try {
    const allFiles = getAllMdxFiles(postsDirectory);
    
    const allPostsData = allFiles
      .map(filePath => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const fileName = path.basename(filePath);
        const category = extractCategoryFromPath(filePath);
        const id = generateIdFromPath(filePath);
        
        // Déterminer si c'est un article de série
        const isSeries = isSeriesArticle(filePath);
        const seriesId = isSeries ? extractSeriesFromPath(filePath) : null;
        const seriesPart = isSeries ? extractPartFromFileName(fileName) : undefined;
        
        // Obtenir les métadonnées de série si applicable
        let seriesMetadata: SeriesMetadata | null = null;
        if (seriesId) {
          const seriesPath = path.join(postsDirectory, category, seriesId);
          seriesMetadata = getSeriesMetadata(seriesPath);
        }
        
        // Générer le slug correct
        let slug: string;
        if (isSeries) {
          // Pour les articles de série, utiliser le nom sans la numérotation
          slug = fileName.replace(/^\d+-/, '').replace(/\.mdx$/, '');
        } else {
          // Pour les articles autonomes, garder le format actuel
          slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '');
        }
        
        return {
          ...data,
          id,
          slug,
          readTime: calculateReadTime(fileContents),
          category: category as 'techniques' | 'veille-techno' | 'experiences',
          // Champs de série
          series: seriesId || undefined,
          seriesTitle: seriesMetadata?.title,
          seriesPart,
          seriesColor: seriesMetadata?.color,
          seriesTotalExpected: seriesMetadata?.totalExpected,
          isSeriesArticle: isSeries,
        } as BlogPost;
      })
      .filter(post => post.publishedAt && post.title && post.category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return allPostsData;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const allFiles = getAllMdxFiles(postsDirectory);
    const targetFile = allFiles.find(filePath => {
      const fileName = path.basename(filePath);
      const isSeries = isSeriesArticle(filePath);
      
      let fileSlug: string;
      if (isSeries) {
        fileSlug = fileName.replace(/^\d+-/, '').replace(/\.mdx$/, '');
      } else {
        fileSlug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '');
      }
      
      return fileSlug === slug || fileName.endsWith(`${slug}.mdx`);
    });
    
    if (!targetFile) {
      return null;
    }
    
    const fileContents = fs.readFileSync(targetFile, 'utf8');
    const { data, content } = matter(fileContents);
    const fileName = path.basename(targetFile);
    const category = extractCategoryFromPath(targetFile);
    const id = generateIdFromPath(targetFile);
    
    // Déterminer si c'est un article de série
    const isSeries = isSeriesArticle(targetFile);
    const seriesId = isSeries ? extractSeriesFromPath(targetFile) : null;
    const seriesPart = isSeries ? extractPartFromFileName(fileName) : undefined;
    
    // Obtenir les métadonnées de série si applicable
    let seriesMetadata: SeriesMetadata | null = null;
    if (seriesId) {
      const seriesPath = path.join(postsDirectory, category, seriesId);
      seriesMetadata = getSeriesMetadata(seriesPath);
    }
    
    return {
      ...data,
      id,
      slug: slug,
      content,
      readTime: calculateReadTime(content),
      category: category as 'techniques' | 'veille-techno' | 'experiences',
      // Champs de série
      series: seriesId || undefined,
      seriesTitle: seriesMetadata?.title,
      seriesPart,
      seriesColor: seriesMetadata?.color,
      seriesTotalExpected: seriesMetadata?.totalExpected,
      isSeriesArticle: isSeries,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function generateStaticParams(): { slug: string }[] {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured);
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, count);
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 250;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return Array.from(new Set(categories));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.tags || []);
  return Array.from(new Set(allTags));
}

// Fonctions pour la gestion des séries
export function getSeriesPosts(seriesId: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => post.series === seriesId)
    .sort((a, b) => (a.seriesPart || 0) - (b.seriesPart || 0));
}

export function getSeriesNavigation(slug: string): { previous: BlogPost | null, next: BlogPost | null } {
  const post = getPostBySlug(slug);
  if (!post || !post.series) {
    return { previous: null, next: null };
  }
  
  const seriesPosts = getSeriesPosts(post.series);
  const currentIndex = seriesPosts.findIndex(p => p.slug === slug);
  
  return {
    previous: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
  };
}

export function getOtherSeriesArticles(slug: string): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post || !post.series) {
    return [];
  }
  
  return getSeriesPosts(post.series).filter(p => p.slug !== slug);
}

export function getAllSeries(): Series[] {
  const allPosts = getAllPosts();
  const seriesMap = new Map<string, BlogPost[]>();
  
  // Grouper les articles par série
  allPosts.forEach(post => {
    if (post.series) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, []);
      }
      seriesMap.get(post.series)!.push(post);
    }
  });
  
  // Construire les objets Series
  const series: Series[] = [];
  seriesMap.forEach((posts, seriesId) => {
    if (posts.length > 0) {
      const firstPost = posts[0];
      series.push({
        id: seriesId,
        title: firstPost.seriesTitle || seriesId,
        description: firstPost.seriesTitle ? `Série : ${firstPost.seriesTitle}` : undefined,
        color: firstPost.seriesColor,
        posts: posts,
        totalPosts: posts.length,
        totalExpected: firstPost.seriesTotalExpected,
        isComplete: firstPost.seriesTotalExpected ? posts.length === firstPost.seriesTotalExpected : false,
        category: firstPost.category,
      });
    }
  });
  
  return series;
}

export function getSeriesById(seriesId: string): Series | null {
  const allSeries = getAllSeries();
  return allSeries.find(series => series.id === seriesId) || null;
}

export function getSeriesPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category && post.isSeriesArticle);
}