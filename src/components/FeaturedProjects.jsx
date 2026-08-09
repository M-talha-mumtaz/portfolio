import { motion } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const ProjectCaseStudy = ({ project, index }) => {
  const isEven = index % 2 === 0;

  // Add rich descriptions/problem-solved to match the case study criteria
  const caseStudyDetails = {
    mentairo: {
      problem: "Accessible mental health support was hindered by insecure channels and poor user scheduling interfaces.",
      features: ["End-to-end encrypted video channels", "Live scheduling queues", "Secure client records dashboard"]
    },
    salon: {
      problem: "Small beauty salons lose valuable client bookings using manual text message tracking and excel entries.",
      features: ["Real-time appointment scheduler", "Stripe payment integration", "Robust administrator control hub"]
    }
  };

  const details = caseStudyDetails[project.id] || {
    problem: "Developing performant, clean solutions for modern user experience workflows.",
    features: ["Dynamic reactive components", "Optimized database layers", "Fluid design tokens"]
  };

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-16 ${isEven ? '' : 'lg:flex-row-reverse'
      }`}>

      {/* Visual Image / Case Study Card */}
      <div className="w-full lg:w-1/2 flex justify-center group relative">
        <div className="relative w-full aspect-[4/3] rounded-[2.5rem] bg-bg-surface overflow-hidden border border-border-main transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">

          {/* Inner Image Container */}
          <div className="absolute inset-0 w-full h-full">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-75"
              />
            ) : (
              <div className="w-full h-full bg-bg-surface flex items-center justify-center">
                <span className="text-text-muted font-bold tracking-widest uppercase">Coming Soon</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070b]/90 via-transparent to-transparent z-10" />
          </div>

          {/* Case Study Hover Overlay (Hidden off-screen with translate-y-full until hovered) */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#06070b]/95 backdrop-blur-md border-t border-border-main flex flex-col justify-end">
            <h4 className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <Layers size={14} /> Technical Case Overview
            </h4>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">The Problem</p>
                <p className="text-sm text-text-main font-medium">{details.problem}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Key Deliverables</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details.features.map((feat, i) => (
                    <li key={i} className="text-xs text-text-muted flex items-center gap-1.5 font-medium">
                      <CheckCircle size={12} className="text-primary shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buttons Row with clear pointer events to ensure clickability */}
            <div className="flex gap-4 relative z-40">
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-zinc-950 hover:bg-primary/90 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer z-50 pointer-events-auto shadow-md hover:scale-105 active:scale-95"
                >
                  <ExternalLink size={14} /> Live Showcase
                </a>
              )}
              <a 
                href={portfolioData.profile.socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-border-main hover:border-primary/45 text-text-main rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer z-50 pointer-events-auto shadow-sm hover:scale-105 active:scale-95"
              >
                <FaGithub size={14} /> Code repository
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Description / Content Column */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary tracking-[0.3em] uppercase">Project {index + 1}</span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-text-muted text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-bg-surface text-text-muted text-xs font-bold px-4 py-2 rounded-full border border-border-main hover:border-primary/30 hover:text-primary transition-all duration-300 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project status badge */}
        {project.status && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/80 animate-pulse" />
            {project.status}
          </div>
        )}
      </div>

    </div>
  );
};

const FeaturedProjects = () => {
  const { projects } = portfolioData;

  return (
    <section className="py-24 border-t border-border-main relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            Showcase
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            Featured Projects
          </motion.h3>
        </div>

        <div className="space-y-12">
          {projects.map((project, idx) => (
            <ProjectCaseStudy
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
