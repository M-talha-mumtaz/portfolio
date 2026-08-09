import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const BiographySection = () => {
  const paragraph =
    "I am a full stack software engineer specialized in building robust, interactive applications that merge sleek visuals with reliable backend architectures. With core expertise in the MERN stack and cross-platform mobile environments using Flutter and Dart, I construct responsive, highly optimized systems that scale.";
  
  const words = paragraph.split(' ');

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
          >
            About
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Editorial Paragraph */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-xl md:text-2xl lg:text-3xl text-text-muted font-medium leading-relaxed md:leading-loose max-w-4xl"
        >
          {words.map((word, i) => {
            const highlights = ['MERN', 'Flutter', 'Dart'];
            const isHighlighted = highlights.some((h) => word.includes(h));
            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block mr-[0.3em] ${
                  isHighlighted ? 'text-text-main font-bold' : ''
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
};

export default BiographySection;
