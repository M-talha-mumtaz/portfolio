import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  BrainCircuit, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal,
  Cpu,
  Code2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const experienceMeta = {
  netsol: {
    index: '01',
    tagline: 'AI/ML Web Application',
    icon: BrainCircuit,
    badge: 'AI & Full Stack',
    accentColor: 'rgba(200, 200, 210, 0.9)',
    deliverables: [
      { label: 'AI/ML Integration', detail: 'Connected machine learning inference models to full-stack web workflows.' },
      { label: 'Real-Time Pipelines', detail: 'Engineered responsive interface feedback with sub-second API latency.' },
      { label: 'Scalable Architecture', detail: 'Built validated backend endpoints and optimized database models.' },
    ],
  },
  ventrex: {
    index: '02',
    tagline: 'Frontend Engineering Core',
    icon: Layers,
    badge: 'Frontend Systems',
    accentColor: 'rgba(180, 180, 195, 0.9)',
    deliverables: [
      { label: 'UI/UX Fidelity', detail: 'Delivered pixel-perfect responsive web solutions from complex Figma designs.' },
      { label: 'Performance Tuning', detail: 'Streamlined client-side rendering speed, asset bundles, and mobile smoothness.' },
      { label: 'Reusable Toolkits', detail: 'Engineered clean, modular UI components to standardize production code.' },
    ],
  },
};

const ExperienceTimeline = () => {
  const { experiences } = portfolioData;
  const [activeId, setActiveId] = useState(experiences?.[0]?.id || 'netsol');

  if (!experiences || experiences.length === 0) return null;

  const activeExp = experiences.find((e) => e.id === activeId) || experiences[0];
  const activeMeta = experienceMeta[activeExp.id] || experienceMeta.netsol;
  const ActiveIcon = activeMeta.icon;

  return (
    <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden" id="experience">
      {/* Subtle Ambient Canvas Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
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

        {/* Section Heading & Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight font-display"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">Dossier</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed"
          >
            Interactive chronicle of high-impact internships bridging full-stack systems and frontend craftsmanship.
          </motion.p>
        </div>

        {/* MOBILE VIEW: SLEEK SEGMENTED SWITCHER (< md) */}
        <div className="md:hidden mb-6">
          <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-md">
            {experiences.map((exp) => {
              const isActive = exp.id === activeId;
              const meta = experienceMeta[exp.id];

              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isActive ? 'text-zinc-950 font-black' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobileActivePill"
                      className="absolute inset-0 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 text-[10px] opacity-70">{meta.index}</span>
                  <span className="relative z-10 truncate">{exp.company.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE GRID (DESKTOP & MOBILE DOSSIER) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* DESKTOP NAVIGATOR: TIMELINE CARDS (col-span-4 lg:col-span-4) */}
          <div className="hidden md:flex flex-col gap-3.5 md:col-span-5 lg:col-span-4 justify-center">
            {experiences.map((exp) => {
              const isActive = exp.id === activeId;
              const meta = experienceMeta[exp.id];
              const ItemIcon = meta.icon;

              return (
                <motion.div
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left select-none group ${
                    isActive
                      ? 'bg-zinc-900/80 border-primary/40 shadow-[0_0_30px_rgba(200,200,210,0.08)]'
                      : 'bg-zinc-950/40 border-white/8 hover:border-white/20 hover:bg-zinc-900/30'
                  }`}
                >
                  {/* Left Active Glow Indicator Strip */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveBar"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-white via-primary to-primary/40 rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive ? 'bg-primary/15 border-primary/40 text-primary' : 'bg-white/5 border-white/10 text-text-muted group-hover:text-text-main'
                      }`}>
                        <ItemIcon size={16} />
                      </div>
                      <span className="text-xs font-mono font-bold text-primary/90 tracking-wider">
                        {meta.index} // {meta.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-text-muted/80 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/5">
                      {exp.period.split('–')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-main font-display group-hover:text-white transition-colors">
                    {exp.company}
                  </h3>

                  <p className="text-xs text-text-muted font-medium mt-0.5">
                    {exp.role}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ACTIVE MISSION DOSSIER CARD (col-span-8) */}
          <div className="md:col-span-7 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-9 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl h-full flex flex-col justify-between"
              >
                {/* Decorative Top Ambient Light */}
                <div className="absolute top-0 right-10 w-48 h-24 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Status & Timestamp Strip */}
                  <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-white/8 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted font-semibold">
                        [ VERIFIED INTERNSHIP ]
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-white/10 text-xs font-mono font-medium text-text-muted">
                      <Calendar size={13} className="text-primary" />
                      <span>{activeExp.period}</span>
                    </div>
                  </div>

                  {/* Role & Company Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
                        {activeExp.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-primary">
                      <Building2 size={16} className="shrink-0 text-primary/80" />
                      <span>{activeExp.company}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-xs font-mono text-text-muted font-normal">{activeExp.location}</span>
                    </div>
                  </div>

                  {/* High-Level Mission Description */}
                  <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed mb-6">
                    {activeExp.description}
                  </p>

                  {/* Core Deliverables Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {activeMeta.deliverables.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/6 hover:border-white/15 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-text-main mb-1">
                          <CheckCircle2 size={13} className="text-primary shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="pt-4 border-t border-white/8 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted/60 mr-1 flex items-center gap-1">
                    <Sparkles size={11} className="text-primary/70" /> Stack:
                  </span>
                  {activeExp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/8 text-[11px] font-mono text-text-muted hover:text-white hover:border-primary/40 hover:bg-zinc-800 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
