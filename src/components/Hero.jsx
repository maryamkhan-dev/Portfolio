import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';

const TITLES = [
  'Full Stack Developer',
  'XR Systems Enthusiast',
  'Problem Solver',
  'Software Engineer',
];

function TypewriterText({ texts }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex]     = useState(0);
  const [charIndex, setCharIndex]     = useState(0);
  const [deleting, setDeleting]       = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }

    setDisplayText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="text-sky-500">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      const x = ((clientX - left) / width  - 0.5) * 20;
      const y = ((clientY - top)  / height - 0.5) * 20;
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle background — uses light-mode colors */}
      <ParticleField />

      {/* Soft parallax orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl animate-soft-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)',
          transform: 'translate(calc(var(--mouse-x, 0px) * 0.6), calc(var(--mouse-y, 0px) * 0.6))',
          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
          animation: 'softPulse 4.5s ease-in-out infinite 1.5s',
          transform: 'translate(calc(var(--mouse-x, 0px) * -0.4), calc(var(--mouse-y, 0px) * -0.4))',
          transition: 'transform 1s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
          animation: 'softPulse 5.5s ease-in-out infinite 2s',
          transform: 'translate(calc(var(--mouse-x, 0px) * 0.3), calc(var(--mouse-y, 0px) * -0.3))',
          transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Very faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.35,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-mono text-sky-600 tracking-widest uppercase border border-sky-100 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4"
          >
            <span className="gradient-text">Maryam</span>
            <br />
            <span className="text-slate-800">Khan</span>
          </motion.h1>

          {/* Dynamic title */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-mono font-medium mb-6 h-10 flex items-center justify-center"
          >
            <TypewriterText texts={TITLES} />
          </motion.div>

          {/* Sub-title */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Software Engineering student at FAST NUCES, building immersive web experiences
            and XR systems that push the boundaries of what's possible.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="btn-primary text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Projects
            </motion.a>
            <motion.a
              href="/Maryam Khan (2).pdf"
              download
              className="btn-secondary text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-slate-400 text-xs font-mono tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-slate-200 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 bg-sky-400 rounded-full opacity-75" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
