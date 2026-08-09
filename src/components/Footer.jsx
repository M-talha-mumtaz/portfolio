import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#09090b] pt-20 pb-12 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Top Callout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-white/[0.06]">
          
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight font-[Outfit]">
              Let's create something <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                remarkable together.
              </span>
            </h2>
          </div>

          {/* Right Action Links Grid */}
          <div className="lg:col-span-5 flex flex-col justify-end gap-4">
            
            {/* Primary Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-muted/60 uppercase tracking-widest block">
                    Direct Mail
                  </span>
                  <span className="text-sm font-semibold text-text-main group-hover:text-primary transition-colors">
                    {profile.email}
                  </span>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Quick Links Row */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-xs font-semibold text-text-muted hover:text-text-main"
              >
                <FaGithub size={15} />
                GitHub
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-xs font-semibold text-text-muted hover:text-text-main"
              >
                <FaLinkedin size={15} />
                LinkedIn
              </a>

              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-xs font-semibold text-text-muted hover:text-text-main"
                >
                  <FileText size={15} />
                  CV
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Signature Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs font-medium text-text-muted/60">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <a href="#" onClick={handleScrollToTop} className="hover:opacity-70 transition-opacity">
              <img src={logo} alt="Talha" className="h-7 w-auto filter brightness-0 invert" />
            </a>
            <span className="w-px h-4 bg-white/10 hidden md:block" />
            <span className="text-text-muted/80">
              Muhammad Talha &mdash; Full Stack & Mobile Engineer
            </span>
          </div>

          {/* Location & Copyright */}
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-text-muted/40 uppercase tracking-widest text-[10px]">
              Based in Pakistan (GMT+5)
            </span>
            <span className="text-text-muted/40 uppercase tracking-widest text-[10px]">
              &copy; {year} All Rights Reserved
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
