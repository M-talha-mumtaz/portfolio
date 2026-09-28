import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const experienceBadges = {
  netsol: 'ACTIVE COMMAND',
  ventrex: 'PRODUCTION'
};

const ExperienceTimeline = () => {
  const { experiences, education } = portfolioData;
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Fallback if education isn't in data yet
  const educationList = education || [
    {
      id: 'ue',
      degree: 'BS Computer Science',
      institution: 'University of Education, Lahore',
      period: '2023 – 2027',
      tags: ['Software Engineering', 'Algorithms', 'AI']
    },
    {
      id: 'pgc',
      degree: 'Intermediate (ICS Physics)',
      institution: 'Punjab Group of Colleges (PGC), Lahore',
      period: '2021 – 2023',
      tags: ['Physics', 'Mathematics', 'CS Foundations']
    }
  ];

  return (
    <section className="pt-10 sm:pt-14 md:pt-16 pb-24 sm:pb-32 relative overflow-hidden bg-[#09090b] scroll-mt-6 sm:scroll-mt-8" id="experience">
      
      {/* Subtle Ambient Monochrome Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            {/* Tagline Badge with Line */}
            <div className="flex items-center gap-4 mb-2.5">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
              >
                Experience
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-16 bg-gradient-to-r from-primary/60 to-transparent origin-left"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-main"
            >
              Professional Journey.
            </motion.h2>
          </div>

          {/* Minimalist Top Right Accent Bar (Monochrome Theme) */}
          <div className="hidden sm:flex items-center gap-2 mb-2">
            <div className="w-16 sm:w-24 h-1 rounded-full bg-gradient-to-r from-zinc-300 via-zinc-500 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          </div>
        </div>

        {/* ── MAIN PARALLEL GRID (EXPERIENCE + ACADEMIC BLUEPRINT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── LEFT COLUMN: WORK EXPERIENCE WITH TIMELINE AXIS (lg:col-span-8) ── */}
          <div className="lg:col-span-8 relative">
            
            {/* Timeline Vertical Axis Line (Desktop & Tablet) */}
            <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-zinc-800/80 pointer-events-none hidden sm:block" />

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp) => {
                const isExpanded = hoveredId === exp.id || expandedId === exp.id;
                const badgeText = experienceBadges[exp.id] || 'VERIFIED';

                return (
                  <div key={exp.id} className="relative sm:pl-10">
                    
                    {/* Timeline Node Beacon (Black / Grey / White) */}
                    <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center z-20">
                      <div className="w-6 h-6 rounded-full bg-[#09090b] flex items-center justify-center">
                        <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ease-out ${
                          isExpanded 
                            ? 'bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)] scale-110' 
                            : 'bg-zinc-600 shadow-[0_0_6px_rgba(255,255,255,0.15)]'
                        }`} />
                      </div>
                    </div>

                    {/* Interactive Experience Card */}
                    <div
                      onMouseEnter={() => setHoveredId(exp.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => toggleExpand(exp.id)}
                      className={`relative rounded-[26px] p-6 sm:p-7 md:p-8 bg-[#111114] border transition-all duration-500 ease-out cursor-pointer shadow-xl overflow-hidden group ${
                        isExpanded 
                          ? 'border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.03)]' 
                          : 'border-white/[0.07] hover:border-white/20'
                      }`}
                    >
                      {/* Subtle monochrome ambient light on hover */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-white/[0.025] to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
                          isExpanded ? 'opacity-100' : 'opacity-0'
                        }`} 
                      />

                      {/* Header Row: Role Title & Badge */}
                      <div className="flex items-start justify-between gap-3 mb-2.5 relative z-10">
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Top-Right Pill Badge (Monochrome Theme) */}
                          <span className={`px-2.5 py-1 rounded-full text-[9.5px] font-mono font-medium tracking-wider uppercase shrink-0 transition-colors duration-300 ${
                            isExpanded 
                              ? 'bg-white/10 border border-white/25 text-white' 
                              : 'bg-white/[0.04] border border-white/10 text-zinc-400'
                          }`}>
                            {badgeText}
                          </span>

                          {/* Mobile Dropdown Indicator Button */}
                          <div
                            className={`sm:hidden w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isExpanded
                                ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                                : 'bg-white/[0.05] text-zinc-300 border-white/15'
                            }`}
                            aria-label="Toggle details dropdown"
                          >
                            <ChevronDown
                              size={13}
                              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : 'rotate-0 text-zinc-400'}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Company Line with Styled Italicized Name */}
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-muted mb-3 relative z-10 font-sans">
                        <span className="font-semibold text-zinc-100 text-sm sm:text-base">
                          {exp.company}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400 text-xs">
                          {exp.location}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400 text-xs font-mono">
                          {exp.period}
                        </span>
                      </div>

                      {/* Brief Base Summary */}
                      <p className="text-xs sm:text-[13px] md:text-sm text-zinc-400 group-hover:text-zinc-300 leading-relaxed font-normal relative z-10 font-sans transition-colors duration-200">
                        {exp.description}
                      </p>

                      {/* ── ON HOVER / TAP: SILKY SMOOTH SLIDE-DOWN DRAWER ── */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                          marginTop: isExpanded ? 16 : 0,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1], // Smooth Apple/Linear cubic-bezier
                        }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="pt-3.5 border-t border-white/[0.08]">
                          {/* Key Highlights (Concise Bullets) */}
                          <div className="space-y-2 mb-3.5">
                            {exp.highlights.map((item, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300 font-sans leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Badges (Black / Grey / White) */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {exp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Mobile Dropdown Action Bar */}
                      <div className="mt-3.5 pt-3 border-t border-white/[0.07] flex sm:hidden items-center justify-between relative z-10">
                        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px]">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            isExpanded ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'
                          }`} />
                          <span>{isExpanded ? 'Detailed view open' : 'Click to see detailed info'}</span>
                        </div>
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium border transition-all duration-300 ${
                            isExpanded
                              ? 'bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                              : 'bg-white/[0.06] text-zinc-200 border-white/15'
                          }`}
                        >
                          <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : 'rotate-0 text-zinc-400'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ── RIGHT COLUMN: ACADEMIC BLUEPRINT (lg:col-span-4) ── */}
          <div className="lg:col-span-4">
            <div className="rounded-[26px] p-6 sm:p-7 md:p-8 bg-[#111114] border border-white/[0.07] hover:border-white/20 transition-all duration-500 ease-out shadow-xl relative overflow-hidden">
              
              {/* Header: Vertical Monochrome Bar + ACADEMIC BLUEPRINT */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-white via-zinc-400 to-zinc-600 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight leading-tight">
                  Academic<br />Blueprint
                </h3>
              </div>

              {/* Education List */}
              <div className="space-y-7">
                {educationList.map((edu, idx) => (
                  <div key={edu.id} className="relative">
                    
                    {/* Period in subtle grey font */}
                    <span className="text-xs font-mono font-medium text-zinc-400 tracking-wider block mb-1">
                      {edu.period}
                    </span>

                    {/* Degree */}
                    <h4 className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                      {edu.degree}
                    </h4>

                    {/* Institution */}
                    <p className="text-xs font-sans text-text-muted mt-0.5 tracking-normal mb-3">
                      {edu.institution}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {edu.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider between education items */}
                    {idx < educationList.length - 1 && (
                      <div className="h-px w-full bg-white/[0.06] mt-6" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
