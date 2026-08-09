import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { portfolioData } from '../data/portfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // IntersectionObserver to dynamically highlight navbar links during scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px',
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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: 'hero' },
    { name: 'Projects', path: 'projects' },
    { name: 'Skills', path: 'skills' },
    { name: 'Contact', path: 'contact' },
  ];

  const isLinkActive = (path) => {
    if (path === 'hero') return activeSection === 'hero' || activeSection === 'about';
    return activeSection === path;
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 w-full flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500 ease-out ${
          isScrolled
            ? 'h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5'
            : 'h-18 md:h-20 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left: Logo */}
        <a
          href="#"
          onClick={handleScrollToTop}
          className="flex items-center hover:opacity-70 transition-opacity duration-300 shrink-0"
        >
          <img
            src={logo}
            alt="Talha"
            className={`w-auto transition-all duration-500 filter brightness-0 invert ${
              isScrolled ? 'h-7' : 'h-9 md:h-10'
            }`}
          />
        </a>

        {/* Center: Desktop Links with animated underline */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                onClick={(e) => handleScrollTo(e, link.path)}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 cursor-pointer select-none ${
                  active ? 'text-text-main' : 'text-text-muted hover:text-text-main'
                }`}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right: Socials + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={portfolioData.profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-text-muted hover:text-text-main transition-colors duration-300"
            title="GitHub"
          >
            <FaGithub size={17} />
          </a>
          <a
            href={portfolioData.profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-text-muted hover:text-text-main transition-colors duration-300"
            title="LinkedIn"
          >
            <FaLinkedin size={17} />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold uppercase tracking-widest text-text-main border border-white/10 rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer ml-1"
          >
            Let's Talk
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-main hover:text-primary transition-colors z-50 shrink-0 cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <div className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[1.5px] bg-current" />
              <span className="block w-3.5 h-[1.5px] bg-current" />
            </div>
          )}
        </button>
      </nav>

      {/* Mobile Menu — Right Slide Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#09090b]/95 backdrop-blur-2xl z-50 md:hidden flex flex-col border-l border-white/5"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 h-18 border-b border-white/5">
                <span className="text-xs font-bold text-text-muted uppercase tracking-[0.3em]">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Panel Links */}
              <div className="flex flex-col px-6 pt-8 gap-1">
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link.path);
                  return (
                    <motion.a
                      key={link.path}
                      href={`#${link.path}`}
                      onClick={(e) => handleScrollTo(e, link.path)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`py-3 text-lg font-semibold tracking-wide transition-colors cursor-pointer ${
                        active ? 'text-primary' : 'text-text-main hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Panel Footer */}
              <div className="mt-auto px-6 pb-8 space-y-6">
                <div className="h-px bg-white/5" />
                <div className="flex items-center gap-4">
                  <a href={portfolioData.profile.socials.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary transition-colors">
                    <FaGithub size={18} />
                  </a>
                  <a href={portfolioData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary transition-colors">
                    <FaLinkedin size={18} />
                  </a>
                </div>
                <p className="text-[10px] font-medium text-text-muted/50 uppercase tracking-widest">
                  © {new Date().getFullYear()} Muhammad Talha
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
