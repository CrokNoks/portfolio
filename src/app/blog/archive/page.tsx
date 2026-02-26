import { Metadata } from 'next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Archives du Blog - Lucas GUERRIER',
  description: 'Retrouvez tous les articles publiés sur le blog.',
};

export default function BlogArchivePage() {
  const articles = getAllPosts();
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      techniques: 'from-blue-500 to-purple-500',
      'veille-techno': 'from-green-500 to-teal-500',
      experiences: 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/blog" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Retour à l'accueil du blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">Toutes les <span className="gradient-text">Publications</span></h1>
          <p className="text-muted-foreground">Parcourez l'ensemble de mes articles techniques et retours d'expérience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block"
            >
              <div className="bg-background rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                {/* Image header */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(article.category)}`} />
                  )}
                </div>
                
                {/* Contenu */}
                <div className="p-6">
                  {/* Catégorie + Date */}
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs px-2 py-1 bg-gradient-to-r ${getCategoryColor(article.category)} text-white rounded-full font-medium`}>
                      {article.category === 'techniques' ? 'Technique' : 
                       article.category === 'veille-techno' ? 'Veille' : 'Expérience'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  
                  {/* Titre */}
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} min de lecture
                    </span>
                    <span className="text-xs text-primary">
                      Lire l'article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}