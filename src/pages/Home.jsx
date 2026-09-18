import PageTransition from '../components/PageTransition';

// Import custom subcomponents
import HeroEditorial from '../components/HeroEditorial';
import BiographySection from '../components/BiographySection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import FeaturedProjects from '../components/FeaturedProjects';
import InteractiveSkills from '../components/InteractiveSkills';
import ContactTerminal from '../components/ContactTerminal';

const Home = () => {
  return (
    <PageTransition>
      <div className="pb-24">

        {/* HERO SECTION */}
        <HeroEditorial />

        {/* BIOGRAPHY SECTION */}
        <BiographySection />

        {/* EXPERIENCE TIMELINE */}
        <ExperienceTimeline />

        {/* FEATURED PROJECTS */}
        <FeaturedProjects />

        {/* TECHNICAL SKILLS */}
        <InteractiveSkills />

        {/* CONTACT */}
        <ContactTerminal />

      </div>
    </PageTransition>
  );
};

export default Home;
