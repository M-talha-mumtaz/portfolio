import { motion } from 'framer-motion';
import { 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers,
  BrainCircuit,
  Code2,
  Smartphone,
  Gauge,
  Boxes,
  Workflow,
  Radio,
  Cpu
} from 'lucide-react';
import {
  SiPython,
  SiFastapi,
  SiPytorch,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiFlutter,
  SiDart
} from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const pillars = [
  {
    id: 'aiml',
    title: 'AI/ML Developer',
    category: 'INTELLIGENT SYSTEMS',
    icon: BrainCircuit,
    description:
      'Designing and deploying intelligent inference pipelines, FastAPI microservices, and neural models for real-time production workflows.',
    techs: [
      { name: 'Python', icon: SiPython, color: '#387EB8' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Pipelines', icon: Workflow, color: '#38BDF8' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineering',
    category: 'WEB ARCHITECTURE',
    icon: Code2,
    description:
      'Engineering resilient, high-speed web platforms with React 19, Node.js, and Express, backed by clean RESTful APIs and MongoDB.',
    techs: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', icon: SiExpress, color: '#E2E8F0' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'REST APIs', icon: SiPostman, color: '#FF6C37' },
    ],
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile',
    category: 'MOBILE SYSTEMS',
    icon: Smartphone,
    description:
      'Crafting fluid 60fps cross-platform mobile apps with Flutter and Dart, integrating live Agora RTC audio/video and reactive state.',
    techs: [
      { name: 'Flutter', icon: SiFlutter, color: '#54C5F8' },
      { name: 'Dart', icon: SiDart, color: '#00B4AB' },
      { name: 'Agora RTC', icon: Radio, color: '#099DFD' },
      { name: 'Mobile UI/UX', icon: Sparkles, color: '#F59E0B' },
      { name: 'State Mgmt', icon: Layers, color: '#A78BFA' },
    ],
  },
];

const principles = [
  {
    icon: Gauge,
    color: '#10B981',
    title: 'Performance First',
    badge: '60 FPS',
    detail: 'Zero unnecessary renders, optimized asset bundles, and fluid 60fps micro-interactions.',
  },
  {
    icon: Boxes,
    color: '#38BDF8',
    title: 'Clean Architecture',
    badge: 'MODULAR',
    detail: 'Modular component design, scalable state patterns, and maintainable codebases.',
  },
  {
    icon: ShieldCheck,
    color: '#A78BFA',
    title: 'Production Resilience',
    badge: 'VERIFIED',
    detail: 'End-to-end data validation, secure API endpoints, and comprehensive error handling.',
  },
];

const BiographySection = () => {
  const { profile } = portfolioData;

  const paragraph =
    "I am an AI/ML and Full Stack Developer dedicated to building high-performance, intelligent digital products that bridge sleek user interfaces with robust backend architectures. With hands-on expertise spanning machine learning integration, the MERN stack, Python, FastAPI, and cross-platform mobile environments using Flutter and Dart, I engineer resilient, production-ready systems designed for speed, scalability, and seamless user experiences.";

  const words = paragraph.split(' ');

  return (
    <section className="pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24 relative overflow-hidden scroll-mt-6 sm:scroll-mt-8" id="about">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-96 h-96 bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2.5">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
              >
                About
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
              Engineering with precision & purpose.
            </motion.h2>
          </div>

          {/* Quick status & location badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-300 tracking-wide">
                {profile?.availability || 'Available for projects'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-text-muted text-xs">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Lahore, Pakistan · Remote</span>
            </div>
          </motion.div>
        </div>

        {/* Narrative Biography Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 mb-10 md:mb-12 border border-white/[0.08] overflow-hidden"
        >
          {/* Subtle gradient corner accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none" />

          {/* Main Card Content Grid (Paragraph + Telemetry Deck) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Narrative Biography Paragraph (lg:col-span-8) */}
            <div className="lg:col-span-8">
              <p className="text-justify [text-justify:inter-word] text-base sm:text-lg md:text-xl lg:text-[1.2rem] text-text-muted font-normal leading-relaxed md:leading-loose">
                {words.map((word, i) => {
                  const highlights = [
                    'ai/ml',
                    'mern',
                    'flutter',
                    'dart',
                    'engineer',
                    'developer',
                    'backend',
                    'full',
                    'stack',
                    'machine',
                    'learning',
                    'python',
                    'fastapi',
                  ];
                  const isHighlighted = highlights.some((h) =>
                    word.toLowerCase().includes(h)
                  );
                  return (
                    <span key={i} className="inline">
                      <motion.span
                        variants={wordVariants}
                        className={`inline-block ${
                          isHighlighted ? 'text-text-main font-semibold' : ''
                        }`}
                      >
                        {word}
                      </motion.span>
                      {i < words.length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Right Column: Engineering Telemetry Deck (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-4 sm:p-6 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300 shadow-xl">
                {/* Subtle top ambient shimmer */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-zinc-300" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-bold">
                      Stack Specs
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Production
                  </span>
                </div>

                {/* Specs Rows */}
                <div className="space-y-3 font-mono">
                  <div className="flex items-center justify-between gap-2 text-xs pb-2 border-b border-white/[0.04]">
                    <span className="text-zinc-500 text-[10px] sm:text-[11px] whitespace-nowrap shrink-0">Primary Domain</span>
                    <span className="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap text-right">AI/ML + Full Stack</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs pb-2 border-b border-white/[0.04]">
                    <span className="text-zinc-500 text-[10px] sm:text-[11px] whitespace-nowrap shrink-0">Backend Core</span>
                    <span className="text-zinc-200 font-semibold text-[11px] sm:text-xs whitespace-nowrap text-right">FastAPI · Python · Node</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs pb-2 border-b border-white/[0.04]">
                    <span className="text-zinc-500 text-[10px] sm:text-[11px] whitespace-nowrap shrink-0">Client Systems</span>
                    <span className="text-zinc-200 font-semibold text-[11px] sm:text-xs whitespace-nowrap text-right">React 19 · Flutter</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-zinc-500 text-[10px] sm:text-[11px] whitespace-nowrap shrink-0">Data Architecture</span>
                    <span className="text-zinc-200 font-semibold text-[11px] sm:text-xs whitespace-nowrap text-right">MongoDB · PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="uppercase tracking-widest text-[11px]">Clean Code · Scalable Systems · Pixel Precision</span>
            </div>
            <a
              href="#experience"
              className="inline-flex items-center gap-1 text-text-main hover:text-primary transition-colors duration-200 group font-medium"
            >
              <span>View track record</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>

        {/* Core Pillars Bento Grid */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Core Capabilities & Architecture
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">03 Specialties</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-2xl p-6 sm:p-7 border border-[#242424] hover:border-zinc-500/60 bg-gradient-to-b from-[#151515] via-[#0f0f0f] to-[#090909] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.03)] overflow-hidden"
                >
                  {/* Specular hairline top glow */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-all duration-500" />
                  
                  {/* Subtle interior ambient light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      {/* High-tech Multi-layered Icon Dock */}
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-b from-[#222222] to-[#121212] border border-[#303030] group-hover:border-zinc-400/80 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.25)]">
                        <Icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                        
                        {/* Status micro-pip indicator */}
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#121212] border border-[#333333] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
                        </span>
                      </div>

                      {/* Category Tag Chip */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-[#262626] group-hover:border-[#383838] transition-colors">
                        <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-emerald-400 transition-colors" />
                        <span className="text-[9.5px] font-mono font-medium tracking-wider text-zinc-400 group-hover:text-zinc-200 uppercase">
                          {pillar.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-lg font-display font-bold text-white mb-2.5 transition-colors duration-200">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-zinc-400 group-hover:text-zinc-300 leading-relaxed mb-5 font-normal transition-colors duration-200">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Tech stack chips with brand colors & interactive hover effects */}
                  <div className="relative z-10 pt-3.5 border-t border-white/[0.08] flex flex-wrap gap-2">
                    {pillar.techs.map((tech) => {
                      const TechIcon = tech.icon;
                      return (
                        <div
                          key={tech.name}
                          className="group/chip inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-[#141416] text-zinc-300 border border-white/[0.08] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:-translate-y-0.5 select-none"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = `${tech.color}60`;
                            e.currentTarget.style.boxShadow = `0 4px 20px ${tech.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`;
                            e.currentTarget.style.backgroundColor = `${tech.color}10`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '';
                            e.currentTarget.style.boxShadow = '';
                            e.currentTarget.style.backgroundColor = '';
                          }}
                        >
                          <TechIcon
                            className="w-3.5 h-3.5 transition-all duration-300 group-hover/chip:scale-125 group-hover/chip:rotate-6 shrink-0"
                            style={{
                              color: tech.color,
                              filter: `drop-shadow(0 0 5px ${tech.color}50)`,
                            }}
                          />
                          <span className="font-medium tracking-tight group-hover/chip:text-white transition-colors duration-200">
                            {tech.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Engineering Philosophy & Tenets (Interactive Dock with Enhanced Hover) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[#242424] bg-gradient-to-b from-[#131313] via-[#0d0d0d] to-[#070707] p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden"
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {principles.map((p, i) => {
              const PIcon = p.icon;
              return (
                <div
                  key={i}
                  className="group/tenet relative rounded-xl border border-transparent hover:border-[#323232] hover:bg-gradient-to-b hover:from-[#1c1c1c] hover:to-[#111111] p-4 sm:p-5 transition-all duration-300 flex items-start gap-3.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 cursor-default overflow-hidden"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${p.color}40`;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Subtle top hairline on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/tenet:opacity-100 transition-opacity duration-300" />

                  <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#282828] group-hover/tenet:border-zinc-400 group-hover/tenet:bg-gradient-to-b group-hover/tenet:from-[#2a2a2a] group-hover/tenet:to-[#181818] group-hover/tenet:shadow-[0_0_18px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center shrink-0 transition-all duration-300">
                    <PIcon
                      className="w-4.5 h-4.5 group-hover/tenet:scale-110 transition-transform duration-300"
                      style={{
                        color: p.color,
                        filter: `drop-shadow(0 0 6px ${p.color}50)`,
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover/tenet:text-white tracking-tight font-display transition-colors">
                        {p.title}
                      </h5>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#181818] border border-[#2a2a2a] text-zinc-400 group-hover/tenet:border-emerald-500/40 group-hover/tenet:bg-emerald-500/10 group-hover/tenet:text-emerald-300 transition-all shrink-0">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 group-hover/tenet:text-zinc-300 leading-relaxed font-sans transition-colors">
                      {p.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BiographySection;
