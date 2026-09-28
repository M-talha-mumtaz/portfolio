import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const caseStudyDetails = {
  mentairo: {
    problem: 'Accessible mental health support was hindered by insecure channels and poor user scheduling interfaces.',
    features: ['End-to-end encrypted video channels', 'Live scheduling queues', 'Secure client records dashboard'],
  },
  salon: {
    problem: 'Small beauty salons lose valuable client bookings using manual text message tracking and excel entries.',
    features: ['Real-time appointment scheduler', 'Stripe payment integration', 'Robust administrator control hub'],
  },
  'stock-chatbot': {
    problem: 'Retail investors and traders lack an intuitive assistant to synthesize natural language market queries with quantitative forecasting and live price telemetry.',
    features: ['Conversational financial NLP engine (Qwen 2.5)', 'XGBoost directional next-day return forecasting', 'Interactive 2-year candlestick chart telemetry'],
  },
};

const ProjectCard = ({ project, index, isSpanFull }) => {
  const details = caseStudyDetails[project.id] || {
    problem: 'Developing performant, clean solutions for modern user experience workflows.',
    features: ['Dynamic reactive components', 'Optimized database layers', 'Fluid design tokens'],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full min-h-[420px] sm:min-h-[450px] lg:min-h-[470px] rounded-2xl md:rounded-3xl overflow-hidden group cursor-default project-sweep border border-white/10 shadow-2xl flex flex-col justify-end ${
        isSpanFull ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Background Image */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.02] ${
            project.id === 'stock-chatbot'
              ? 'object-top brightness-[0.68] group-hover:brightness-[0.8]'
              : 'object-center brightness-[0.45] group-hover:brightness-[0.55]'
          }`}
        />
      ) : (
        <div className="absolute inset-0 bg-bg-surface flex items-center justify-center">
          <span className="text-text-muted font-bold tracking-widest uppercase text-sm">Coming Soon</span>
        </div>
      )}

      {/* Cinematic Bottom Gradient Overlay */}
      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${
          project.id === 'stock-chatbot'
            ? 'bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-[#09090b]/10'
            : 'bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent'
        }`} 
      />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col justify-end p-6 sm:p-7 md:p-8 w-full h-full">
        
        {/* Project Number */}
        <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.35em] mb-2">
          Project {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-main tracking-tight leading-tight mb-2 sm:mb-3 font-display">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text-muted/90 font-medium leading-relaxed max-w-xl mb-3 sm:mb-4">
          {project.description}
        </p>

        {/* Problem & Features */}
        <div className="max-w-xl mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out hidden sm:block">
          <p className="text-xs text-text-muted/80 mb-2">
            <span className="text-primary font-bold uppercase tracking-wider text-[10px]">Problem: </span>
            {details.problem}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {details.features.map((feat, i) => (
              <span key={i} className="text-[11px] text-text-muted/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Badges + Links Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-[11px] font-semibold text-text-muted/90 uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary transition-colors duration-300 cursor-pointer bg-white/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-full border border-white/15"
              >
                Live <ArrowUpRight size={13} />
              </a>
            )}
            <a
              href={project.github || portfolioData.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-text-main transition-colors duration-300 cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10"
            >
              Code <FaGithub size={13} />
            </a>
          </div>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-text-muted uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-secondary/80 animate-pulse" />
            {project.status}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const { projects } = portfolioData;

  return (
    <section className="pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24 relative overflow-hidden scroll-mt-6 sm:scroll-mt-8" id="projects">
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold text-primary uppercase tracking-[0.35em]"
          >
            Selected Works
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-24 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => {
            const isSpanFull = projects.length % 2 !== 0 && idx === projects.length - 1;
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                isSpanFull={isSpanFull}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
