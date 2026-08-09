import PageTransition from '../components/PageTransition';
import InteractiveSkills from '../components/InteractiveSkills';

const Skills = () => {
  return (
    <PageTransition>
      <div className="py-6 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <InteractiveSkills />
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;
