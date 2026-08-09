import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiDart,
  SiPython,
  SiHtml5,
  SiReact,
  SiFlutter,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVite,
  SiPostman,
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';

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

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const categories = [
  {
    title: 'Languages & Core',
    subtitle: 'Foundation programming languages',
    skills: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', tag: 'ES6+' },
      { name: 'Dart', Icon: SiDart, color: '#00B4AB', tag: 'OOP' },
      { name: 'Python', Icon: SiPython, color: '#3776AB', tag: 'Scripting' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', tag: 'Semantic' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6', tag: 'Modern UI' },
    ],
  },
  {
    title: 'Frameworks & Systems',
    subtitle: 'Web & mobile execution engines',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB', tag: 'Frontend' },
      { name: 'Flutter', Icon: SiFlutter, color: '#02569B', tag: 'Cross-Platform' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', tag: 'Runtime' },
      { name: 'Express.js', Icon: SiExpress, color: '#AFB8C1', tag: 'REST APIs' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688', tag: 'Async Microservices' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4', tag: 'Styling' },
    ],
  },
  {
    title: 'Databases & Dev Ecosystem',
    subtitle: 'Persistence, tooling & workflow',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', tag: 'NoSQL' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', tag: 'Relational SQL' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28', tag: 'BaaS' },
      { name: 'Git', Icon: SiGit, color: '#F05032', tag: 'VCS' },
      { name: 'GitHub', Icon: SiGithub, color: '#8E96A0', tag: 'CI/CD' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF', tag: 'Bundler' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', tag: 'API Test' },
    ],
  },
];

const SkillCard = ({ skill }) => {
  const IconComponent = skill.Icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-[#121215]/80 hover:bg-[#18181e] border border-white/[0.07] hover:border-white/[0.18] rounded-2xl p-5 overflow-hidden transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-default flex flex-col justify-between"
    >
      {/* Brand Ambient Radial Glow on Hover */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: skill.color }}
      />

      {/* Top Row: Icon Container + Tag */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div
          className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner"
          style={{ '--brand-color': skill.color }}
        >
          {IconComponent && (
            <IconComponent
              className="w-5 h-5 text-text-muted transition-colors duration-300 group-hover:text-[var(--brand-color)] filter drop-shadow"
            />
          )}
        </div>

        <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted/50 px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.02] group-hover:text-text-muted transition-colors">
          {skill.tag}
        </span>
      </div>

      {/* Bottom Row: Name */}
      <div className="relative z-10 mt-2">
        <h4 className="text-base font-bold text-text-main group-hover:text-primary transition-colors duration-300 font-[Outfit]">
          {skill.name}
        </h4>
      </div>

      {/* Subtle Bottom Accent Line on Hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
      />
    </motion.div>
  );
};

const InteractiveSkills = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="skills">
      
      {/* Subtle Background Glow Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-14 md:mb-18">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
          >
            Tech Stack
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Skill Category Blocks */}
        <div className="space-y-16 md:space-y-20">
          {categories.map((cat, catIdx) => (
            <div key={cat.title}>
              {/* Category Title & Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="mb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-1 border-b border-white/[0.05] pb-3"
              >
                <h3 className="text-lg md:text-xl font-bold text-text-main tracking-tight font-[Outfit]">
                  {cat.title}
                </h3>
                <span className="text-xs font-medium text-text-muted/50 tracking-wide">
                  {cat.subtitle}
                </span>
              </motion.div>

              {/* Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
              >
                {cat.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveSkills;
