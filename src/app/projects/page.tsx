'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data';
import ProjectCard from '@/components/sections/ProjectCard';
import { Filter } from 'lucide-react';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'design' | 'other'>('all');
  
  const categories = [
    { id: 'all', label: 'Tous', count: projects.length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'design', label: 'Design', count: projects.filter(p => p.category === 'design').length },
    { id: 'other', label: 'Autre', count: projects.filter(p => p.category === 'other').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mes <span className="gradient-text">Projets</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez l'ensemble de mes réalisations, des applications web aux projets mobiles. 
              Chaque projet représente un défi technique et créatif unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Filtrer par catégorie</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.id as any)}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-sm opacity-70">
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 gradient-text">
                {projects.length}
              </div>
              <div className="text-muted-foreground">Projets totaux</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 gradient-text">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-muted-foreground">Projets vedettes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 gradient-text">
                {[...new Set(projects.flatMap(p => p.technologies))].length}
              </div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 gradient-text">
                {categories.length - 1}
              </div>
              <div className="text-muted-foreground">Catégories</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;