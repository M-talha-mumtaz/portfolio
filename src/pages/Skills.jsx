import { portfolioData } from '../data/portfolioData';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';

const Skills = () => {
  const { skillCategories } = portfolioData;

  const getIconComponent = (iconName) => {
    return SiIcons[iconName] || DiIcons[iconName];
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-20 pb-32 relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-widest neon-text">
              Tech Arsenal
            </h1>
            <p className="text-xl text-gray-400">
              The tools, languages, and frameworks I use to build elite digital experiences.
            </p>
          </div>

          <div className="space-y-16">
            {skillCategories.map((category, idx) => (
              <div key={category.title}>
                <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-primary/50 block"></span>
                  {category.title}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, i) => {
                    const IconComponent = getIconComponent(skill.icon);
                    return (
                      <motion.div 
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all duration-300 group cursor-default"
                        style={{ '--hover-color': skill.color }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}40, inset 0 0 10px ${skill.color}20`;
                          e.currentTarget.style.borderColor = `${skill.color}80`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '';
                          e.currentTarget.style.borderColor = '';
                        }}
                      >
                        <div className="w-16 h-16 rounded-full bg-dark-surface border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          {IconComponent && <IconComponent size={32} style={{ color: skill.color }} className="drop-shadow-lg" />}
                        </div>
                        <span className="text-white font-bold tracking-wider text-center">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;
