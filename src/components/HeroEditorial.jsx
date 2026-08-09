import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Send, FolderGit2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import pfpImage from '../assets/pfp.png';

const firstNameLetters = "MUHAMMAD".split("");
const lastNameLetters = "TALHA".split("");

const nameContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.55,
    },
  },
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 35, 
    filter: "blur(10px)",
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

const HeroEditorial = () => {
  const { profile } = portfolioData;
  const containerRef = useRef(null);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden select-none bg-[#09090b]"
      id="hero"
    >
      {/* Subtle Full-Canvas Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.12)_0%,rgba(9,9,11,0)_70%)] pointer-events-none z-0" />

      {/* CENTRAL HERO CANVAS */}
      <div className="relative w-full max-w-7xl mx-auto flex-grow flex flex-col justify-between items-center z-10 my-auto">
        
        {/* LAYER 1: MASSIVE NAME BEHIND SUBJECT WITH LETTER-BY-LETTER STAGGERED REVEAL */}
        <motion.div
          style={{ 
            y: textY,
            opacity: opacityFade
          }}
          className="w-full flex justify-center items-center pointer-events-none z-0 mt-2 sm:mt-4 md:mt-8 overflow-visible"
        >
          <motion.h1
            variants={nameContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-[17vw] sm:text-[14vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] md:leading-none text-center select-none text-zinc-100/90 filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:whitespace-nowrap items-center justify-center md:gap-[0.25em]"
          >
            <span className="inline-flex overflow-hidden py-1">
              {firstNameLetters.map((char, index) => (
                <motion.span
                  key={`fn-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="inline-flex overflow-hidden py-1">
              {lastNameLetters.map((char, index) => (
                <motion.span
                  key={`ln-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>

        {/* LAYER 2: EDITORIAL CONTENT & PORTRAIT OVERLAY */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end mt-[-22vw] sm:mt-[-16vw] md:mt-[-5vw] z-10">
          
          {/* Left Column: Status Badge & Bio (order-2 on mobile, order-1 on desktop) */}
          <motion.div 
            style={{ opacity: opacityFade }}
            className="order-2 md:order-1 md:col-span-4 lg:col-span-3 text-left space-y-4 z-20 pb-4 mt-2 md:mt-0"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono font-semibold text-text-muted backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-text-main font-bold">{profile.availability}</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> [ FULL-STACK & MOBILE ]
              </p>
              <p className="text-sm md:text-base font-medium text-text-main/90 leading-relaxed">
                Hello, I'm <strong className="text-white font-bold">Muhammad Talha</strong>, a software engineer architecting modern web apps & mobile systems.
              </p>
            </div>
          </motion.div>

          {/* Center Column: Portrait Image Integrated Seamlessly (Static position on mouse move) */}
          <motion.div
            style={{ 
              y: imageY
            }}
            className="order-1 md:order-2 md:col-span-4 lg:col-span-6 flex justify-center items-end z-10"
          >
            <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] flex items-end justify-center">
              <motion.img
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={pfpImage}
                alt={profile.name}
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%)'
                }}
                className="w-full h-auto object-contain object-bottom relative z-10"
              />
            </div>
          </motion.div>

          {/* Right Column: Bio Copy (order-3 on desktop) */}
          <motion.div 
            style={{ opacity: opacityFade }}
            className="hidden md:block md:order-3 md:col-span-4 lg:col-span-3 text-right space-y-2 z-20 pb-4"
          >
            <p className="text-sm md:text-base font-medium text-text-muted leading-relaxed">
              Building high-performance digital experiences users remember through sleek UI and robust architecture.
            </p>
          </motion.div>

        </div>

      </div>

      {/* FOOTER ACTIONS BAR */}
      <motion.div 
        style={{ opacity: opacityFade }}
        className="w-full max-w-7xl mx-auto z-30 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Copyright / Role */}
        <div className="text-xs font-mono text-text-muted flex items-center gap-2">
          <span>© {profile.name} 2026</span>
          <span className="text-white/20">•</span>
          <span className="text-primary font-bold">{profile.role}</span>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Send size={14} className="text-zinc-950" /> Get In Touch
          </a>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900/90 text-text-main border border-white/10 hover:border-primary/40 hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            <FolderGit2 size={14} /> Projects
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors cursor-pointer group"
        >
          <span>(Scroll down)</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroEditorial;
