import { portfolioData } from '../data/portfolioData';
import PageTransition from '../components/PageTransition';

// Import custom subcomponents
import HeroEditorial from '../components/HeroEditorial';
import FeaturedProjects from '../components/FeaturedProjects';
import InteractiveSkills from '../components/InteractiveSkills';
import ContactTerminal from '../components/ContactTerminal';

const Home = () => {
  return (
    <PageTransition>
      <div className="pb-32">

        {/* HERO SECTION */}
        <HeroEditorial />


        {/* BIOGRAPHY SECTION (About Me) */}
        <section className="py-24 border-t border-border-main" id="about">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold text-primary tracking-[0.3em] uppercase">Biography</span>
              <h3 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight mt-2">
                Who I Am
              </h3>
            </div>
            <div className="lg:col-span-8 space-y-6 text-text-muted text-base md:text-lg leading-relaxed font-medium">
              <p>
                I am a full stack software engineer specialized in building robust, interactive applications that merge sleek visuals with reliable backend architectures. With core expertise in the <strong>MERN stack</strong> and cross-platform mobile environments using <strong>Flutter and Dart</strong>, I construct responsive, highly optimized systems.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <FeaturedProjects />

        {/* TECHNICAL SKILLS ARSENAL */}
        <InteractiveSkills />

        {/* COMMAND TERMINAL CONTACT */}
        <ContactTerminal />

      </div>
    </PageTransition>
  );
};

export default Home;
