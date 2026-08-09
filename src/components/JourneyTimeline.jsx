import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to pathLength for drawing effect
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  const milestones = [
    {
      year: '2021',
      title: 'The Foundation',
      description: 'Discovered passion for software development. Mastered web fundamentals: HTML5, CSS3, ES6 JavaScript, responsive design paradigms, and core programming theories.',
      side: 'left'
    },
    {
      year: '2022',
      title: 'Full Stack Engineering (MERN)',
      description: 'Transitioned to complex app development. Specialized in MongoDB, Express, React, and Node.js. Built booking platforms and dashboard engines with dynamic state routing.',
      side: 'right'
    },
    {
      year: '2023',
      title: 'Mobile Architecture & Real-Time APIs',
      description: 'Expanded into mobile development using Flutter and Dart. Engineered real-time WebRTC/Agora SDK integrations, offline caching databases, and secure authentication pipelines.',
      side: 'left'
    },
    {
      year: '2024',
      title: 'AI Engineering & Deep Learning',
      description: 'Integrating LLMs, building automated system agents, developing python-based fast APIs, and modeling intelligent systems for next-generation platforms.',
      side: 'right'
    }
  ];

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="journey">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            Milestones
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            My Journey
          </motion.h3>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Path Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block z-0 bg-border-main">
            <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-primary stroke-[3px]"
                style={{
                  pathLength,
                  filter: 'drop-shadow(0px 0px 8px var(--primary-color))'
                }}
              />
            </svg>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {milestones.map((item, idx) => (
              <div 
                key={item.year}
                className={`flex flex-col md:flex-row items-center justify-between ${
                  item.side === 'left' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Spacer (takes up opposite column) */}
                <div className="w-full md:w-[45%] hidden md:block" />

                {/* Central Circle Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-base border-2 border-border-main flex items-center justify-center hidden md:flex z-20 group">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary-color)]"
                  />
                </div>

                {/* Actual Milestone Card */}
                <motion.div 
                  initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
                  className="w-full md:w-[45%] glass-panel p-6 md:p-8 rounded-[2rem] border border-border-main hover:border-primary/30 transition-all duration-500 hover-glow-shadow cursor-default"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted px-3 py-1 bg-border-main/50 rounded-full">
                      Level {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-text-main mb-3">
                    {item.title}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default JourneyTimeline;
