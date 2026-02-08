import { BlogPost } from '@/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SeriesNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
  seriesColor?: string;
}

export default function SeriesNavigation({ previous, next, seriesColor }: SeriesNavigationProps) {
  if (!previous && !next) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
      {/* Previous Article */}
      {previous && (
        <Link
          href={`/blog/${previous.slug}`}
          className={`flex-1 inline-flex items-center px-6 py-4 border border-border rounded-lg font-medium hover:bg-accent transition-colors group ${
            next ? 'sm:max-w-[45%]' : 'w-full'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground mb-1">
              Partie {previous.seriesPart} • Précédent
            </div>
            <div className="text-sm font-medium line-clamp-2">
              {previous.title}
            </div>
          </div>
        </Link>
      )}

      {/* Spacer for mobile when only one button */}
      {previous && next && (
        <div className="hidden sm:flex items-center justify-center">
          <div className="text-xs text-muted-foreground">•</div>
        </div>
      )}

      {/* Next Article */}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className={`flex-1 inline-flex items-center px-6 py-4 border border-border rounded-lg font-medium hover:bg-accent transition-colors group text-right ${
            previous ? 'sm:max-w-[45%]' : 'w-full'
          }`}
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">
              Partie {next.seriesPart} • Suivant
            </div>
            <div className="text-sm font-medium line-clamp-2">
              {next.title}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
        </Link>
      )}
    </div>
  );
}