import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import CanvasParticles from './components/CanvasParticles';

const AnimatedRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  useEffect(() => {
    // Permanently lock document root to dark mode
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 bg-[#09090b]">
        {/* Ambient background glow blobs for dark mode depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/4 blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent/3 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-secondary/3 blur-[110px] pointer-events-none z-0" />

        {/* Canvas Particles (Twinkling & Drifting Background Stars Only) */}
        <CanvasParticles />

        <Navbar />
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
