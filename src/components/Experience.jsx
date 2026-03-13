import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    role: 'Lab Demonstrator',
    company: 'FAST NUCES',
    period: 'Spring 2024 – Present',
    type: 'Part-time',
    color: '#0ea5e9',
    icon: '🎓',
    points: [
      'Assisted students in programming labs covering C++, Java, and Data Structures',
      'Guided debugging sessions and code review for undergraduate projects',
      'Developed lab exercises and supplementary learning materials',
      'Maintained lab systems and development environments',
    ],
  },
  {
    role: 'Game Developer Intern',
    company: 'Decimal Solutions – SEAL Lab',
    period: 'Jul – Aug 2025',
    type: 'Internship',
    color: '#8b5cf6',
    icon: '🎮',
    points: [
      'Developed MotionGenVR — a procedural VR mechanic generator in Unity',
      "Implemented XR interaction systems using C# and Unity's XR Toolkit",
      'Created 3D assets and animations in Blender for VR environments',
      'Collaborated with a team of engineers to deliver immersive VR experiences',
    ],
  },
];

function TimelineItem({ exp, index, isLast }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-12">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl relative z-10"
          style={{
            background: `${exp.color}0e`,
            border: `2px solid ${exp.color}30`,
            boxShadow: `0 4px 16px ${exp.color}18`,
          }}
        >
          {exp.icon}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
            className="w-0.5 flex-1 mt-4 origin-top"
            style={{ background: `linear-gradient(to bottom, ${exp.color}30, transparent)` }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-2xl p-6 mb-8 flex-1 relative overflow-hidden"
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-50"
          style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
        />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-slate-800 font-bold text-lg leading-tight">{exp.role}</h3>
            <p className="font-medium text-sm mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
            <span className="text-slate-400 text-xs font-mono">{exp.period}</span>
            <span
              className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full uppercase"
              style={{ color: exp.color, background: `${exp.color}0e`, border: `1px solid ${exp.color}22` }}
            >
              {exp.type}
            </span>
          </div>
        </div>

        <ul className="space-y-2.5">
          {exp.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.2 + i * 0.08 + 0.4 }}
              className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: exp.color }}
              />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-32 overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sky-500 font-mono text-sm tracking-widest uppercase mb-4"
          >
            04 / Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-slate-800"
          >
            Where I've <span className="gradient-text">Worked</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 mt-4 max-w-md mx-auto"
          >
            Real-world experience shaping my skills in software engineering, education, and XR development.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.role}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
