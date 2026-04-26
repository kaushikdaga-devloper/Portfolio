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
              <motion.div className="mt-4 d-flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <a href="https://github.com/kaushikdaga-devloper" className="btn btn-primary btn-lg rounded-pill">GitHub</a>
                <a href="#contact" className="btn btn-outline-primary btn-lg rounded-pill">Get Resume</a>
              </motion.div>
            </motion.div>
          </div>
          <div className="col-lg-5 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="profile-3d-wrapper">
              <div className="profile-ring" />
              <img src={data.image} alt={data.name} className="profile-img-hero" />
            </motion.div>

            {/* ✅ Profile Views Counter — placed below the profile image */}
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