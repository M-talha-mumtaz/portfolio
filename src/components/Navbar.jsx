import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { portfolioData } from '../data/portfolioData';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed inset-x-0 top-4 md:top-6 z-50 px-4 md:px-12 lg:px-24 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass-panel rounded-[2rem] h-16 md:h-20 flex items-center justify-between px-4 md:px-12 pointer-events-auto transition-all duration-300 hover:neon-border hover:border-primary/50 relative z-50">
        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Talha.dev Logo" className="h-6 sm:h-8 md:h-10 w-auto filter brightness-200 invert" />
          <span className="text-lg md:text-xl font-bold tracking-tight text-white">
            Talha<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-sm md:text-base font-medium transition-all hover:text-primary ${isActive(link.path) ? 'text-primary neon-text' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-2xl z-40 md:hidden flex flex-col items-center justify-center pointer-events-auto"
            style={{ height: '100vh' }}
          >
            <div className="flex flex-col items-center gap-4 md:gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl md:text-3xl font-bold tracking-widest uppercase transition-all ${isActive(link.path) ? 'text-primary neon-text' : 'text-white hover:text-primary'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <p className="text-xs font-bold text-gray-500 tracking-[0.3em] uppercase">Connect with me</p>
              <div className="flex gap-6 text-white/50">
                <a href={portfolioData.profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href={portfolioData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
              <div className="h-[1px] w-12 bg-primary/30"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
