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
};

const ProjectCard = ({ project, index }) => {
  const details = caseStudyDetails[project.id] || {
    problem: 'Developing performant, clean solutions for modern user experience workflows.',
    features: ['Dynamic reactive components', 'Optimized database layers', 'Fluid design tokens'],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px] md:aspect-[16/8] rounded-2xl md:rounded-3xl overflow-hidden group cursor-default project-sweep border border-white/10 shadow-2xl flex flex-col justify-end"
    >
      {/* Background Image */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 filter brightness-[0.35] group-hover:brightness-[0.25]"
        />
      ) : (
        <div className="absolute inset-0 bg-bg-surface flex items-center justify-center">
          <span className="text-text-muted font-bold tracking-widest uppercase text-sm">Coming Soon</span>
        </div>
      )}

      {/* Cinematic Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16 w-full h-full">
        
        {/* Project Number */}
        <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.35em] mb-2 sm:mb-3">
          Project {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-2 sm:mb-4 font-display">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base lg:text-lg text-text-muted/90 font-medium leading-relaxed max-w-3xl mb-4 sm:mb-6">
          {project.description}
        </p>

        {/* Problem & Features */}
        <div className="max-w-3xl mb-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out hidden md:block">
          <p className="text-xs text-text-muted/80 mb-2.5">
            <span className="text-primary font-bold uppercase tracking-wider text-[10px]">Problem: </span>
            {details.problem}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {details.features.map((feat, i) => (
              <span key={i} className="text-[11px] text-text-muted/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Badges + Links Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-[11px] font-semibold text-text-muted/90 uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-main hover:text-primary transition-colors duration-300 cursor-pointer bg-white/10 hover:bg-primary/20 px-4 py-2 rounded-full border border-white/15"
              >
                Live <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href={portfolioData.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors duration-300 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
            >
              Code <FaGithub size={14} />
            </a>
          </div>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6 md:top-10 md:right-10 inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-text-muted uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
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
    <section className="py-28 md:py-40 lg:py-48 relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
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

        {/* Project Cards - Generous Vertical Gap */}
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
