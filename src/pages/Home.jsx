import { portfolioData } from '../data/portfolioData';
import { ArrowRight, Globe, Smartphone, Database, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import pfpImage from '../assets/pfp.png';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';

const Home = () => {
  const { profile, roles, skillCategories } = portfolioData;
  const allSkills = skillCategories.flatMap(cat => cat.skills);

  const getIconComponent = (iconName) => {
    return SiIcons[iconName] || DiIcons[iconName];
  };

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Globe': return <Globe size={28} className="text-primary" />;
      case 'Smartphone': return <Smartphone size={28} className="text-primary" />;
      case 'Database': return <Database size={28} className="text-primary" />;
      default: return <Globe size={28} className="text-primary" />;
    }
  };

  return (
    <PageTransition>
      <div className="pb-32">
        <section className="flex items-center pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel text-primary rounded-full text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {profile.availability}
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {profile.name}
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-xl">
                I'm a <span className="text-primary font-bold neon-text">{profile.title}</span> specializing in building modern, scalable web applications.
              </p>
              

              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link 
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 text-primary border border-primary/50 font-semibold rounded-xl hover:bg-primary/20 hover:neon-border transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Work <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 glass-panel text-white font-semibold rounded-xl hover:border-secondary/50 hover:text-secondary hover:neon-border-purple transition-all duration-300"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] glass-panel bg-black/40 rounded-[3rem] overflow-hidden flex items-end justify-center border border-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-dark/80 to-transparent z-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,240,255,0.1)] z-20 pointer-events-none group-hover:shadow-[inset_0_0_25px_rgba(0,240,255,0.15)] transition-shadow"></div>
                
                <img 
                  src={pfpImage} 
                  alt={profile.name} 
                  className="w-[90%] h-[95%] object-contain object-bottom relative z-10 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_-5px_15px_rgba(0,240,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]" 
                />
              </motion.div>
            </motion.div>
            
          </div>
        </section>

        <section className="py-16 relative border-t border-white/5 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-12 lg:p-16 rounded-[3rem] border border-primary/20 text-center relative overflow-hidden group hover:neon-border transition-all duration-500 shadow-2xl shadow-primary/5"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 leading-relaxed italic">
                "I build modern web applications using <span className="text-white font-bold">MongoDB, Express, React, and Node.js</span>. 
                Passionate about <span className="text-primary neon-text font-bold">clean code</span>, <span className="text-secondary font-bold">elegant UI</span>, and seamless user experiences."
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10 mb-12">
             <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest text-center uppercase neon-text">
              Technologies
            </h2>
          </div>
          
          <div className="relative flex overflow-hidden w-full group">
            <div className="flex animate-marquee whitespace-nowrap py-4 shrink-0">
              {[...allSkills, ...allSkills].map((skill, i) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`${skill.name}-${i}`} className="mx-2 md:mx-4 flex items-center gap-2 md:gap-3 bg-dark-surface/50 border border-white/10 px-4 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/10 transition-colors shadow-sm">
                    {IconComponent && <IconComponent size={24} style={{ color: skill.color }} />}
                    <span className="text-white font-bold tracking-wider text-sm md:text-base">{skill.name}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex animate-marquee whitespace-nowrap py-4 shrink-0" aria-hidden="true">
              {[...allSkills, ...allSkills].map((skill, i) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <div key={`copy-${skill.name}-${i}`} className="mx-2 md:mx-4 flex items-center gap-2 md:gap-3 bg-dark-surface/50 border border-white/10 px-4 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/10 transition-colors shadow-sm">
                    {IconComponent && <IconComponent size={24} style={{ color: skill.color }} />}
                    <span className="text-white font-bold tracking-wider text-sm md:text-base">{skill.name}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-dark to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-dark to-transparent z-20 pointer-events-none"></div>
          </div>
        </section>

        <section className="py-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roles.map((role, i) => (
                <motion.div 
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel hover:bg-white/10 p-8 rounded-3xl transition-all duration-300 hover:neon-border-purple group"
                >
                  <div className="w-14 h-14 bg-dark-surface rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-secondary/50 group-hover:neon-border-purple transition-all">
                    {getIcon(role.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-widest uppercase">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative border-t border-white/5 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-6 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group hover:neon-border-purple transition-all duration-500 shadow-2xl flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <Quote size={80} className="text-primary/10 absolute top-6 left-6 md:top-10 md:left-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <Quote size={80} className="text-secondary/10 absolute bottom-6 right-6 md:bottom-10 md:right-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              
              <div className="relative z-10 max-w-3xl">
                <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 leading-tight">
                  "The best way to predict the future is to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">invent it</span>."
                </p>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[2px] w-12 bg-primary/50"></div>
                  <p className="text-lg md:text-xl font-bold text-gray-400 tracking-[0.2em] uppercase">
                    Alan Kay
                  </p>
                  <div className="h-[2px] w-12 bg-secondary/50"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
