import { Metadata } from 'next';
import { getAllSeries } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Séries - Blog Lucas GUERRIER',
  description: 'Découvrez toutes les séries d\'articles pour approfondir vos connaissances en développement web.',
};

export default function SeriesPage() {
  const series = getAllSeries();
  
  if (series.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Aucune série pour le moment</h1>
          <p className="text-muted-foreground mb-8">
            Revenez bientôt pour découvrir nos séries d&apos;articles !
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Séries d&apos;Articles
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Plongez dans nos séries thématiques pour maîtriser en profondeur les sujets qui vous passionnent.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>{series.length} série{series.length > 1 ? 's' : ''} disponible{series.length > 1 ? 's' : ''}</span>
            <span>•</span>
            <span>
              {series.reduce((total, s) => total + s.totalPosts, 0)} article{series.reduce((total, s) => total + s.totalPosts, 0) > 1 ? 's' : ''} au total
            </span>
          </div>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {series.map((serie) => (
              <article
                key={serie.id}
                className="group relative bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Series Header */}
                <div className={`h-32 bg-gradient-to-r ${serie.color || 'from-gray-500 to-gray-700'} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl mb-2">📚</div>
                      <div className="text-sm opacity-90">
                        {serie.totalPosts} partie{serie.totalPosts > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  {/* Completion Badge */}
                  {serie.isComplete && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                        ✅ Complète
                      </div>
                    </div>
                  )}
                </div>

                {/* Series Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {serie.title}
                  </h3>

                  {/* Description */}
                  {serie.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {serie.description}
                    </p>
                  )}

                  {/* Progress */}
                  {serie.totalExpected && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Progression</span>
                        <span>{serie.totalPosts}/{serie.totalExpected}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${serie.color || 'from-gray-500 to-gray-700'} rounded-full transition-all duration-500`}
                          style={{ width: `${(serie.totalPosts / serie.totalExpected) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                      {serie.category === 'techniques' ? 'Technique' : 
                       serie.category === 'veille-techno' ? 'Veille techno' : 'Expérience'}
                    </span>
                    {serie.totalExpected && !serie.isComplete && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        En cours
                      </span>
                    )}
                  </div>

                  {/* First Article Info */}
                  {serie.posts.length > 0 && (
                    <div className="border-t border-border pt-4 mt-4">
                      <div className="text-xs text-muted-foreground mb-2">
                        Premier article :
                      </div>
                      <div className="text-sm font-medium line-clamp-1">
                        {serie.posts[0].title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(serie.posts[0].publishedAt)}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Link
                      href={`/blog/${serie.posts[0]?.slug}`}
                      className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      style={{
                        background: serie.color ? 
                          `linear-gradient(to right, ${serie.color.replace('from-', '').replace(' to-', ', ')})` : 
                          'linear-gradient(to right, rgb(107 114 128), rgb(55 65 81))'
                      }}
                    >
                      {serie.isComplete ? 'Lire la série complète' : 'Commencer la série'}
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="text-center mt-16">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-border rounded-full font-medium hover:bg-accent transition-colors"
            >
              ← Voir tous les articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}