import { portfolioData } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <PageTransition>
      <div className="py-12 md:py-20 pb-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-widest neon-text">
              Projects
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              A collection of my recent work, showcasing my skills in modern web development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
