'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Series } from '@/types';

interface SeriesCarouselProps {
  series: Series[];
}

const SeriesCarousel = ({ series }: SeriesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (series.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % series.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovering, series.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? series.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % series.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (series.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Séries d&apos;Articles
            </h2>
            <p className="text-muted-foreground">
              Explorez nos guides thématiques complets
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors shadow-sm"
              aria-label="Série précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors shadow-sm"
              aria-label="Série suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {series.map((item) => {
              // Image du premier article
              const firstPost = item.posts[0];
              const displayImage = firstPost?.image;
              const displayColor = item.color || 'from-primary to-secondary';

              return (
                <div 
                  key={item.id} 
                  className="w-full flex-shrink-0 px-1"
                >
                  <Link 
                    href={`/blog/series/${item.id}`}
                    className="group relative block aspect-[21/9] md:aspect-[21/7] rounded-2xl overflow-hidden border border-border shadow-xl"
                  >
                    {/* Background Image / Gradient */}
                    {displayImage ? (
                      <>
                        <Image
                          src={displayImage}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
                      </>
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${displayColor} opacity-90`} />
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase">
                            {item.category === 'techniques' ? 'Technique' : 
                             item.category === 'veille-techno' ? 'Veille' : 'Expérience'}
                          </span>
                          <span className="text-white/80 text-sm font-medium">
                            {item.totalPosts} articles {item.totalExpected ? `/ ${item.totalExpected}` : ''}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-primary-foreground transition-colors leading-tight">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-lg text-white/80 line-clamp-2 max-w-xl mb-6">
                            {item.description}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                          Commencer la série <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Points indicateurs mobile */}
          <div className="flex justify-center space-x-2 mt-6 sm:hidden">
            {series.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-6' : 'bg-border'
                }`}
                aria-label={`Aller à la série ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesCarousel;