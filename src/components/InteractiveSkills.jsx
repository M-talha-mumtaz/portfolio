import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';
import logo from '../assets/logo.png';

const InteractiveSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Track hover state with a Ref to avoid restarting the animation loop
  const hoveredRef = useRef(null);
  useEffect(() => {
    hoveredRef.current = hoveredSkill;
  }, [hoveredSkill]);

  // Keep track of the orbital rotation angles for the 3 rings
  const [orbitalAngles, setOrbitalAngles] = useState({
    ring1: 0,
    ring2: 0,
    ring3: 0
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation frame loop for continuous orbital motion
  useEffect(() => {
    let animFrame;
    const tick = () => {
      // Pause rotation when a user is hovering a skill node to make clicking/hovering stable
      if (!hoveredRef.current) {
        setOrbitalAngles((prev) => ({
          ring1: prev.ring1 + 0.005,  // Innermost ring (Languages)
          ring2: prev.ring2 + 0.003,  // Middle ring (Frameworks)
          ring3: prev.ring3 + 0.0015, // Outermost ring (Tools & Databases)
        }));
      }
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Define skills grouped into 3 concentric orbits (Languages, Frameworks, DB & Tools)
  const ring1_languages = [
    { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E', cat: 'Languages' },
    { name: 'Dart', icon: 'SiDart', color: '#00B4AB', cat: 'Languages' },
    { name: 'Python', icon: 'SiPython', color: '#3776AB', cat: 'Languages' },
  ];

  const ring2_frameworks = [
    { name: 'React', icon: 'SiReact', color: '#61DAFB', cat: 'Frontend' },
    { name: 'Flutter', icon: 'SiFlutter', color: '#02569B', cat: 'Frontend' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4', cat: 'Frontend' },
    { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933', cat: 'Backend' },
    { name: 'Express.js', icon: 'SiExpress', color: '#AFB8C1', cat: 'Backend' },
    { name: 'FastAPI', icon: 'SiFastapi', color: '#009688', cat: 'Backend' },
  ];

  const ring3_toolsDb = [
    { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248', cat: 'Database' },
    { name: 'PostgreSQL', icon: 'DiPostgresql', color: '#4169E1', cat: 'Database' },
    { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', cat: 'Database' },
    { name: 'Git', icon: 'SiGit', color: '#F05032', cat: 'Tools' },
    { name: 'GitHub', icon: 'SiGithub', color: '#8E96A0', cat: 'Tools' },
    { name: 'Postman', icon: 'SiPostman', color: '#FF6C37', cat: 'Tools' },
    { name: 'Vite', icon: 'SiVite', color: '#646CFF', cat: 'Tools' }
  ];

  const getIconComponent = (iconName) => {
    return SiIcons[iconName] || DiIcons[iconName];
  };

  const isMobile = windowWidth < 768;

  // Perfect circular orbits (rx === ry) so that they travel exactly along drawn circles
  const r1 = isMobile ? 60 : 110;
  const r2 = isMobile ? 110 : 200;
  const r3 = isMobile ? 160 : 290;

  // Scale down the entire component visually on small phone viewports to prevent screen overflow
  const scaleFactor = windowWidth < 380 ? 0.78 : (windowWidth < 480 ? 0.88 : 1);

  const SkillNode = ({ skill, index, total, radius, currentOffset }) => {
    // Calculate current angle including the dynamic orbital offset
    const angle = (index * (2 * Math.PI) / total) + currentOffset;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const IconComponent = getIconComponent(skill.icon);
    const isHovered = hoveredSkill?.name === skill.name;

    return (
      <div
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          borderColor: isHovered ? skill.color : 'var(--border-main)',
          boxShadow: isHovered ? `0 0 20px ${skill.color}33, inset 0 0 10px ${skill.color}15` : 'none',
        }}
        onMouseEnter={() => setHoveredSkill(skill)}
        onMouseLeave={() => setHoveredSkill(null)}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-13 md:h-13 rounded-xl bg-bg-surface border flex items-center justify-center cursor-pointer transition-all duration-300 pointer-events-auto group z-30 animate-none"
      >
        <div
          style={{ color: skill.color }}
          className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
        >
          {IconComponent && <IconComponent className="w-4 h-4 md:w-6 md:h-6" />}
        </div>

        {/* Hover Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-border-main z-40">
          {skill.name}
        </div>
      </div>
    );
  };

  // Helper to place category labels on the top-right quadrant of each ring
  const LabelNode = ({ label, radius }) => {
    // 35-degree angle in top-right quadrant (negative angle in Cartesian coordinates)
    const angle = -Math.PI / 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
      <div
        style={{
          left: `calc(50% + ${x}px + 6px)`,
          top: `calc(50% + ${y}px - 10px)`
        }}
        className="absolute flex items-center gap-1 z-20 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 border border-primary/20 shrink-0" />
        <span className="text-[7px] md:text-[9px] font-bold text-text-main/80 uppercase tracking-[0.2em] whitespace-nowrap bg-bg-base/95 border border-border-main/70 rounded-md px-2 py-0.5 shadow-sm">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="py-24 border-t border-border-main relative overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            Capabilities
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            Technical Arsenal
          </motion.h3>
        </div>

        {/* Constellation Workspace Container */}
        <div
          style={{ transform: `scale(${scaleFactor})` }}
          className="w-full h-[360px] md:h-[620px] max-w-[900px] mx-auto relative overflow-visible select-none flex items-center justify-center transition-transform duration-300"
        >

          {/* Orbital Dotted Circles & Leader Lines via a single SVG to mirror template */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {/* Circle 1 (Innermost) */}
            <circle cx="50%" cy="50%" r={r1} stroke="currentColor" className="text-text-main/15 fill-none" strokeWidth="1" strokeDasharray="4 4" />
            {/* Circle 2 (Middle) */}
            <circle cx="50%" cy="50%" r={r2} stroke="currentColor" className="text-text-main/15 fill-none" strokeWidth="1" strokeDasharray="4 4" />
            {/* Circle 3 (Outermost) */}
            <circle cx="50%" cy="50%" r={r3} stroke="currentColor" className="text-text-main/15 fill-none" strokeWidth="1" strokeDasharray="4 4" />

            {/* Leader Lines and Dots (Desktop Only to keep Mobile uncluttered) */}
            {!isMobile && (
              <>
                {/* Ring 1 - Languages Dot & horizontal leader line */}
                <circle cx={`calc(50% + ${r1}px)`} cy="50%" r="3.5" className="fill-bg-base stroke-primary" strokeWidth="1.5" />
                <line x1={`calc(50% + ${r1}px)`} y1="50%" x2={`calc(50% + ${r1}px + 24px)`} y2="50%" stroke="currentColor" className="text-text-muted/40" strokeWidth="1" strokeDasharray="2 2" />

                {/* Ring 2 - Frameworks Dot & diagonal leader line */}
                <circle cx={`calc(50% + ${r2 * 0.966}px)`} cy={`calc(50% - ${r2 * 0.259}px)`} r="3.5" className="fill-bg-base stroke-primary" strokeWidth="1.5" />
                <line
                  x1={`calc(50% + ${r2 * 0.966}px)`}
                  y1={`calc(50% - ${r2 * 0.259}px)`}
                  x2={`calc(50% + ${r2 * 0.966}px + 24px)`}
                  y2={`calc(50% - ${r2 * 0.259}px - 10px)`}
                  stroke="currentColor"
                  className="text-text-muted/40"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Ring 3 - Tools Dot & diagonal leader line */}
                <circle cx={`calc(50% + ${r3 * 0.866}px)`} cy={`calc(50% - ${r3 * 0.5}px)`} r="3.5" className="fill-bg-base stroke-primary" strokeWidth="1.5" />
                <line
                  x1={`calc(50% + ${r3 * 0.866}px)`}
                  y1={`calc(50% - ${r3 * 0.5}px)`}
                  x2={`calc(50% + ${r3 * 0.866}px + 24px)`}
                  y2={`calc(50% - ${r3 * 0.5}px - 15px)`}
                  stroke="currentColor"
                  className="text-text-muted/40"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </>
            )}
          </svg>

          {/* Dotted Ring Labels (Desktop Only to match precise leader layout) */}
          {!isMobile && (
            <>
              {/* Ring 1 - Languages */}
              <div
                style={{ left: `calc(50% + ${r1}px + 28px)`, top: '50%', transform: 'translateY(-50%)' }}
                className="absolute text-[10px] font-bold text-text-muted/70 uppercase tracking-[0.2em] pointer-events-none whitespace-nowrap bg-bg-base/90 border border-border-main/40 rounded-md px-2.5 py-0.5 shadow-sm"
              >
                Languages
              </div>

              {/* Ring 2 - Frameworks */}
              <div
                style={{ left: `calc(50% + ${r2 * 0.966}px + 28px)`, top: `calc(50% - ${r2 * 0.259}px - 10px)`, transform: 'translateY(-50%)' }}
                className="absolute text-[10px] font-bold text-text-muted/70 uppercase tracking-[0.2em] pointer-events-none whitespace-nowrap bg-bg-base/90 border border-border-main/40 rounded-md px-2.5 py-0.5 shadow-sm"
              >
                Frameworks
              </div>

              {/* Ring 3 - Tools & DBs */}
              <div
                style={{ left: `calc(50% + ${r3 * 0.866}px + 28px)`, top: `calc(50% - ${r3 * 0.5}px - 15px)`, transform: 'translateY(-50%)' }}
                className="absolute text-[10px] font-bold text-text-muted/70 uppercase tracking-[0.2em] pointer-events-none whitespace-nowrap bg-bg-base/90 border border-border-main/40 rounded-md px-2.5 py-0.5 shadow-sm"
              >
                Tools & DBs
              </div>
            </>
          )}

          {/* Central Chip Display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none w-24 h-24 md:w-36 md:h-36">

            {/* Central Glow (Flashed to active brand color on hover) */}
            <div
              style={{
                backgroundColor: hoveredSkill ? `${hoveredSkill.color}15` : 'var(--color-primary-light)',
              }}
              className="absolute w-24 h-24 md:w-36 md:h-36 blur-xl rounded-full animate-pulse transition-colors duration-300"
            />

            {/* Central Silicon Graphic / Logo */}
            <img
              src={logo}
              alt="Talha Logo"
              className="w-18 h-18 md:w-28 md:h-28 transition-all duration-300 object-contain filter brightness-0 invert"
            />

            {/* Hover Text Output */}
            <div className="mt-1 text-center select-none">
              <h4
                style={{
                  color: hoveredSkill ? hoveredSkill.color : 'var(--text-main)',
                }}
                className="text-[10px] md:text-sm font-black transition-colors duration-300 whitespace-nowrap uppercase tracking-widest"
              >
                {hoveredSkill ? hoveredSkill.name : 'Talha'}
              </h4>
              <span className="text-[7px] md:text-[8px] font-bold text-text-muted uppercase tracking-[0.15em] block mt-0.5">
                {hoveredSkill ? hoveredSkill.cat : 'System Online'}
              </span>
            </div>
          </div>

          {/* Ring 1 - Languages Nodes */}
          {ring1_languages.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              total={ring1_languages.length}
              radius={r1}
              currentOffset={orbitalAngles.ring1}
            />
          ))}

          {/* Ring 2 - Frameworks Nodes */}
          {ring2_frameworks.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              total={ring2_frameworks.length}
              radius={r2}
              currentOffset={orbitalAngles.ring2}
            />
          ))}

          {/* Ring 3 - Tools & DBs Nodes */}
          {ring3_toolsDb.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              total={ring3_toolsDb.length}
              radius={r3}
              currentOffset={orbitalAngles.ring3}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default InteractiveSkills;
