import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';

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
