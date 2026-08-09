import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, tech, image, featured, link, status } = project;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass-panel rounded-[2rem] hover:neon-border transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-56 bg-dark-surface overflow-hidden flex items-center justify-center border-b border-border-main">
        {image ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10"></div>
            <img 
              src={image} 
              alt={title} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </>
        ) : (
          <div className="w-full h-full bg-dark-surface flex items-center justify-center">
            <span className="text-primary/50 font-bold tracking-widest uppercase neon-text">Coming Soon</span>
          </div>
        )}
        {featured && (
          <span className="absolute top-4 right-4 bg-primary/20 border border-primary/50 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest z-20 backdrop-blur-md">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex-grow flex flex-col bg-white/5">
        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors tracking-wide uppercase">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t) => (
            <span 
              key={t} 
              className="bg-bg-surface text-text-muted text-xs font-bold px-3 py-1.5 rounded-full border border-border-main group-hover:border-primary/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border-main flex items-center justify-between">
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:neon-text transition-all group/btn"
            >
              Open Project
              <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          ) : status ? (
            <span className="text-text-muted font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {status}
            </span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
