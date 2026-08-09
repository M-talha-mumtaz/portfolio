import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import logo from '../assets/logo.png';

const Footer = () => {
  const { socials } = portfolioData.profile;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-main overflow-hidden py-16 md:py-24">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-6 max-w-sm">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="Talha" 
              className="h-11 md:h-12 w-auto transition-all duration-300 filter brightness-0 invert"
            />
          </Link>
          <p className="text-xs font-bold text-text-muted tracking-widest leading-loose uppercase">
            Architecting elite digital experiences.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-6">
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-sm font-bold tracking-widest text-text-main uppercase">
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
          <p className="text-xs font-bold text-text-muted tracking-widest uppercase">
            &copy; {year} Built for the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
