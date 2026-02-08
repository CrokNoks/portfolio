import { BlogPost } from '@/types';
import SeriesProgressBar from './SeriesProgressBar';
import Link from 'next/link';

interface SeriesInfoProps {
  post: BlogPost;
  seriesPosts: BlogPost[];
}

export default function SeriesInfo({ post, seriesPosts }: SeriesInfoProps) {
  if (!post.series || !post.seriesTitle) return null;

  return (
    <section className="py-8 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Series Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${post.seriesColor || 'from-gray-500 to-gray-700'} text-white rounded-full text-sm font-medium`}>
            <span className="mr-2">📚</span>
            <span>Série : {post.seriesTitle}</span>
            <span className="ml-2 opacity-75">
              • {seriesPosts.length} partie{seriesPosts.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Series Description */}
        {seriesPosts[0]?.seriesTotalExpected && (
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              {seriesPosts.length === seriesPosts[0].seriesTotalExpected 
                ? "Série complète" 
                : `${seriesPosts.length}/${seriesPosts[0].seriesTotalExpected} parties publiées`
              }
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <SeriesProgressBar
          posts={seriesPosts}
          currentSlug={post.slug}
          seriesColor={post.seriesColor}
          seriesTitle={post.seriesTitle}
        />
      </div>
    </section>
  );
}