import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { socials } = portfolioData.profile;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 overflow-hidden py-16 md:py-24">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col space-y-6 max-w-sm">
          <Link to="/" className="text-2xl font-extrabold tracking-widest text-white uppercase neon-text">
            TALHA<span className="text-primary">.DEV</span>
          </Link>
          <p className="text-xs font-bold text-gray-400 tracking-widest leading-loose uppercase">
            Architecting elite digital experiences. Cyberpunk Edition.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end space-y-6">
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm font-bold tracking-widest text-white uppercase">
            {socials.github !== '#' && (
              <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:neon-text">Github</a>
            )}
            {socials.linkedin !== '#' && (
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:neon-text">Linkedin</a>
            )}
            {socials.twitter !== '#' && (
              <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:neon-text">Twitter</a>
            )}
          </div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            &copy; {year} Built for the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
