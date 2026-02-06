'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { hobbies } from '@/data';

const HobbiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (hobbies.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hobbies.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (hobbies.length === 0) {
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
            Passions & <span className="gradient-text">Hobbies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un aperçu des activités qui nourrissent ma créativité et mon équilibre
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation flèches */}
          {hobbies.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors shadow-lg"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors shadow-lg"
                aria-label="Suivant"
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
              {hobbies.map((hobby) => (
                <div 
                  key={hobby.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 max-w-md mx-auto">
                    {/* Header avec icône et titre */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <hobby.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{hobby.label}</h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {hobby.description}
                    </p>
                    
                    {/* Skills - conditionnel */}
                    {hobby.skills && hobby.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {hobby.skills.slice(0, 4).map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Points indicateurs */}
          {hobbies.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {hobbies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-(--primary) w-8 border-1 border-primary' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:cursor-pointer'
                  }`}
                  aria-label={`Aller au hobby ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HobbiesCarousel;