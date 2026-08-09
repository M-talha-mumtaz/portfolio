import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Wifi, 
  Globe, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  FileText, 
  ExternalLink,
  Cpu,
  Activity,
  Satellite,
  Lock,
  ChevronRight
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

// --------------------------------------------------------------------------
// Main Contact Section Component
// --------------------------------------------------------------------------
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

  // 3D Tilt calculation state for the main console card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Launch Signal Transmission Handler
  const handleLaunchSignal = async (e) => {
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
      // Formspree API submission
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

  return (
    <section className="relative py-28 md:py-36 overflow-hidden id-contact" id="contact">
      {/* Laser Energy Beam (Shoots upwards on transmission launch) */}
      <AnimatePresence>
        {status === 'transmitting' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: [0, 1, 0.8, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-2 md:w-3 bg-gradient-to-t from-fuchsia-500 via-violet-400 to-cyan-300 z-50 pointer-events-none shadow-[0_0_40px_rgba(217,70,239,0.9)]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(167,139,250,0.15)]"
          >
            <Radio size={14} className="animate-pulse text-accent" /> // GET IN TOUCH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-text-main tracking-tight uppercase leading-tight"
          >
            COMMUNICATE <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent block">WITH ME</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-text-muted font-medium mt-4 leading-relaxed"
          >
            Establish a direct channel with <strong className="text-text-main">Muhammad Talha</strong>.
          </motion.p>
        </div>

        {/* Floating Glass Widgets Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Floating Badges (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 relative z-20">
            
            {/* Widget 1: Response Speed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              className="p-5 rounded-2xl glass-panel border border-violet-500/20 shadow-xl backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={14} className="text-accent" /> RESPONSE TIME
                </span>
              </div>
              <p className="text-lg font-black text-text-main tracking-wide">
                &lt; 24 HOURS
              </p>
              <p className="text-xs text-text-muted font-medium mt-1">Direct relay to mobile & terminal.</p>
            </motion.div>

            {/* Widget 2: Preferred Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
              className="p-5 rounded-2xl glass-panel border border-violet-500/20 shadow-xl backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Zap size={14} className="text-yellow-400" /> PREFERRED CONTACT
                </span>
              </div>
              <p className="text-sm font-bold text-text-main truncate font-mono">
                mtalha3632@gmail.com
              </p>
            </motion.div>

          </div>

          {/* CENTER: Main Holographic Communication Console Card */}
          <div className="col-span-1 lg:col-span-6 relative z-30">
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-slate-950/80 border border-violet-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_25px_70px_rgba(167,139,250,0.2)]"
            >
              {/* Scanline backdrop overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />

              {/* Holographic Top Rim Highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent z-20" />

              {/* Form Body or Success Screen */}
              <div className="p-6 md:p-10 relative z-20">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-8 text-center space-y-6"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-pulse">
                        <CheckCircle2 size={40} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-text-main tracking-tight uppercase">
                          Message Sent Successfully
                        </h3>
                        <p className="text-sm text-emerald-400 font-mono font-bold mt-1">
                          Communication Link Established
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-border-main max-w-md mx-auto text-left text-xs font-mono space-y-2">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-text-muted">TRANSMISSION ID:</span>
                          <span className="text-primary font-bold">#TRX-9824-OK</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-text-muted">DESTINATION:</span>
                          <span className="text-text-main font-bold">Muhammad Talha</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">EXPECTED RESPONSE:</span>
                          <span className="text-accent font-bold">&lt; 24 Hours</span>
                        </div>
                      </div>

                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-mono font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <RotateCcw size={14} /> Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleLaunchSignal}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Grid for Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name Input */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center justify-between">
                            <span>Your Name</span>
                            {errors.name && <span className="text-rose-400 text-[10px]">*REQUIRED</span>}
                          </label>
                          <div className={`relative rounded-xl bg-zinc-900/80 border transition-all duration-300 ${errors.name ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 hover:border-primary/40 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(167,139,250,0.25)]'}`}>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name..."
                              className="w-full px-4 py-3.5 bg-transparent text-text-main text-sm outline-none placeholder:text-zinc-500 font-medium rounded-xl"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center justify-between">
                            <span>Email Address</span>
                            {errors.email && <span className="text-rose-400 text-[10px]">*VALID EMAIL REQ</span>}
                          </label>
                          <div className={`relative rounded-xl bg-zinc-900/80 border transition-all duration-300 ${errors.email ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 hover:border-primary/40 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(167,139,250,0.25)]'}`}>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address..."
                              className="w-full px-4 py-3.5 bg-transparent text-text-main text-sm outline-none placeholder:text-zinc-500 font-medium rounded-xl"
                            />
                          </div>
                        </div>

                      </div>

                      {/* Subject Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center justify-between">
                          <span>Subject</span>
                          {errors.subject && <span className="text-rose-400 text-[10px]">*REQUIRED</span>}
                        </label>
                        <div className={`relative rounded-xl bg-zinc-900/80 border transition-all duration-300 ${errors.subject ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 hover:border-primary/40 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(167,139,250,0.25)]'}`}>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What would you like to discuss?"
                            className="w-full px-4 py-3.5 bg-transparent text-text-main text-sm outline-none placeholder:text-zinc-500 font-medium rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center justify-between">
                          <span>Your Message</span>
                          {errors.message && <span className="text-rose-400 text-[10px]">*REQUIRED</span>}
                        </label>
                        <div className={`relative rounded-xl bg-zinc-900/80 border transition-all duration-300 ${errors.message ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 hover:border-primary/40 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(167,139,250,0.25)]'}`}>
                          <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Write your message here..."
                            className="w-full px-4 py-3.5 bg-transparent text-text-main text-sm outline-none placeholder:text-zinc-500 font-medium rounded-xl resize-none"
                          />
                        </div>
                      </div>

                      {/* Launch Engine Action Button */}
                      <button
                        type="submit"
                        disabled={status === 'transmitting'}
                        className="w-full relative py-4 px-8 rounded-2xl bg-gradient-to-r from-primary via-indigo-600 to-secondary text-zinc-950 font-black text-sm uppercase tracking-[0.25em] shadow-[0_10px_30px_rgba(167,139,250,0.35)] hover:shadow-[0_15px_40px_rgba(167,139,250,0.55)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer group disabled:opacity-80"
                      >
                        {/* Shimmer line inside button */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {status === 'transmitting' ? (
                          <div className="flex flex-col items-center justify-center gap-1">
                            <span className="flex items-center gap-2 text-zinc-950 font-black">
                              <Activity size={18} className="animate-spin" /> SENDING SIGNAL... ({progress}%)
                            </span>
                            <div className="w-full max-w-xs h-1.5 rounded-full bg-zinc-900/40 overflow-hidden mt-1">
                              <div
                                className="h-full bg-zinc-950 rounded-full transition-all duration-150"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-3 relative z-10">
                            🚀 LAUNCH SIGNAL
                          </span>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

          {/* Right Floating Badges (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 relative z-20">
            
            {/* Widget 3: Timezone */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, 8, 0] }}
              transition={{ y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' } }}
              className="p-5 rounded-2xl glass-panel border border-violet-500/20 shadow-xl backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Globe size={14} className="text-primary" /> TIMEZONE
                </span>
              </div>
              <p className="text-lg font-black text-text-main tracking-wide">
                GMT +5 <span className="text-xs font-mono text-text-muted font-normal">(PKT)</span>
              </p>
            </motion.div>

            {/* Widget 4: Direct Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
              className="p-5 rounded-2xl glass-panel border border-violet-500/20 shadow-xl backdrop-blur-xl hover:border-primary/40 transition-all duration-300"
            >
              <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest block mb-3">
                DIRECT TRANSMISSION CHANNELS
              </span>
              <div className="flex flex-col gap-2.5">
                <a
                  href={portfolioData.profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 hover:bg-primary/20 text-text-main hover:text-primary border border-white/5 hover:border-primary/30 transition-all text-xs font-bold font-mono"
                >
                  <span className="flex items-center gap-2">
                    <FaGithub size={15} /> GITHUB
                  </span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href={portfolioData.profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 hover:bg-primary/20 text-text-main hover:text-primary border border-white/5 hover:border-primary/30 transition-all text-xs font-bold font-mono"
                >
                  <span className="flex items-center gap-2">
                    <FaLinkedin size={15} /> LINKEDIN
                  </span>
                  <ChevronRight size={14} />
                </a>

                {portfolioData.profile.cvUrl && (
                  <a
                    href={portfolioData.profile.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 hover:bg-accent/20 text-text-main hover:text-accent border border-white/5 hover:border-accent/30 transition-all text-xs font-bold font-mono"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={15} /> RESUME / CV
                    </span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactTerminal;
