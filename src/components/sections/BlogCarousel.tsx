'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BlogPost } from '@/types';

import Image from 'next/image';

const BlogCarousel = ({ posts }: { posts: BlogPost[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Les articles sont déjà triés dans getLatestPosts
  const carouselArticles = posts;

  useEffect(() => {
    if (carouselArticles.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselArticles.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, carouselArticles.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselArticles.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselArticles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      techniques: 'from-blue-500 to-purple-500',
      'veille-techno': 'from-green-500 to-teal-500',
      experiences: 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  if (carouselArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Articles & <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes dernières publications techniques et expériences
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation flèches */}
          {carouselArticles.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors shadow-lg"
                aria-label="Article précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors shadow-lg"
                aria-label="Article suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Carrousel container */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentIndex * 100}%` }}
            >
              {carouselArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-background rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden max-w-md mx-auto">
                    {/* Image header */}
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
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
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.description}</p>
                      
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
                      
                      {/* Temps de lecture + lien */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {article.readTime} min de lecture
                        </span>
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          Lire plus →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Points indicateurs */}
          {carouselArticles.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {carouselArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Aller à l'article ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bouton vers tous les articles */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-border rounded-full font-semibold hover:bg-accent transition-colors"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;