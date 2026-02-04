'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { Github, ExternalLink } from 'lucide-react';
import MinidenticonImg from '../ui/MinidenticonImg';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
            <MinidenticonImg seed={project.id + project.title + project.description} width={128} height={128} />
          </div>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live</span>
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-sm text-muted-foreground">In progress</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;