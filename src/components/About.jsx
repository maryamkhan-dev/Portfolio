import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '3+', label: 'Years of Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '1',  label: 'Internship' },
  { value: '∞',  label: 'Curiosity' },
];

function StatCard({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-5 text-center cursor-default"
    >
      <div className="text-3xl font-black gradient-text mb-1">{value}</div>
      <div className="text-slate-400 text-xs font-medium tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left – Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sky-500 font-mono text-sm tracking-widest uppercase mb-4">
                01 / About Me
              </p>
              <h2 className="section-heading text-slate-800 mb-6">
                Crafting Digital
                <br />
                <span className="gradient-text">Experiences</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-slate-600 leading-relaxed text-base"
            >
              <p>
                I'm a Software Engineering student at{' '}
                <span className="text-sky-500 font-medium">FAST NUCES</span>, passionate about
                building elegant solutions that sit at the intersection of performance and design.
              </p>
              <p>
                My work spans the full development stack — from crafting responsive, interactive
                front-end interfaces with React and Tailwind, to architecting back-end systems with
                REST APIs and databases like MongoDB and MS SQL.
              </p>
              <p>
                Beyond the web, I explore{' '}
                <span className="text-violet-500 font-medium">Extended Reality (XR)</span> —
                building procedural VR mechanics in Unity and Blender, pushing the boundaries of
                immersive technology in academic and internship projects.
              </p>
              <p>
                I thrive on challenging problems, clean code, and delivering products that genuinely
                delight users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex gap-4"
            >
              <a href="#projects" className="btn-primary text-sm">See My Work</a>
              <a href="#contact"  className="btn-secondary text-sm">Let's Talk</a>
            </motion.div>
          </div>

          {/* Right – Code block + Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 mb-6 font-mono text-sm"
              style={{
                background: '#1e1e2e',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 8px 32px rgba(15,23,42,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-2 text-white/25 text-xs">maryam.js</span>
              </div>
              <div className="space-y-1 leading-6">
                <p><span className="text-violet-400">const</span> <span className="text-sky-400">developer</span> <span className="text-white/40">= {'{'}</span></p>
                <p className="pl-6"><span className="text-white/55">name:</span>     <span className="text-emerald-400">'Maryam Khan'</span><span className="text-white/40">,</span></p>
                <p className="pl-6"><span className="text-white/55">role:</span>     <span className="text-emerald-400">'Full Stack Dev'</span><span className="text-white/40">,</span></p>
                <p className="pl-6"><span className="text-white/55">location:</span> <span className="text-emerald-400">'Pakistan'</span><span className="text-white/40">,</span></p>
                <p className="pl-6"><span className="text-white/55">focus:</span>    <span className="text-emerald-400">['Web', 'XR', 'AI']</span><span className="text-white/40">,</span></p>
                <p className="pl-6">
                  <span className="text-white/55">available:</span>{' '}
                  <span className="text-orange-400">true</span>
                </p>
                <p><span className="text-white/40">{'}'}</span></p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
