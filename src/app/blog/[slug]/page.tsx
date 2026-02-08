import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getSeriesNavigation, getOtherSeriesArticles, getSeriesPosts } from '@/lib/blog';
import { validateFrontmatter } from '@/lib/blog/validation';
import CodeBlock from '@/components/mdx/CodeBlock';
import Callout from '@/components/mdx/Callout';
import TechStack from '@/components/mdx/TechStack';
import SeriesInfo from '@/components/series/SeriesInfo';
import SeriesNavigation from '@/components/series/SeriesNavigation';
import OtherSeriesArticles from '@/components/series/OtherSeriesArticles';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Configuration MDX complète avec tous les plugins nécessaires
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
      description: 'L\'article demandé n\'existe pas.',
    };
  }

  return {
    title: `${post.title} - Blog Lucas GUERRIER`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            L&apos;article que vous cherchez n&apos;existe pas.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Valider le frontmatter
  const validation = validateFrontmatter(post as unknown as Record<string, unknown>);
  if (!validation.valid) {
    console.error('Invalid frontmatter:', validation.errors);
  }

  // Récupérer les données de série si applicable
  const isSeriesArticle = post.isSeriesArticle;
  const seriesPosts = isSeriesArticle && post.series ? getSeriesPosts(post.series) : [];
  const seriesNavigation = isSeriesArticle ? getSeriesNavigation(slug) : { previous: null, next: null };
  const otherSeriesArticles = isSeriesArticle ? getOtherSeriesArticles(slug) : [];

  // Sérialiser le contenu MDX
  // Le contenu MDX brut est passé directement à MDXRemote dans RSC
  const mdxContent = post.content || "";

  return (
    <div className="min-h-screen">
      {/* Hero Article */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {post.category === 'techniques' ? 'Article technique' : 
                 post.category === 'veille-techno' ? 'Veille technologique' : 'Expérience'}
              </span>
              {isSeriesArticle && (
                <span className="ml-2 text-sm px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium">
                  📚 Série
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>Par {post.author}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{post.readTime} min de lecture</span>
              {isSeriesArticle && post.seriesPart && (
                <>
                  <span>•</span>
                  <span>Partie {post.seriesPart}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Series Info - Only for series articles */}
      {isSeriesArticle && seriesPosts.length > 0 && (
        <SeriesInfo post={post} seriesPosts={seriesPosts} />
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-enhanced max-w-none">
            {mdxContent && (
              <div className="bg-background rounded-xl border border-border p-8">
                <MDXRemote 
                  source={mdxContent}
                  options={mdxOptions}
                  components={{
                    pre: CodeBlock,
                    Callout,
                    TechStack,
                  }}
                />
              </div>
            )}
          </div>
          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            {/* Series Navigation */}
            {isSeriesArticle && (seriesNavigation.previous || seriesNavigation.next) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Navigation dans la série
                </h3>
                <SeriesNavigation 
                  previous={seriesNavigation.previous} 
                  next={seriesNavigation.next}
                  seriesColor={post.seriesColor}
                />
              </div>
            )}

            {/* Blog Navigation */}
            <div className="flex justify-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center px-6 py-3 border border-border rounded-full font-medium hover:bg-accent transition-colors"
              >
                ← Retour au blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Series Articles */}
      {isSeriesArticle && otherSeriesArticles.length > 0 && (
        <OtherSeriesArticles 
          articles={otherSeriesArticles}
          seriesTitle={post.seriesTitle}
          seriesColor={post.seriesColor}
        />
      )}
    </div>
  );
}