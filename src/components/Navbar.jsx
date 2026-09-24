import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import { portfolioData } from '../data/portfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // IntersectionObserver to dynamically highlight navbar links during scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
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
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
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

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: 'hero' },
    { name: 'About', path: 'about' },
    { name: 'Experience', path: 'experience' },
    { name: 'Projects', path: 'projects' },
    { name: 'Skills', path: 'skills' },
    { name: 'Contact', path: 'contact' },
  ];

  const isLinkActive = (path) => activeSection === path;

  return (
    <>
      {/* ─── The Ledge: Full-Width Flush Navigation ─── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#09090b]/92 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        {/* Top Accent Gradient Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        {/* Nav Content Strip */}
        <nav className="relative w-full px-5 sm:px-8 md:px-10 lg:px-14 flex items-center justify-between h-14 sm:h-16">
          {/* ── Left: Logo ── */}
          <a
            href="#"
            onClick={handleScrollToTop}
            className="group flex items-center shrink-0 hover:opacity-80 transition-opacity duration-300 cursor-pointer select-none z-10"
          >
            <img
              src={logo}
              alt="Talha Mumtaz"
              loading="eager"
              decoding="async"
              className={`w-auto filter brightness-0 invert transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(200,200,210,0.65)] ${
                isScrolled ? 'h-6 sm:h-7' : 'h-7 sm:h-8'
              }`}
            />
          </a>

          {/* ── Center: Navigation Links with Sliding Underline (Exact Midpoint) ── */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            {navLinks.map((link, i) => {
              const active = isLinkActive(link.path);
              return (
                <Fragment key={link.path}>
                  {i > 0 && (
                    <span className="text-white/[0.12] mx-1 text-[4px] select-none">●</span>
                  )}
                  <a
                    href={`#${link.path}`}
                    onClick={(e) => handleScrollTo(e, link.path)}
                    className={`relative px-3 sm:px-3.5 lg:px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-300 cursor-pointer select-none ${
                      active ? 'text-white' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="ledgeActiveUnderline"
                        className="absolute bottom-0 left-3 right-3 sm:left-3.5 sm:right-3.5 lg:left-4 lg:right-4 h-[2px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}
                  </a>
                </Fragment>
              );
            })}
          </div>

          {/* ── Right: Social + CTA ── */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6 shrink-0 z-10">
            {/* Compact Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-white/30 hover:text-white/80 transition-colors duration-300 cursor-pointer p-1"
                title="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={portfolioData.profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/30 hover:text-primary transition-colors duration-300 cursor-pointer p-1"
                title="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
            </div>

            {/* Thin divider */}
            <div className="w-px h-4 bg-white/10" />

            {/* Text CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="group inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-primary hover:text-white transition-colors duration-300 cursor-pointer select-none"
            >
              <span>Let's Talk</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? (
              <X size={22} />
            ) : (
              <div className="flex flex-col items-end gap-[5px]">
                <span className="block w-5 h-[1.5px] bg-current rounded-full" />
                <span className="block w-3.5 h-[1.5px] bg-primary rounded-full" />
                <span className="block w-5 h-[1.5px] bg-current rounded-full" />
              </div>
            )}
          </button>
        </nav>
      </header>

      {/* ─── Mobile Dropdown Panel (Curtain from under nav) ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.97 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              style={{ transformOrigin: 'top' }}
              className="fixed top-[calc(2px+3.5rem)] inset-x-0 z-50 md:hidden px-3 sm:px-5"
            >
              <div className="bg-[#0c0c0f]/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
                {/* Links */}
                <div className="p-4 flex flex-col gap-0.5">
                  {navLinks.map((link, i) => {
                    const active = isLinkActive(link.path);
                    return (
                      <motion.a
                        key={link.path}
                        href={`#${link.path}`}
                        onClick={(e) => handleScrollTo(e, link.path)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 + i * 0.04, duration: 0.25 }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                          active
                            ? 'text-white bg-white/[0.05] border-l-2 border-primary'
                            : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02] border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-[10px] font-mono text-primary/50 w-4 tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{link.name}</span>
                        </div>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(200,200,210,0.8)]" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Bottom: Social + CTA */}
                <div className="px-4 pb-4 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={portfolioData.profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/30 hover:text-white/70 transition-colors"
                    >
                      <FaGithub size={16} />
                    </a>
                    <a
                      href={portfolioData.profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/30 hover:text-primary transition-colors"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, 'contact')}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Let's Talk</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
