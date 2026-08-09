import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const experiences = [
  {
    role: 'Lead Full-Stack Developer',
    company: 'Apex Digital Solutions',
    period: '2023 — Present',
    description:
      'Architecting high-performance MERN web portals, booking engines, and dynamic administrator control boards. Driving system migrations that optimize data flow and query performance.',
    achievements: [
      'Migrated database queries reducing load times by 40%',
      'Developed full stack appointment dispatch boards supporting 200+ daily sessions',
      'Implemented Stripe checkouts and custom merchant webhook reconciliations',
    ],
  },
  {
    role: 'Mobile & Web Engineer',
    company: 'Mentairo Application Group',
    period: '2022 — 2023',
    description:
      'Collaborated on developing high-fidelity real-time mental health portals. Unified client cross-platform mobile systems with administrative web platforms.',
    achievements: [
      'Integrated Agora SDK real-time audio/video encrypted channels',
      'Coordinated Flutter mobile app releases on Google Play Store',
      'Built administrative telemetry dashboard in React for monitoring session state',
    ],
  },
  {
    role: 'Independent Web Developer',
    company: 'Freelance Engineering',
    period: '2021 — 2022',
    description:
      'Created premium digital portfolios, marketing landing pages, and automated e-commerce web templates for small business clients globally.',
    achievements: [
      'Shipped 15+ websites with custom CSS animations and responsive forms',
      'Optimized frontend performance scoring 95+ on Lighthouse audits',
      'Integrated headless CMS platforms (Strapi, Sanity) for modular client blogging',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const ExperienceShowcase = () => {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section Header with Index */}
        <div className="flex items-end gap-6 md:gap-10 mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-index leading-none"
          >
            05
          </motion.span>
          <div className="flex flex-col gap-2 pb-2">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
            >
              Experience
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-24 bg-gradient-to-r from-primary to-transparent origin-left"
            />
          </div>
        </div>

        {/* Experience Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-5xl space-y-0"
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              variants={itemVariants}
              className="group relative border-t border-white/[0.06] py-10 md:py-14 cursor-default"
            >
              {/* Top Row: Role + Period */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-text-main tracking-tight group-hover:text-primary transition-colors duration-300">
                    {exp.role}
                  </h4>
                  <p className="text-xs font-semibold text-text-muted/60 uppercase tracking-[0.2em] mt-1">
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs font-medium text-text-muted/50 uppercase tracking-wider whitespace-nowrap md:pt-1">
                  {exp.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-muted font-medium leading-relaxed mb-5 max-w-3xl">
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="flex flex-col gap-2">
                {exp.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-text-muted/70 font-medium">
                    <ArrowRight size={12} className="text-primary shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/[0.06]" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
