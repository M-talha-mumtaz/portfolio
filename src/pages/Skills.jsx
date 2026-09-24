import PageTransition from '../components/PageTransition';
import InteractiveSkills from '../components/InteractiveSkills';

const Skills = () => {
  return (
    <PageTransition>
      <div className="pt-2 sm:pt-4 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <InteractiveSkills />
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;
