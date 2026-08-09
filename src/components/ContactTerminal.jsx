import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RotateCcw, ArrowUpRight, Clock, Globe } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const ContactTerminal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'transmitting' | 'success' | 'error'
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('transmitting');
    setProgress(0);

    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 98;
        }
        return prev + 6;
      });
    }, 90);

    try {
      if (portfolioData.profile.formspreeEndpoint) {
        await fetch(portfolioData.profile.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
    } catch (err) {
      console.warn('Transmission logged locally:', err);
    }

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setStatus('success');
      }, 500);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setProgress(0);
    setErrors({});
  };

  const inputClasses = (field) =>
    `input-editorial ${errors[field] ? 'border-b-rose-500/80' : ''}`;

  return (
    <section className="py-28 md:py-36 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold text-primary uppercase tracking-[0.35em]"
          >
            Contact
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left: Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 space-y-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-400"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight font-[Outfit]">
                      Message delivered
                    </h3>
                    <p className="text-sm text-text-muted font-medium mt-2">
                      I'll get back to you within 24 hours. Thank you for reaching out.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-primary hover:text-text-main transition-colors duration-300 cursor-pointer"
                  >
                    <RotateCcw size={14} /> Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Heading */}
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-bold text-text-main tracking-tight font-[Outfit] leading-tight"
                  >
                    Have an idea?<br />
                    <span className="text-text-muted">Let's build it together.</span>
                  </motion.h3>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] mb-1 block">
                        Name {errors.name && <span className="text-rose-400 ml-2">*Required</span>}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={inputClasses('name')}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] mb-1 block">
                        Email {errors.email && <span className="text-rose-400 ml-2">*Valid email</span>}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={inputClasses('email')}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] mb-1 block">
                      Subject {errors.subject && <span className="text-rose-400 ml-2">*Required</span>}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What would you like to discuss?"
                      className={inputClasses('subject')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] mb-1 block">
                      Message {errors.message && <span className="text-rose-400 ml-2">*Required</span>}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      className={`${inputClasses('message')} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'transmitting'}
                    className="relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-zinc-950 font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_8px_24px_rgba(167,139,250,0.25)] hover:shadow-[0_12px_32px_rgba(167,139,250,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-70 overflow-hidden group"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {status === 'transmitting' ? (
                      <span className="relative z-10 flex items-center gap-2">
                        Sending... ({progress}%)
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        <Send size={15} /> Send Message
                      </span>
                    )}
                  </button>

                  {/* Progress Bar */}
                  {status === 'transmitting' && (
                    <div className="w-full max-w-xs h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-10 lg:pt-16"
          >
            {/* Email */}
            <div>
              <span className="text-[10px] font-bold text-text-muted/50 uppercase tracking-[0.25em] block mb-2">
                Email
              </span>
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="text-base md:text-lg font-semibold text-text-main hover:text-primary transition-colors duration-300"
              >
                {portfolioData.profile.email}
              </a>
            </div>

            {/* Response Time */}
            <div>
              <span className="text-[10px] font-bold text-text-muted/50 uppercase tracking-[0.25em] block mb-2">
                Response Time
              </span>
              <p className="text-base font-semibold text-text-main flex items-center gap-2">
                <Clock size={15} className="text-primary" /> &lt; 24 Hours
              </p>
            </div>

            {/* Timezone */}
            <div>
              <span className="text-[10px] font-bold text-text-muted/50 uppercase tracking-[0.25em] block mb-2">
                Timezone
              </span>
              <p className="text-base font-semibold text-text-main flex items-center gap-2">
                <Globe size={15} className="text-primary" /> GMT +5 (PKT)
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Links */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-text-muted/50 uppercase tracking-[0.25em] block mb-3">
                Elsewhere
              </span>
              <a
                href={portfolioData.profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors duration-300 group"
              >
                <span className="flex items-center gap-2.5">
                  <FaGithub size={16} /> GitHub
                </span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href={portfolioData.profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors duration-300 group"
              >
                <span className="flex items-center gap-2.5">
                  <FaLinkedin size={16} /> LinkedIn
                </span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              {portfolioData.profile.cvUrl && (
                <a
                  href={portfolioData.profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors duration-300 group"
                >
                  <span className="flex items-center gap-2.5">
                    📄 Resume / CV
                  </span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactTerminal;
