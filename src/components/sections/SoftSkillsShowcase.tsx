'use client';

import { motion } from 'framer-motion';
import { levelSkillsOrders, softSkills } from '@/data';
import { Users, MessageSquare, Target, Lightbulb } from 'lucide-react';

const SoftSkillsShowcase = () => {
  const categoryIcons = {
    'Leadership & Management': Users,
    'Communication & Collaboration': MessageSquare,
    'Méthodologie & Process': Target,
    'Adaptabilité & Innovation': Lightbulb
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Leadership & Management': 'from-rose-500 to-pink-600',
      'Communication & Collaboration': 'from-purple-500 to-indigo-600',
      'Méthodologie & Process': 'from-amber-500 to-orange-600',
      'Adaptabilité & Innovation': 'from-teal-500 to-cyan-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  const getLevelWidth = (level: string) => {
    const widths = {
      beginner: '25%',
      intermediate: '50%',
      advanced: '75%',
      expert: '100%'
    };
    return widths[level as keyof typeof widths] || '25%';
  };

  const groupedSkills = softSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof softSkills>);

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
            Compétences <span className="gradient-text">Humaines & Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Les qualités relationnelles et méthodologiques qui complètent mon expertise technique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl p-6 border border-border"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(category)}`}>
                  {(() => {
                    const Icon = categoryIcons[category as keyof typeof categoryIcons];
                    return Icon ? <Icon className="w-6 h-6 text-white" /> : null;
                  })()}
                </div>
                <h3 className="text-lg font-bold ml-3 leading-tight">{category}</h3>
              </div>
              
              <div className="space-y-4">
                {categorySkills.sort((a, b) => levelSkillsOrders[b.level] - levelSkillsOrders[a.level]).map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full rounded-full h-2 bg-gray-200 dark:bg-gray-700 relative">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: getLevelWidth(skill.level) }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkillsShowcase;