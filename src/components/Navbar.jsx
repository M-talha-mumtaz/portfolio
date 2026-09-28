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

  // Robust scroll spy & navbar background transformation
  useEffect(() => {
    const sections = ['contact', 'skills', 'projects', 'experience', 'about', 'hero'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // When reaching near the bottom of the page, activate contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Scan sections from bottom to top against the trigger point (scrollY + navbar/header offset)
      const triggerPoint = scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (triggerPoint >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Silky smooth kinetic scroll function with cubic easing
  const smoothScrollTo = (targetY, duration = 650) => {
    if (window._navScrollAnim) {
      cancelAnimationFrame(window._navScrollAnim);
      window._navScrollAnim = null;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const difference = targetY - startY;
    if (Math.abs(difference) < 4) return;

    const startTime = performance.now();

    // Silky smooth Apple-style cubic easing (accelerates smoothly, decelerates luxuriously)
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const cancelScroll = () => {
      if (window._navScrollAnim) {
        cancelAnimationFrame(window._navScrollAnim);
        window._navScrollAnim = null;
      }
      window.removeEventListener('wheel', cancelScroll);
      window.removeEventListener('touchstart', cancelScroll);
    };

    window.addEventListener('wheel', cancelScroll, { passive: true });
    window.addEventListener('touchstart', cancelScroll, { passive: true });

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        window._navScrollAnim = requestAnimationFrame(step);
      } else {
        window._navScrollAnim = null;
        window.removeEventListener('wheel', cancelScroll);
        window.removeEventListener('touchstart', cancelScroll);
      }
    };

    window._navScrollAnim = requestAnimationFrame(step);
  };

  // Smooth scroll helper for both desktop and mobile drawer
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    document.body.style.overflow = 'unset';
    setIsOpen(false);

    if (id === 'hero') {
      window.history.pushState(null, '', '/');
      smoothScrollTo(0, 650);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, '', `#${id}`);
      const navbarHeight = 64;
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = Math.max(0, elementRect.top + currentScrollY - navbarHeight);
      smoothScrollTo(targetY, 650);
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    document.body.style.overflow = 'unset';
    setIsOpen(false);
    window.history.pushState(null, '', '/');
    setActiveSection('hero');
    smoothScrollTo(0, 650);
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -14, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.96, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              style={{ transformOrigin: 'top' }}
              className="fixed top-[calc(2px+3.5rem)] inset-x-0 z-50 md:hidden px-3 sm:px-5"
            >
              <div className="bg-[#0c0c0f]/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.95)]">
                {/* Links */}
                <div className="p-3.5 sm:p-4 flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const active = isLinkActive(link.path);
                    return (
                      <motion.a
                        key={link.path}
                        href={`#${link.path}`}
                        onClick={(e) => handleScrollTo(e, link.path)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6, transition: { duration: 0.15 } }}
                        transition={{ delay: 0.02 + i * 0.035, duration: 0.22 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none ${
                          active
                            ? 'text-white bg-white/[0.08] border-l-2 border-primary shadow-[inset_0_0_12px_rgba(255,255,255,0.04)]'
                            : 'text-white/50 hover:text-white/90 hover:bg-white/[0.03] border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`text-[10px] font-mono tabular-nums transition-colors duration-200 ${
                            active ? 'text-primary' : 'text-zinc-500'
                          }`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{link.name}</span>
                        </div>
                        {active && (
                          <motion.div
                            layoutId="drawerActiveIndicator"
                            className="flex items-center gap-1.5"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Active</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(200,200,210,0.9)] animate-pulse" />
                          </motion.div>
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
