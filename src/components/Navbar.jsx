import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed w-full top-4 md:top-6 z-50 px-4 md:px-12 lg:px-24 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass-panel rounded-[2rem] h-16 md:h-20 flex items-center justify-between px-4 sm:px-6 md:px-12 pointer-events-auto transition-all duration-300 hover:neon-border hover:border-primary/50">
        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Talha.dev Logo" className="h-6 sm:h-8 md:h-10 w-auto filter brightness-200 invert" />
          <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white">
            Talha<span className="text-primary">.dev</span>
          </span>
        </Link>
        <div className="flex gap-3 sm:gap-4 md:gap-8">
          <Link 
            to="/" 
            className={`text-xs sm:text-sm md:text-base font-medium transition-all hover:text-primary ${isActive('/') ? 'text-primary neon-text' : 'text-gray-300'}`}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={`text-xs sm:text-sm md:text-base font-medium transition-all hover:text-primary ${isActive('/projects') ? 'text-primary neon-text' : 'text-gray-300'}`}
          >
            Projects
          </Link>
          <Link 
            to="/skills" 
            className={`text-xs sm:text-sm md:text-base font-medium transition-all hover:text-primary ${isActive('/skills') ? 'text-primary neon-text' : 'text-gray-300'}`}
          >
            Skills
          </Link>
          <Link 
            to="/contact" 
            className={`text-xs sm:text-sm md:text-base font-medium transition-all hover:text-primary ${isActive('/contact') ? 'text-primary neon-text' : 'text-gray-300'}`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
