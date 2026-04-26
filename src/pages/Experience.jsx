// src/pages/Experience.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/content/experience.json')
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(() => setExperiences([]));
  }, []);

  return (
    <div className="experience-page">
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
      </div>
      <div className="container py-5">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="section-title">Experience & Activities</h1>
          <p className="lead mx-auto" style={{ maxWidth: 600 }}>Building skills through hands‑on work.</p>
        </motion.div>
        <motion.div className="exp-timeline" variants={container} initial="hidden" animate="visible">
          {experiences.map((exp, idx) => (
            <motion.div key={idx} className="glass-card exp-card p-4 mb-4" variants={item}>
              <div className="row align-items-center">
                <div className="col-md-3">
                  <span className="exp-tag" style={{ background: exp.color }}>{exp.company}</span>
                  <p className="exp-date small mt-2">{exp.duration}</p>
                </div>
                <div className="col-md-5">
                  <h5 className="exp-role">{exp.role}</h5>
                  <p className="exp-desc">{exp.description}</p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="exp-tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;