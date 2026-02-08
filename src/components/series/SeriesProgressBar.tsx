'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface SeriesProgressBarProps {
  posts: BlogPost[];
  currentSlug: string;
  seriesColor?: string;
  seriesTitle?: string;
}

export default function SeriesProgressBar({ 
  posts, 
  currentSlug, 
  seriesColor = 'from-gray-500 to-gray-700',
  seriesTitle 
}: SeriesProgressBarProps) {
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  const totalParts = posts.length;

  if (totalParts <= 1) return null;

  return (
    <div className="mb-8">
      {/* Progress text */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          {seriesTitle ? `Série : ${seriesTitle}` : 'Progression de la série'}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          Partie {currentIndex + 1}
          {posts[0]?.seriesTotalExpected ? `/${posts[0].seriesTotalExpected}` : `/${totalParts}`}
        </span>
      </div>

      {/* Progress bar with clickable dots */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
        
        {/* Progress line */}
        <motion.div
          className={`absolute top-1/2 left-0 h-0.5 bg-gradient-to-r ${seriesColor} -translate-y-1/2`}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / totalParts) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* Dots */}
        <div className="relative flex justify-between">
          {posts.map((post, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <motion.div
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                      isCurrent
                        ? `bg-gradient-to-r ${seriesColor} border-white scale-110`
                        : isCompleted
                        ? `bg-gradient-to-r ${seriesColor} border-white`
                        : 'bg-background border-border hover:border-primary'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className={`text-xs font-medium ${
                        isCurrent || isCompleted ? 'text-white' : 'text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current part title */}
      {currentIndex >= 0 && posts[currentIndex] && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Actuellement :{' '}
            <span className="font-medium text-foreground">
              {posts[currentIndex].title}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}