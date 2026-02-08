import { Metadata } from 'next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - Lucas GUERRIER',
  description: 'Découvrez mes articles sur le développement web, React, Next.js et mes expériences professionnelles.',
};

export default function BlogPage() {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partage d&apos;expériences, tutoriels techniques et veille technologique. 
              Découvrez mes réflexions sur le développement web, l&apos;architecture logicielle et les meilleures pratiques.
            </p>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {article.readTime} min de lecture
                      </span>
                      <span className="text-xs text-primary group-hover:underline">
                        Lire l'article →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}