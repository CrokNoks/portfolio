import { Metadata } from 'next';
import { getSeriesById } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const series = getSeriesById(resolvedParams.id);
  
  if (!series) {
    return {
      title: 'Série non trouvée',
    };
  }

  return {
    title: `${series.title} - Série d'articles`,
    description: series.description,
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const series = getSeriesById(resolvedParams.id);

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Série non trouvée</h1>
          <Link href="/blog" className="text-primary hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className={`py-20 bg-gradient-to-br ${series.color || 'from-gray-500 to-gray-700'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-white/80 hover:text-white mb-8 inline-block text-sm">
            ← Retour au blog
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{series.title}</h1>
            {series.description && (
              <p className="text-xl text-white/90 leading-relaxed mb-8">{series.description}</p>
            )}
            <div className="flex items-center gap-6 text-sm font-medium">
              <span className="px-3 py-1 bg-white/20 rounded-full">
                {series.totalPosts} Articles
              </span>
              {series.totalExpected && (
                <span className="px-3 py-1 bg-white/20 rounded-full">
                  {series.isComplete ? 'Série complète' : `Progression: ${series.totalPosts}/${series.totalExpected}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {series.posts.map((post, index) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row gap-8 bg-background border border-border p-6 rounded-2xl hover:shadow-xl transition-all"
              >
                <div className="w-full md:w-64 h-40 relative flex-shrink-0 rounded-xl overflow-hidden">
                  {post.image ? (
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{post.readTime} min de lecture</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">{post.description}</p>
                  <span className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                    Lire l'article <span className="text-lg">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}