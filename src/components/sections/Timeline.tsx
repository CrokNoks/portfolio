'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

const TimelineItem = ({ experience, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-center mb-8 ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`w-full md:w-5/12 bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 ${
          index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
        }`}
      >
        <div className="flex items-center mb-2">
          <span className="text-sm text-muted-foreground flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {experience.period}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
        <p className="text-primary font-medium mb-3">{experience.company}</p>
        
        <p className="text-muted-foreground mb-4 whitespace-pre-line">{experience.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className="w-4 h-4 bg-primary rounded-full border-4 border-background"
        />
      </div>

      {/* Timeline line */}
      {index !== 0 && (
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-border ${
            index % 2 === 0 ? 'h-8 -top-8' : 'h-8 -top-8'
          }`}
        />
      )}
    </motion.div>
  );
};

interface TimelineProps {
  experiences: Experience[];
}

const Timeline = ({ experiences }: TimelineProps) => {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-border h-full top-0 hidden md:block" />
      
      {experiences.map((experience, index) => (
        <TimelineItem key={experience.id} experience={experience} index={index} />
      ))}
    </div>
  );
};

export default Timeline;