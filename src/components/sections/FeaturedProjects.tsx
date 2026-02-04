'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data';
import ProjectCard from '@/components/sections/ProjectCard';

const FeaturedProjects = () => {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="featured-projects" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projets <span className="gradient-text">Récents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-unes de mes réalisations récentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors"
          >
            Voir tous les projets
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;