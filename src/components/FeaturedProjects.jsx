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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-[16/10] md:aspect-[16/8] rounded-2xl md:rounded-3xl overflow-hidden group cursor-default project-sweep"
    >
      {/* Background Image */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 filter brightness-[0.4] group-hover:brightness-[0.3]"
        />
      ) : (
        <div className="absolute inset-0 bg-bg-surface flex items-center justify-center">
          <span className="text-text-muted font-bold tracking-widest uppercase text-sm">Coming Soon</span>
        </div>
      )}

      {/* Cinematic Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent z-10" />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 lg:p-14">
        
        {/* Project Number */}
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.35em] mb-3">
          Project {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-3 font-[Outfit]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-text-muted font-medium leading-relaxed max-w-2xl mb-4">
          {project.description}
        </p>

        {/* Problem & Features */}
        <div className="max-w-2xl mb-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out hidden md:block">
          <p className="text-xs text-text-muted/70 mb-2">
            <span className="text-primary font-bold uppercase tracking-wider text-[10px]">Problem: </span>
            {details.problem}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {details.features.map((feat, i) => (
              <span key={i} className="text-[11px] text-text-muted/60 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Badges + Links Row */}
        <div className="flex flex-wrap items-center gap-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] md:text-[11px] font-semibold text-text-muted/80 uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/8 bg-white/3"
            >
              {tech}
            </span>
          ))}

          <div className="flex items-center gap-3 ml-auto">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-text-main hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Live <ArrowUpRight size={13} />
              </a>
            )}
            <a
              href={portfolioData.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              Code <FaGithub size={13} />
            </a>
          </div>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-6 right-6 md:top-10 md:right-10 inline-flex items-center gap-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
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
    <section className="py-24 md:py-32 relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
          >
            Work
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Project Cards */}
        <div className="space-y-8 md:space-y-12">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
