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
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track currently active section in the viewport
  const [activeSection, setActiveSection] = useState('hero');

  // IntersectionObserver to dynamically highlight navbar links during scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Trigger when section occupies viewport center
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Listen to scroll to transform navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
    setActiveSection('hero');
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: 'hero' },
    { name: 'Projects', path: 'projects' },
    { name: 'Skills', path: 'skills' },
    { name: 'Contact', path: 'contact' },
  ];

  const isLinkActive = (path) => {
    if (path === 'hero') {
      return activeSection === 'hero' || activeSection === 'about';
    }
    return activeSection === path;
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full flex justify-center pointer-events-none transition-all duration-500 py-4 md:py-6">
      <nav className={`glass-panel flex items-center justify-between pointer-events-auto transition-all duration-500 ease-in-out relative z-50
        ${isScrolled 
          ? 'rounded-full h-12 md:h-14 px-6 w-[92%] max-w-xl md:max-w-2xl border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-bg-surface/85 backdrop-blur-md' 
          : 'rounded-[2rem] h-16 md:h-20 px-4 md:px-12 w-[90%] max-w-7xl border-border-main bg-bg-surface/25'
        }`}
      >
        {/* Full Logo - Fades out & shrinks when scrolled */}
        <div className={`transition-all duration-500 flex items-center overflow-hidden shrink-0
          ${isScrolled ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100 mr-4'}`}
        >
          <a href="#" onClick={handleScrollToTop} className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="Talha" 
              className="h-11 md:h-12 w-auto transition-all duration-300 filter brightness-0 invert"
            />
          </a>
        </div>

        {/* Small Icon Logo (Appears only when scrolled) */}
        <div className={`transition-all duration-500 flex items-center overflow-hidden shrink-0
          ${isScrolled ? 'w-auto opacity-100 mr-2 md:mr-4' : 'w-0 opacity-0 pointer-events-none'}`}
        >
          <a href="#" onClick={handleScrollToTop} className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="Talha" 
              className="h-8 md:h-9 w-auto transition-all duration-300 filter brightness-0 invert"
            />
          </a>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex gap-6 lg:gap-8 items-center justify-center flex-grow transition-all duration-500
          ${isScrolled ? 'md:gap-4' : 'md:gap-8'}`}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <a 
                key={link.path}
                href={`#${link.path}`}
                onClick={(e) => handleScrollTo(e, link.path)}
                className={`relative px-4 py-1.5 rounded-full font-semibold transition-colors duration-300 capitalize cursor-pointer z-10 select-none
                  ${active ? 'text-primary' : 'text-text-muted hover:text-text-main'}
                  ${isScrolled ? 'text-[11px] px-3 py-1' : 'text-xs md:text-sm'}`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavBgDesktop"
                    className="absolute inset-0 bg-primary/15 border border-primary/20 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop Social Icons (Balanced on the right side when scrolled) */}
        <div className={`hidden md:flex items-center transition-all duration-500 shrink-0
          ${isScrolled ? 'gap-2 ml-2' : 'gap-4 ml-4'}`}
        >
          <a 
            href={portfolioData.profile.socials.github} 
            target="_blank" 
            rel="noreferrer" 
            className="p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="GitHub"
          >
            <FaGithub size={isScrolled ? 16 : 20} />
          </a>
          <a 
            href={portfolioData.profile.socials.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="LinkedIn"
          >
            <FaLinkedin size={isScrolled ? 16 : 20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-main hover:text-primary transition-colors z-50 shrink-0 ml-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 bg-bg-base/95 backdrop-blur-2xl z-40 md:hidden flex flex-col items-center justify-center pointer-events-auto"
            style={{ height: '100vh' }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <a
                      href={`#${link.path}`}
                      onClick={(e) => handleScrollTo(e, link.path)}
                      className={`relative px-8 py-2.5 rounded-full text-xl font-bold tracking-widest capitalize transition-all cursor-pointer block text-center z-10
                        ${active ? 'text-primary' : 'text-text-main hover:text-primary'}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeNavBgMobile"
                          className="absolute inset-0 bg-primary/10 dark:bg-primary/15 border border-primary/25 dark:border-primary/20 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </a>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <p className="text-xs font-bold text-text-muted tracking-[0.3em] uppercase">Connect with me</p>
              <div className="flex gap-6 text-text-muted">
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
