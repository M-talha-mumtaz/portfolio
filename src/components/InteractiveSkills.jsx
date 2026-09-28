import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Cpu, 
  Layers, 
  Play, 
  Pause, 
  Code2, 
  Database, 
  Wrench,
  CheckCircle2,
  Sparkles,
  Lock,
  X
} from 'lucide-react';
import {
  SiPython,
  SiJavascript,
  SiDart,
  SiHtml5,
  SiReact,
  SiFlutter,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiVite,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';

// ── BASE ANGULAR VELOCITIES (DEG / SEC) FOR 5 CONCENTRIC RINGS ───────────────
const ORBIT_VELOCITIES = [
  360 / 26,     // Ring 1: clockwise (~13.85 deg/s)
  -360 / 34,    // Ring 2: counter-clockwise (~ -10.59 deg/s)
  360 / 42,     // Ring 3: clockwise (~8.57 deg/s)
  -360 / 50,    // Ring 4: counter-clockwise (~ -7.20 deg/s)
  360 / 58,     // Ring 5: clockwise (~6.21 deg/s)
];

// ── 5 PLANETARY SYSTEM DEFINITIONS (25 TOTAL ENGINES) ────────────────────────
// Radii calibrated with optimal spacing to eliminate node collisions on small screens
export const orbitCategories = [
  {
    id: 'aiml',
    name: 'AI / ML & Deep Learning',
    shortName: 'AI / ML',
    tier: 'Tier 01',
    orbitIndex: 1,
    radius: 64,
    icon: BrainCircuit,
    description: 'Neural architectures, foundation model pipelines, transformer fine-tuning, and classical machine learning algorithms.',
    skills: [
      { name: 'ML Algorithms', Icon: BrainCircuit, color: '#FFFFFF', tag: 'Core Algorithms', role: 'Regression, Random Forest, XGBoost, K-Means & SVM', level: 'Production' },
      { name: 'Deep Learning', Icon: Cpu, color: '#38BDF8', tag: 'Neural Networks', role: 'CNNs, Transformers, LSTMs, Attention Mechanisms & LLMs', level: 'Advanced' },
      { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C', tag: 'Tensor Engine', role: 'Custom neural architectures, GPU tensor compute & backpropagation', level: 'Production' },
      { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00', tag: 'ML Framework', role: 'Production model pipelines, Keras abstractions & export serving', level: 'Proficient' },
      { name: 'Scikit-Learn', Icon: SiScikitlearn, color: '#F7931E', tag: 'Pipelines', role: 'Feature preprocessing, clustering, regression & model tuning', level: 'Mastery' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages & Core Systems',
    shortName: 'Languages',
    tier: 'Tier 02',
    orbitIndex: 2,
    radius: 108,
    icon: Code2,
    description: 'Foundational programming, typed systems, scripting runtimes, and semantic visual standards.',
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB', tag: 'Scripting & AI', role: 'AI pipelines, FastAPI microservices, scientific math & automation', level: 'Basic' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', tag: 'Web Engine', role: 'Modern ESNext, asynchronous browser engines & event loops', level: 'Mastery' },
      { name: 'Dart', Icon: SiDart, color: '#00B4AB', tag: 'Typed OOP', role: 'Strictly typed client architecture for native mobile compilation', level: 'Advanced' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', tag: 'Semantics', role: 'Accessible structural DOM, modern semantic canvas & SEO hierarchy', level: 'Mastery' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6', tag: 'Styling & Motion', role: 'Fluid responsive layouts, micro-animations & design token systems', level: 'Mastery' },
    ],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Platforms',
    shortName: 'Frameworks',
    tier: 'Tier 03',
    orbitIndex: 3,
    radius: 152,
    icon: Layers,
    description: 'Reactive frontend architectures, cross-platform mobile frameworks, and high-throughput async APIs.',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB', tag: 'Frontend UI', role: 'Declarative component trees, custom hooks & Virtual DOM rendering', level: 'Mastery' },
      { name: 'Flutter', Icon: SiFlutter, color: '#02569B', tag: 'Cross-Platform', role: '60fps compiled iOS & Android applications with native widgets', level: 'Advanced' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688', tag: 'Async Microservices', role: 'Asynchronous Python RESTful endpoints with strict Pydantic validation', level: 'Production' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', tag: 'Server Runtime', role: 'Non-blocking I/O event loops & high-concurrency microservices', level: 'Advanced' },
      { name: 'Express.js', Icon: SiExpress, color: '#E2E8F0', tag: 'Backend Framework', role: 'Robust HTTP routing, middleware pipelines & RESTful API gateways', level: 'Production' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4', tag: 'Design Tokens', role: 'Engineered utility design systems & responsive interface tokens', level: 'Mastery' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & State Persistence',
    shortName: 'Databases',
    tier: 'Tier 04',
    orbitIndex: 4,
    radius: 196,
    icon: Database,
    description: 'Document stores, relational engines, real-time sync, and sub-millisecond in-memory cache.',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', tag: 'Document Store', role: 'Scalable JSON schemaless aggregation pipelines & Atlas hosting', level: 'Production' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', tag: 'Relational SQL', role: 'ACID transactions, relational schemas, indexing & complex joins', level: 'Advanced' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28', tag: 'Realtime BaaS', role: 'Cloud Firestore live streaming, authentication & cloud functions', level: 'Production' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D', tag: 'Memory Cache', role: 'Sub-millisecond in-memory caching, key-value pub/sub queues', level: 'Advanced' },
    ],
  },
  {
    id: 'ecosystem',
    name: 'Dev Ecosystem & Infrastructure',
    shortName: 'Dev Ecosystem',
    tier: 'Tier 05',
    orbitIndex: 5,
    radius: 238,
    icon: Wrench,
    description: 'Containerization, distributed version control, automated testing, and lightning build toolchains.',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032', tag: 'VCS', role: 'Atomic commit workflows, rebase trees, branching & merge automation', level: 'Mastery' },
      { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF', tag: 'CI/CD Platform', role: 'Continuous delivery workflows, code review & repository ops', level: 'Mastery' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED', tag: 'Containers', role: 'Multi-stage container builds & reproducible microservice runtime', level: 'Production' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', tag: 'API Verification', role: 'Automated integration suites, mock servers & telemetry testing', level: 'Advanced' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF', tag: 'Build System', role: 'Next-generation ES module bundler and lightning-fast HMR dev server', level: 'Mastery' },
    ],
  },
];

const InteractiveSkills = () => {
  const [selectedOrbit, setSelectedOrbit] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null); // { skill, category }
  const [lockedSkill, setLockedSkill] = useState(null);   // { skill, category }
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState('1x'); // '0.5x' | '1x' | '2x'

  // Refs for smooth continuous rotation tracking without resets
  const anglesRef = useRef([0, 0, 0, 0, 0]);
  const lastTimeRef = useRef(null);
  const orbitRefs = useRef([]);

  // Continuous animation loop: updates angles smoothly from exact current positions
  useEffect(() => {
    let animId;
    const multiplier = speed === '0.5x' ? 0.5 : speed === '2x' ? 2.0 : 1.0;

    const step = (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (!isPaused && delta > 0 && delta < 0.2) {
        for (let i = 0; i < 5; i++) {
          anglesRef.current[i] = (anglesRef.current[i] + ORBIT_VELOCITIES[i] * multiplier * delta) % 360;
          const el = orbitRefs.current[i];
          if (el) {
            el.style.setProperty('--rot', `${anglesRef.current[i]}deg`);
            el.style.setProperty('--counter-rot', `${-anglesRef.current[i]}deg`);
          }
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, speed]);

  const isOrbitHighlighted = (orbitId) =>
    selectedOrbit === 'all' || selectedOrbit === orbitId;

  const handleNodeClick = (skill, category) => {
    if (lockedSkill?.skill?.name === skill.name) {
      setLockedSkill(null);
    } else {
      setLockedSkill({ skill, category });
    }
  };

  // Active item in telemetry card:
  const activeItem = hoveredSkill || lockedSkill;
  const isDisplayingLocked = Boolean(lockedSkill && (!hoveredSkill || hoveredSkill.skill.name === lockedSkill.skill.name));

  // Selected or active category details for inspector fallback
  const fallbackCategory = 
    selectedOrbit !== 'all'
      ? orbitCategories.find(c => c.id === selectedOrbit)
      : orbitCategories[0];

  // ── REUSABLE TELEMETRY CARD COMPONENT ──
  const renderTelemetryCard = () => (
    <div className={`rounded-xl sm:rounded-2xl border transition-all duration-200 bg-gradient-to-b from-[#181818] to-[#0f0f0f] p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.8)] min-h-[145px] sm:min-h-[175px] flex flex-col justify-between relative ${
      isDisplayingLocked ? 'border-zinc-500/50 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-[#262626]'
    }`}>
      <AnimatePresence mode="wait">
        {activeItem ? (
          <motion.div
            key={activeItem.skill.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="space-y-2.5 sm:space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#202020] border border-[#2f2f2f] flex items-center justify-center shadow-inner">
                  <activeItem.skill.Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: activeItem.skill.color }} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-display leading-tight">
                    {activeItem.skill.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    {activeItem.category?.name || 'Production Engine'}
                  </span>
                </div>
              </div>

              {/* Lock / Hover Status Pill */}
              <div className="flex items-center gap-1.5">
                {isDisplayingLocked ? (
                  <button
                    onClick={() => setLockedSkill(null)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 rounded-full border border-white/20 text-[10px] sm:text-xs font-mono text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    title="Click to release locked view"
                  >
                    <Lock size={9} className="text-white" />
                    <span>Locked</span>
                    <X size={9} className="ml-0.5 opacity-60 hover:opacity-100" />
                  </button>
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2c2c2c] text-zinc-300 bg-[#161616]">
                    {activeItem.skill.tag}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-sans">
              {activeItem.skill.role}
            </p>

            <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>PROFICIENCY:</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-emerald-400 flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
                  <CheckCircle2 size={11} />
                  {activeItem.skill.level}
                </span>
                {!isDisplayingLocked && (
                  <span className="text-zinc-500 hidden sm:inline text-[9px]">
                    (Tap node to lock)
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 text-zinc-400"
          >
            <div className="flex items-center justify-between border-b border-[#222222] pb-1.5">
              <span className="text-xs font-mono font-medium text-white flex items-center gap-1.5">
                <Sparkles size={11} className="text-zinc-400" />
                {fallbackCategory.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase">
                {fallbackCategory.tier} • {fallbackCategory.skills.length} Engines
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {fallbackCategory.description}
            </p>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Tap any planet to inspect telemetry
              </span>
              <span className="hidden sm:inline">
                {orbitCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} Synced
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-8 md:pb-12 relative overflow-hidden scroll-mt-6 sm:scroll-mt-8" id="skills">
      {/* Subtle Ambient Canvas Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 relative z-10">

        {/* ── SECTION HEADER TAG ── */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold text-primary uppercase tracking-[0.35em]"
          >
            Skills
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* ── PREMIUM NEUTRAL DARK BLACK & GREY DOCK CONTAINER ── */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-[#242424] bg-gradient-to-b from-[#141414] via-[#0d0d0d] to-[#070707] p-4 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden">
          
          {/* Subtle clean specular top grey glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* ── CARD TOP BAR (The Tech Orbit + Speed Controls) ── */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 border-b border-[#1c1c1c] pb-3 sm:pb-4">
            {/* Title Inside Box */}
            <h2 className="text-2xl sm:text-[28px] md:text-3xl font-display font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
              The Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">Orbit</span>
            </h2>

            {/* Speed Multipliers & Pause */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center p-0.5 rounded-full bg-[#181818] border border-[#2a2a2a] text-[10px] sm:text-[11px] font-mono">
                {['0.5x', '1x', '2x'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-1.5 py-0.5 sm:px-2 rounded-full transition-all cursor-pointer ${
                      speed === s
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    title={`Set speed to ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#2c2c2c] bg-[#161616] hover:bg-[#202020] hover:text-white text-zinc-400 text-[10px] sm:text-xs font-mono transition-all cursor-pointer backdrop-blur-md"
              >
                {isPaused ? <Play size={9} className="text-white fill-white" /> : <Pause size={9} className="text-zinc-300 fill-zinc-300" />}
                <span>{isPaused ? "Resume" : "Pause"}</span>
              </button>
            </div>
          </div>

          {/* ── BALANCED SYSTEM LAYOUT: Mobile Stacked & Desktop 2-Column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* DESKTOP LEFT COLUMN: Filters + Telemetry Card */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-4">
              {/* Category Filter Pills moved to this area - dragged a bit upward */}
              <div className="flex items-center gap-1.5 flex-wrap relative -top-6 sm:-top-7">
                <button
                  onClick={() => setSelectedOrbit('all')}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    selectedOrbit === 'all'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-[#141414] text-zinc-400 border border-[#282828] hover:text-white hover:border-[#404040]'
                  }`}
                >
                  All Systems (27)
                </button>
                {orbitCategories.map((cat) => {
                  const active = selectedOrbit === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedOrbit(cat.id)}
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'bg-[#141414] text-zinc-400 border border-[#282828] hover:text-white hover:border-[#404040]'
                      }`}
                    >
                      <Icon size={12} className={active ? 'text-black' : 'text-zinc-400'} />
                      <span>{cat.shortName}</span>
                      <span className="text-[10px] opacity-60">({cat.skills.length})</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry Inspector
              </div>

              {renderTelemetryCard()}

              <p className="text-[11px] font-mono text-zinc-500 leading-relaxed">
                Hover or tap any planetary node to inspect runtime architecture, proficiency status, and stack alignment.
              </p>
            </div>

            {/* CELESTIAL CANVAS */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
              
              {/* ── RESPONSIVE VIEWPORT CONTAINER ── */}
              <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[430px] md:h-[460px] lg:h-[480px] flex items-center justify-center overflow-visible">
                
                {/* 480px Coordinate Stage with Calibrated Proportional Mobile Scaling */}
                <div className="relative w-[480px] h-[480px] shrink-0 flex items-center justify-center select-none scale-[0.58] xs:scale-[0.68] sm:scale-[0.84] lg:scale-100 transition-transform duration-300 origin-center">

                  {/* ── Center Neutral Obsidian Nucleus (Tech Orbit) ── */}
                  <div className="relative z-30 flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#242424] via-[#161616] to-[#0a0a0a] border border-[#333333] shadow-[0_4px_16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)]">
                    <Layers className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white mb-0.5" />
                    <span className="text-[7px] sm:text-[7.5px] font-mono font-bold tracking-widest text-white leading-none uppercase">
                      TECH
                    </span>
                    <span className="text-[6px] sm:text-[6.5px] font-mono tracking-widest text-zinc-400 leading-none mt-0.5 uppercase">
                      ORBIT
                    </span>
                  </div>

                  {/* ── 5 Concentric Continuous Hairline Rings ── */}
                  {orbitCategories.map((orbit) => {
                    const highlighted = isOrbitHighlighted(orbit.id);
                    const nodeCount = orbit.skills.length;
                    const diameter = orbit.radius * 2;

                    return (
                      <div
                        key={orbit.id}
                        ref={(el) => (orbitRefs.current[orbit.orbitIndex - 1] = el)}
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                          highlighted ? 'opacity-100' : 'opacity-15'
                        }`}
                      >
                        {/* Continuous Razor-Sharp Hairline Ring */}
                        <div
                          className="absolute rounded-full transition-colors duration-300"
                          style={{
                            width: `${diameter}px`,
                            height: `${diameter}px`,
                            border: highlighted 
                              ? '1px solid rgba(255, 255, 255, 0.22)' 
                              : '1px solid rgba(255, 255, 255, 0.06)',
                            backgroundColor: highlighted ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                          }}
                        />

                        {/* Rotating Planetary Track (Continuous Angular Progression via --rot) */}
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            transform: 'rotate(var(--rot, 0deg))',
                            willChange: 'transform',
                          }}
                        >
                          {orbit.skills.map((skill, index) => {
                            const angle = (360 / nodeCount) * index;
                            const isNodeHovered = hoveredSkill?.skill.name === skill.name;
                            const isNodeLocked = lockedSkill?.skill.name === skill.name;

                            return (
                              <div
                                key={skill.name}
                                className="absolute pointer-events-auto"
                                style={{
                                  transform: `rotate(${angle}deg) translate(${orbit.radius}px)`,
                                }}
                              >
                                {/* Counter-rotate node to maintain upright orientation */}
                                <div
                                  className="relative flex items-center justify-center cursor-pointer group p-2 -m-2"
                                  style={{
                                    transform: `rotate(${-angle}deg) rotate(var(--counter-rot, 0deg))`,
                                    willChange: 'transform',
                                  }}
                                  onMouseEnter={() => setHoveredSkill({ skill, category: orbit })}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  onClick={() => handleNodeClick(skill, orbit)}
                                >
                                  {/* Tactile Planetary Node Disc */}
                                  <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className={`w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                                      isNodeLocked
                                        ? 'border-2 border-white bg-gradient-to-b from-[#2a2a2a] to-[#181818] shadow-[0_0_15px_rgba(255,255,255,0.25)] ring-2 ring-white/20'
                                        : isNodeHovered
                                        ? 'border border-white/80 bg-gradient-to-b from-[#242424] to-[#141414] shadow-[0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)]'
                                        : 'border border-[#282828] hover:border-[#4a4a4a] bg-gradient-to-b from-[#181818] to-[#0f0f0f] shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]'
                                    }`}
                                  >
                                    <skill.Icon
                                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                      style={{ color: skill.color }}
                                    />
                                  </motion.div>

                                  {/* Micro-Chip Floating Node Label (Clean & uncluttered on mobile) */}
                                  <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 ${
                                    isNodeLocked ? 'opacity-100' : 'opacity-0 hidden sm:group-hover:opacity-100 sm:block'
                                  }`}>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#161616] text-white border border-[#2e2e2e] shadow-xl flex items-center gap-1">
                                      {isNodeLocked && <Lock size={9} className="text-white" />}
                                      <span>{skill.name}</span>
                                    </span>
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* MOBILE DOCKED TELEMETRY CARD: Placed directly below the system canvas for instant thumb inspection */}
              <div className="block lg:hidden w-full mt-4 space-y-3">
                {/* Mobile Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  <button
                    onClick={() => setSelectedOrbit('all')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                      selectedOrbit === 'all'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-[#141414] text-zinc-400 border border-[#282828]'
                    }`}
                  >
                    All (27)
                  </button>
                  {orbitCategories.map((cat) => {
                    const active = selectedOrbit === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedOrbit(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-white text-black font-semibold shadow-sm'
                            : 'bg-[#141414] text-zinc-400 border border-[#282828]'
                        }`}
                      >
                        <Icon size={12} className={active ? 'text-black' : 'text-zinc-400'} />
                        <span>{cat.shortName}</span>
                      </button>
                    );
                  })}
                </div>
                {renderTelemetryCard()}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveSkills;
