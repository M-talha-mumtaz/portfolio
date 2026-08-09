import { motion } from 'framer-motion';
import { Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

const CertificatesShowcase = () => {
  const certificates = [
    {
      title: 'Full Stack Development (MERN)',
      issuer: 'Meta Professional / Coursera',
      date: 'Dec 2022',
      details: 'Comprehensive systems training covering React application design, Express backend APIs, REST design protocols, and MongoDB database modeling.',
      link: '#'
    },
    {
      title: 'Flutter Mobile App Development',
      issuer: 'Google Developer Group / Udemy',
      date: 'May 2023',
      details: 'Advanced mobile architecture training. Specializing in Dart runtime optimization, state management (Provider/Bloc), and external SDK hardware integrations.',
      link: '#'
    },
    {
      title: 'AI Engineering & Agentic Workflows',
      issuer: 'DeepLearning.AI / Coursera',
      date: 'Mar 2024',
      details: 'Prompt engineering patterns, LangChain orchestration, vector search database setup (Pinecone/Chroma), and integrating LLM logic hooks.',
      link: '#'
    }
  ];

  return (
    <section className="py-24 border-t border-border-main relative overflow-hidden" id="certificates">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3"
          >
            Credentials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight leading-tight"
          >
            Certificates & Awards
          </motion.h3>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 md:p-8 rounded-[2rem] border border-border-main hover:border-primary/20 hover-glow-shadow transition-all duration-300 flex flex-col h-full group cursor-default"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                  <Award size={22} />
                </div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-3 py-1 bg-bg-base rounded-full border border-border-main">
                  {cert.date}
                </div>
              </div>

              {/* Title & Issuer */}
              <div className="space-y-1 mb-4">
                <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-secondary" /> {cert.issuer}
                </p>
              </div>

              {/* Description */}
              <p className="text-text-muted text-xs leading-relaxed flex-grow mb-6">
                {cert.details}
              </p>

              {/* Link */}
              <a 
                href={cert.link}
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary hover:underline group/link"
              >
                Verify Credential
                <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificatesShowcase;
