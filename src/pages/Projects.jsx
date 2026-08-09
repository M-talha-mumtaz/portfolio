import PageTransition from '../components/PageTransition';
import FeaturedProjects from '../components/FeaturedProjects';

const Projects = () => {
  return (
    <PageTransition>
      <div className="py-6 pb-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <FeaturedProjects />
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
