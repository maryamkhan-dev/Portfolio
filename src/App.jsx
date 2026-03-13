import { useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: '100%' }}
    />
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#f7f9fc] min-h-screen"
      >
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Global ambient background — very soft pastel orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 15% 20%, rgba(14, 165, 233, 0.055) 0%, transparent 50%),
                radial-gradient(ellipse at 85% 80%, rgba(139, 92, 246, 0.045) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.025) 0%, transparent 70%)
              `,
            }}
          />
        </div>

        <Navbar />

        <main className="relative z-10">
          <Hero />

          <SectionDivider />
          <About />
          <SectionDivider />

          <Skills />
          <SectionDivider />

          <Projects />
          <SectionDivider />

          <Experience />
          <SectionDivider />

          <Contact />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}
