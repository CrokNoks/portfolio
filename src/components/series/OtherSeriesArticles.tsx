import { BlogPost } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OtherSeriesArticlesProps {
  articles: BlogPost[];
  seriesTitle?: string;
  seriesColor?: string;
}

export default function OtherSeriesArticles({ 
  articles, 
  seriesTitle,
  seriesColor = 'from-gray-500 to-gray-700'
}: OtherSeriesArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Autres articles de cette série
          </h2>
          <p className="text-muted-foreground">
            Continuez votre exploration de {seriesTitle || 'cette série'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className="group relative bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Part Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${seriesColor} text-white rounded-full text-xs font-medium`}>
                    Partie {article.seriesPart}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Title */}
                <Link href={`/blog/${article.slug}`}>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: fr })}
                  </span>
                  <span>
                    {article.readTime} min
                  </span>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6">
                <Link
                  href={`/blog/${article.slug}`}
                  className={`inline-flex items-center text-sm font-medium text-primary hover:underline group-hover:translate-x-1 transition-transform`}
                >
                  Lire cet article
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Series Complete CTA */}
        <div className="text-center mt-12">
          <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${seriesColor} text-white rounded-full font-medium`}>
            <span>📚</span>
            <span className="ml-2">
              {articles.length + 1} article{articles.length + 1 > 1 ? 's' : ''} dans cette série
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}