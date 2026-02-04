'use client';

import { motion } from 'framer-motion';
import { experiences, introduction, values } from '@/data';
import Timeline from '@/components/sections/Timeline';
import { aboutStats } from '@/data';

const AboutPage = () => {
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
              À <span className="gradient-text">Propos</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {introduction}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Mon <span className="gradient-text">Parcours</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ma passion pour le développement web a commencé il y a plus de 20 ans, 
                  lorsque j'ai découvert la puissance de PHP et sa capacité à créer 
                  des expériences utilisateur exceptionnelles.
                </p>
                <p>
                  Au fil des années, j'ai travaillé sur des projets variés allant de startups 
                  innovantes à grandes entreprises, ce qui m'a permis de développer une 
                  expertise solide dans différentes technologies et méthodologies.
                </p>
                <p>
                  Aujourd'hui, je me spécialise dans l'écosystème JavaScript moderne, 
                  avec un focus particulier sur React, Next.js et TypeScript, tout en 
                  gardant une veille constante sur les dernières tendances du web.
                </p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/20">
                  DEV
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
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
              Mon <span className="gradient-text">Expérience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un parcours professionnel riche et varié dans le développement web
            </p>
          </motion.div>
          
          <Timeline experiences={experiences} />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mes <span className="gradient-text">Valeurs</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 border border-border"
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;