import { motion } from 'framer-motion';

const ProfileCircle = ({ src, alt }) => {
  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] select-none pointer-events-none">
      
      {/* Outer Border Ring (Subtle purple thin outline) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-primary/20 dark:border-primary/30"
      />
      
      {/* Dynamic Pulsing Ring Layer */}
      <motion.div 
        animate={{ 
          scale: [0.98, 1.02, 0.98], 
          opacity: [0.15, 0.35, 0.15] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6, 
          ease: "easeInOut" 
        }}
        className="absolute inset-2 rounded-full border border-secondary/10 dark:border-secondary/20"
      />

      {/* Portrait Mask Circle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-[84%] h-[84%] rounded-full overflow-hidden border-4 border-bg-base dark:border-[#09090b] shadow-xl relative z-10 bg-bg-surface flex items-center justify-center"
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover transition-all duration-350 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-bg-surface" />
        )}
      </motion.div>

    </div>
  );
};

export default ProfileCircle;
