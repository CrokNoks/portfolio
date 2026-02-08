import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

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
        const { data } = matter(fileContents);
        const fileName = path.basename(filePath);
        const category = extractCategoryFromPath(filePath);
        const id = generateIdFromPath(filePath);
        
        return {
          ...data,
          id,
          slug: fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, ''),
          readTime: calculateReadTime(fileContents),
          category: category as 'techniques' | 'veille-techno' | 'experiences',
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
      const fileSlug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '');
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
    
    return {
      ...data,
      id,
      slug: slug,
      content,
      readTime: calculateReadTime(content),
      category: category as 'techniques' | 'veille-techno' | 'experiences',
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