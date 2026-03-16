import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'Rental Management Web App',
    description:
      'A full-featured web application for managing property rentals — listings, tenant management, payment tracking, and lease agreements. Built with a REST API backend and React frontend.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST API', 'Tailwind CSS'],
    color: '#0ea5e9',
    icon: '🏠',
    github: 'https://github.com/maryamkhan-dev',
    featured: true,
    video: null,
  },
  {
    title: 'Weather App',
    description:
      'Real-time weather application fetching live data from an external API. Displays current conditions, forecasts, and dynamic backgrounds that adapt to weather state.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
    color: '#8b5cf6',
    icon: '⛅',
    github: 'https://github.com/maryamkhan-dev/Weather_App',
    featured: false,
    video: null,
  },
  {
    title: 'MotionGenVR',
    description:
      'Procedural VR mechanic generator built in Unity — generates dynamic motion sequences and interactive VR scenarios, developed during internship at the SEAL Lab.',
    tags: ['Unity', 'C#', 'VR', 'Blender', 'XR Development'],
    color: '#14b8a6',
    icon: '🥽',
    github: 'https://github.com/maryamkhan-dev',
    featured: true,
    video: null,
  },
  {
    title: 'E-commerce Desktop App',
    description:
      'Full-featured desktop e-commerce application with product catalog, shopping cart, order management, and MS SQL database integration.',
    tags: ['C#', 'MS SQL', '.NET Windows Forms', 'Desktop'],
    color: '#f97316',
    icon: '🛒',
    github: 'https://github.com/maryamkhan-dev/E-commerce',
    featured: false,
    video: null,
  },
  {
    title: 'Truth vs Lie Detection Model',
    description:
      'Machine learning model trained to detect truth vs. deception using behavioral and linguistic features. Applies supervised learning with Python.',
    tags: ['Python', 'Machine Learning', 'scikit-learn', 'Data Science'],
    color: '#8b5cf6',
    icon: '🧠',
    github: 'https://github.com/maryamkhan-dev',
    featured: false,
    video: null,
  },
  {
    title: 'Online Quiz Platform',
    description:
      'Interactive web-based quiz and assessment platform with real-time scoring, timed rounds, leaderboard, and an admin dashboard for creating custom question sets.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
    color: '#ec4899',
    icon: '📝',
    github: 'https://github.com/maryamkhan-dev',
    featured: false,
    video: null,
  },
];

/* ── VideoPreview ── */
function VideoPreview({ src, color, visible }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (visible) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [visible]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.96 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute inset-0 z-20 rounded-2xl overflow-hidden pointer-events-none"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${color}cc 0%, transparent 60%)` }}
      />
    </motion.div>
  );
}

/* ── ProjectCard — professional hover, no 3D tilt ── */
function ProjectCard({ project, index, onVideoClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full"
      style={{
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col bg-white"
        style={{
          border: hovered ? `1px solid ${project.color}40` : '1px solid #e8edf5',
          boxShadow: hovered
            ? `0 16px 48px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px ${project.color}14`
            : '0 2px 16px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Video overlay */}
        {project.video && (
          <VideoPreview src={project.video} color={project.color} visible={hovered} />
        )}

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            opacity: hovered ? 0.9 : 0.35,
          }}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{project.icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-tight">
                  {project.title}
                </h3>
                {project.featured && (
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full mt-1 inline-block"
                    style={{ color: project.color, background: `${project.color}12`, border: `1px solid ${project.color}28` }}
                  >
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Icons row */}
            <div className="flex gap-2">
              {/* GitHub link */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: hovered ? `${project.color}12` : '#f1f5f9',
                  border: hovered ? `1px solid ${project.color}28` : '1px solid #e2e8f0',
                  color: hovered ? project.color : '#94a3b8',
                }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>

              {/* Video icon */}
              {(project.video || project.title === 'Weather App' || project.title === 'E-commerce Desktop App') && (
                <motion.button
                  onClick={() => onVideoClick(project.video || 'placeholder')}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: hovered ? `${project.color}12` : '#f1f5f9',
                    border: hovered ? `1px solid ${project.color}28` : '1px solid #e2e8f0',
                    color: hovered ? project.color : '#94a3b8',
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.button>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[10px] font-mono transition-all duration-200"
                style={{
                  color: `${project.color}cc`,
                  background: `${project.color}0a`,
                  border: `1px solid ${project.color}1e`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modalVideo, setModalVideo] = useState(null);

  const openModal = (videoSrc) => {
    setModalVideo(videoSrc);
  };

  const closeModal = () => {
    setModalVideo(null);
  };

  return (
    <section id="projects" className="relative py-32 overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)' }}
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
            03 / Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-slate-800"
          >
            Things I've <span className="gradient-text">Built</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 max-w-md mx-auto mt-4"
          >
            A collection of projects that demonstrate my range — from web apps and desktop software to VR and machine learning.
          </motion.p>
        </div>

        {/* 3 × 2 project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} onVideoClick={openModal} />
          ))}
        </div>

        {/* Video Modal */}
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition z-10"
              >
                ✕
              </button>
              {modalVideo === 'placeholder' ? (
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Demo Video Coming Soon</h3>
                  <p className="text-gray-600">We're working on adding a demo video for this project. Check back later!</p>
                </div>
              ) : (
                <video
                  src={modalVideo}
                  controls
                  autoPlay
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/maryamkhan-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
