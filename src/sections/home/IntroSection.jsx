// src/sections/home/IntroSection.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileViewsCounter from '../../components/ProfileViewsCounter';

const IntroSection = ({ data }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const roles = data.roles;

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => prev + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <section className="intro-section min-vh-100 d-flex align-items-center position-relative overflow-hidden">
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
        <motion.div className="shape shape-3" animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 7 }} />
      </div>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="display-3 fw-bold mb-3" style={{ lineHeight: 1.1 }}>
                Hi, I'm{' '}
                <span style={{ background: 'var(--color-accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {data.name}
                </span>
                .
              </h1>
              <div className="role-wrapper mb-4" style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                <span>I am a {text}</span>
                <span className="cursor">|</span>
              </div>
              {data.summary.map((line, i) => (
                <motion.p key={i} className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  {line}
                </motion.p>
              ))}

              {/* CTA Buttons – always side by side with icons */}
              <motion.div
                className="intro-buttons mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a href="https://github.com/kaushikdaga-devloper" className="btn btn-primary btn-lg rounded-pill">
                  {/* GitHub icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a href="#contact" className="btn btn-outline-primary btn-lg rounded-pill">
                  {/* Download icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume
                </a>
              </motion.div>
            </motion.div>
          </div>
          <div className="col-lg-5 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="profile-3d-wrapper">
              <div className="profile-ring" />
              <img src={data.image} alt={data.name} className="profile-img-hero" />
            </motion.div>

            {/* Profile Views Counter */}
            <motion.div
              className="mt-3 d-flex justify-content-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <ProfileViewsCounter />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;