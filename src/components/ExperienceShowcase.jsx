import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';

const ExperienceShowcase = () => {
  const experiences = [
    {
      role: 'Lead Full-Stack Developer',
      company: 'Apex Digital Solutions',
      period: '2023 - Present',
      description: 'Architecting high-performance MERN web portals, booking engines, and dynamic administrator control boards. Driving system migrations that optimize data flow and query performance.',
      achievements: [
        'Migrated database queries reducing load times by 40%',
        'Developed full stack appointment dispatch boards supporting 200+ daily sessions',
        'Implemented Stripe checkouts and custom merchant webhook reconciliations'
      ]
    },
    {
      role: 'Mobile & Web Engineer',
      company: 'Mentairo Application Group',
      period: '2022 - 2023',
      description: 'Collaborated on developing high-fidelity real-time mental health portals. Unified client cross-platform mobile systems with administrative web platforms.',
      achievements: [
        'Integrated Agora SDK real-time audio/video encrypted channels',
        'Coordinated Flutter mobile app releases on Google Play Store',
        'Built administrative telemetry dashboard in React for monitoring session state'
      ]
    },
    {
      role: 'Independent Web Developer',
      company: 'Freelance Engineering',
      period: '2021 - 2022',
      description: 'Created premium digital portfolios, marketing landing pages, and automated e-commerce web templates for small business clients globally.',
      achievements: [
        'Shipped 15+ websites with custom CSS animations and responsive forms',
        'Optimized frontend performance scoring 95+ on Lighthouse audits',
        'Integrated headless CMS platforms (Strapi, Sanity) for modular client blogging'
      ]
    }
  ];

  return (
    <section className="py-24 border-t border-border-main relative overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            History
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            Work Experience
          </motion.h3>
        </div>

        {/* Experience List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-[2rem] border border-border-main hover:border-primary/20 hover-glow-shadow transition-all duration-300 group cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Role & Company */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bg-base border border-border-main flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Period */}
                <div className="inline-flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest px-4 py-2 bg-bg-base rounded-full border border-border-main h-fit">
                  <Calendar size={12} className="text-primary" />
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Accomplishments */}
              <div className="space-y-3 border-t border-border-main pt-6">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                  <Award size={12} className="text-primary" /> Key Achievements
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="text-xs text-text-muted flex items-start gap-2 font-medium">
                      <ChevronRight size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceShowcase;
