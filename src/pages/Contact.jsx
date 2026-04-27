import { useState } from 'react';
import { Send, MapPin, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const { profile } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const endpoint = profile.formspreeEndpoint || 'https://formspree.io/f/YOUR_ENDPOINT_HERE';
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again later.');
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github': return <FaGithub size={20} />;
      case 'linkedin': return <FaLinkedin size={20} />;
      case 'twitter': return <FaTwitter size={20} />;
      case 'instagram': return <FaInstagram size={20} />;
      default: return <span className="uppercase font-bold text-sm">{platform.charAt(0)}</span>;
    }
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-20 pb-32 relative">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-widest neon-text">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 glass-panel p-6 md:p-12 rounded-[2rem]">

            <div className="lg:col-span-2 flex flex-col space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Contact Information</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Fill out the form and I will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-dark-surface border border-primary/20 rounded-xl flex items-center justify-center text-primary neon-border">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary uppercase tracking-wider">Email</p>
                    <p className="font-semibold text-white tracking-wide break-all">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-dark-surface border border-secondary/20 rounded-xl flex items-center justify-center text-secondary neon-border-purple">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider">Location</p>
                    <p className="font-semibold text-white tracking-wide">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <div className="flex gap-4">
                  {Object.entries(profile.socials).map(([platform, url]) => (
                    url !== '#' && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-12 rounded-full bg-dark-surface flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary border border-white/10 hover:neon-border transition-all duration-300"
                      >
                        <span className="sr-only">{platform}</span>
                        {getSocialIcon(platform)}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-300 uppercase tracking-widest">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-300 uppercase tracking-widest">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white placeholder-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-300 uppercase tracking-widest">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white resize-none placeholder-gray-600"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-900/20 text-red-400 rounded-xl text-sm font-medium border border-red-500/50 backdrop-blur-md">
                    {errorMessage}
                  </div>
                )}

                {status === 'success' ? (
                  <div className="p-4 bg-green-900/20 text-green-400 rounded-xl text-sm font-medium border border-green-500/50 backdrop-blur-md flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    Message sent successfully! I'll be in touch soon.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full md:w-auto px-8 py-4 bg-primary/20 text-primary border border-primary/50 font-bold uppercase tracking-widest rounded-xl hover:bg-primary/30 hover:neon-border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>Sending... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
