import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

const TiltAvatar = ({ src, alt }) => {
  const containerRef = useRef(null);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid mouse transitions
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  // 1. Photo tilts: separate rotation for depth (steeper tilt than base)
  const photoRotateX = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const photoRotateY = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const photoX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const photoY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // 2. Hologram Offset Layer (Chromatic Aberration Effect)
  const holoX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const holoY = useTransform(springY, [-0.5, 0.5], [-35, 35]);

  // 3. Glow moves: coordinates inside radial gradients (0% to 100%)
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  // 4. Dynamic Shadow
  const shadowX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const shadowBlur = useTransform(springY, [-0.5, 0.5], [40, 60]);
  const shadowTemplate = useMotionTemplate`rgba(223, 193, 121, 0.20) ${shadowX}px ${shadowY}px ${shadowBlur}px`;

  // 5. Interior HUD Background Rotate
  const bgRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const bgRotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const bgRotateZ = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  // Main container 3D tilts
  const mainRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const mainRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized position relative to center of element (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-[1200px] flex items-center justify-center w-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: mainRotateX,
          rotateY: mainRotateY,
          boxShadow: shadowTemplate,
          transformStyle: 'preserve-3d',
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 6, 
          ease: "easeInOut" 
        }}
        className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] rounded-[3rem] z-10 flex items-end justify-center cursor-pointer group bg-black/50 overflow-hidden border border-white/5"
      >
        {/* Dynamic shining border highlight that tracks the mouse */}
        <motion.div 
          style={{
            background: useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(223, 193, 121, 0.6) 0%, rgba(181, 154, 87, 0.2) 50%, transparent 100%)`
          }}
          className="absolute -inset-[2px] rounded-[3rem] z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Inner Card Layer Container */}
        <div className="absolute inset-[1px] rounded-[3rem] bg-[#06070b] z-0 overflow-hidden">
          
          {/* Depth Layer 1: Receding background grid */}
          <motion.div 
            style={{
              rotateX: bgRotateX,
              rotateY: bgRotateY,
              rotateZ: bgRotateZ,
              transformStyle: 'preserve-3d',
              translateZ: -60,
              backgroundSize: '24px 24px'
            }}
            className="absolute inset-2 rounded-[2.5rem] bg-dark-surface/30 border border-white/5 bg-[radial-gradient(rgba(223,193,121,0.08)_1px,transparent_1px)] z-0 opacity-40 group-hover:opacity-80 transition-all duration-500 pointer-events-none"
          />

          {/* Depth Layer 2: Rotating Cybernetic HUD Rings */}
          <motion.div
            style={{
              rotateX: bgRotateX,
              rotateY: bgRotateY,
              translateZ: -20,
              transformStyle: 'preserve-3d'
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border border-dashed border-primary/20 pointer-events-none z-5 flex items-center justify-center opacity-30 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
          >
            <div className="w-[80%] h-[80%] rounded-full border border-dashed border-secondary/15 animate-spin-reverse" />
          </motion.div>

          {/* Depth Layer 3: Laser scan line effect */}
          <div 
            className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#dfc179] to-transparent z-15 pointer-events-none opacity-60"
            style={{
              animation: 'scan 4s linear infinite',
            }}
          />

          {/* Glow moves: Inner radial card spotlight */}
          <motion.div 
            style={{
              background: useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(223, 193, 121, 0.15) 0%, rgba(181, 154, 87, 0.05) 60%, transparent 100%)`
            }}
            className="absolute inset-0 z-10 pointer-events-none"
          />

          {/* Vignette Bottom Gradient Mask */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06070b] via-[#06070b]/60 to-transparent z-22 pointer-events-none" />
        </div>

        {/* Depth Layer 4: Chromatic Aberration Projection Layer (Warm Hologram behind) */}
        <motion.img 
          src={src} 
          alt={alt} 
          loading="lazy"
          style={{
            rotateX: photoRotateX,
            rotateY: photoRotateY,
            x: holoX,
            y: holoY,
            transformStyle: 'preserve-3d',
            translateZ: 70,
            filter: 'hue-rotate(30deg) saturate(180%) blur(1px)',
          }}
          className="w-[88%] h-[92%] object-contain object-bottom absolute z-20 opacity-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none mix-blend-screen"
        />

        {/* Depth Layer 5: Front projecting Avatar image */}
        <motion.img 
          src={src} 
          alt={alt} 
          loading="lazy"
          style={{
            rotateX: photoRotateX,
            rotateY: photoRotateY,
            x: photoX,
            y: photoY,
            transformStyle: 'preserve-3d',
            translateZ: 100 // Projecting highly outwards on hover
          }}
          className="w-[88%] h-[92%] object-contain object-bottom relative z-25 group-hover:scale-105 transition-all duration-700 drop-shadow-[0_-5px_15px_rgba(223,193,121,0.15)] group-hover:drop-shadow-[0_0_25px_rgba(223,193,121,0.3)] pointer-events-none" 
        />
      </motion.div>

      {/* Style element containing the keyframe for the scanner line */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TiltAvatar;
