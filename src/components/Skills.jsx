import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming',
    icon: '{ }',
    color: '#0ea5e9',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python',     level: 82 },
      { name: 'C++',        level: 85 },
      { name: 'C#',         level: 80 },
      { name: 'Java',       level: 75 },
    ],
  },
  {
    title: 'Web',
    icon: '</>',
    color: '#8b5cf6',
    skills: [
      { name: 'React.js',    level: 90 },
      { name: 'HTML5',       level: 95 },
      { name: 'CSS3',        level: 92 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    title: 'Backend & DB',
    icon: '⬡',
    color: '#14b8a6',
    skills: [
      { name: 'MongoDB',   level: 78 },
      { name: 'MS SQL',    level: 75 },
      { name: 'REST APIs', level: 85 },
      { name: 'Node.js',   level: 78 },
    ],
  },
  {
    title: 'Tools',
    icon: '⚙',
    color: '#f97316',
    skills: [
      { name: 'Unity',   level: 80 },
      { name: 'Git',     level: 88 },
      { name: 'Blender', level: 30 },
    ],
  },
];

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-500 group-hover:text-slate-800 transition-colors duration-200">{name}</span>
        <span className="text-xs font-mono font-medium" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass-card rounded-2xl p-6 cursor-default overflow-hidden"
    >
      {/* Top color stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${category.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 transition-all duration-300"
          style={{
            background: hovered ? `${category.color}18` : `${category.color}0e`,
            color: category.color,
            border: `1px solid ${category.color}${hovered ? '35' : '1e'}`,
          }}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-700 text-sm">{category.title}</h3>
          <p className="text-slate-400 text-xs">{category.skills.length} skills</p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} {...skill} color={category.color} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-32 overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(14, 165, 233, 0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sky-500 font-mono text-sm tracking-widest uppercase mb-4"
          >
            02 / Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-slate-800"
          >
            My <span className="gradient-text">Tech Stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 max-w-md mx-auto mt-4"
          >
            Tools and technologies I've mastered through projects, coursework, and hands-on experience.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* Floating skill chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {['React.js', 'JavaScript', 'Python', 'C++', 'Unity', 'MongoDB', 'REST APIs', 'Git', 'Blender', 'Tailwind'].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-4 py-2 rounded-full text-xs font-mono bg-white border border-slate-200 text-slate-500 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all duration-200 cursor-default shadow-sm"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
