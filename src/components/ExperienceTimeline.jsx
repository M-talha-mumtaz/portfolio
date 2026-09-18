import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, BrainCircuit, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ExperienceTimeline = () => {
  const { experiences } = portfolioData;

  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden" id="experience">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold text-primary uppercase tracking-[0.35em]"
          >
            Experience
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Section Title & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight font-display"
          >
            Career Trajectory <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              & Industry Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-text-muted max-w-md leading-relaxed"
          >
            Hands-on software engineering internships engineering full-stack platforms, integrating AI pipelines, and optimizing responsive user interfaces.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          
          {/* Continuous Vertical Timeline Spine */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-6 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-white/5 pointer-events-none" />

          {/* Experience Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => {
              const isRecent = index === 0;
              const IconComponent = exp.id === 'netsol' ? BrainCircuit : Layers;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start group"
                >
                  {/* Timeline Milestone Node */}
                  <div className="relative z-20 shrink-0">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl bg-zinc-950 border border-white/15 group-hover:border-primary/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(200,200,210,0.2)] transition-all duration-500 backdrop-blur-md">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Pulse halo for most recent role */}
                    {isRecent && (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                      </span>
                    )}
                  </div>

                  {/* Experience Card */}
                  <div className="ml-6 sm:ml-8 md:ml-12 flex-1">
                    <div className="relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-primary/40 transition-all duration-500 shadow-xl group hover:shadow-[0_0_35px_rgba(200,200,210,0.06)] hover:-translate-y-1">
                      
                      {/* Top Row: Role, Company & Period Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/8">
                        <div>
                          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-main font-display tracking-tight group-hover:text-white transition-colors">
                              {exp.role}
                            </h3>
                            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 uppercase tracking-wider">
                              {exp.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-text-muted">
                            <Building2 size={16} className="text-primary/90 shrink-0" />
                            <span className="text-primary/90 font-bold">{exp.company}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-xs font-mono text-text-muted/80">{exp.location}</span>
                          </div>
                        </div>

                        {/* Period Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-white/10 text-xs font-mono font-semibold text-text-muted shadow-inner shrink-0 self-start">
                          <Calendar size={13} className="text-primary shrink-0" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Role Summary Description */}
                      <p className="text-sm sm:text-base text-text-muted leading-relaxed mt-5">
                        {exp.description}
                      </p>

                      {/* Key Deliverables & Highlights */}
                      <div className="mt-5 space-y-2.5">
                        {exp.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-start gap-3 text-xs sm:text-sm text-text-main/80">
                            <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="mt-7 pt-5 border-t border-white/8 flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted/60 mr-1 flex items-center gap-1">
                          <Sparkles size={11} className="text-primary/70" /> Stack:
                        </span>
                        {exp.skills.map((skill, sIndex) => (
                          <span
                            key={sIndex}
                            className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/8 text-[11px] font-mono text-text-muted hover:text-text-main hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
