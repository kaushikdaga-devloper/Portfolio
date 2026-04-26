// src/sections/home/SkillsSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillBar = ({ name, level }) => {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="skill-glow" style={{ left: `${level}%` }} />
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ data }) => {
  const [activeGroup, setActiveGroup] = useState('All');

  const allGroups = data.groups;
  const filteredGroups =
    activeGroup === 'All'
      ? allGroups
      : allGroups.filter((g) => g.title === activeGroup);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="skills-section py-6" id="skills">
      <div className="container">
        <motion.h2
          className="section-title text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Expertise
        </motion.h2>

        {/* Group filter pills */}
        <motion.div
          className="d-flex justify-content-center flex-wrap gap-2 mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            className={`filter-pill ${activeGroup === 'All' ? 'active' : ''}`}
            onClick={() => setActiveGroup('All')}
          >
            All
          </button>
          {allGroups.map((group) => (
            <button
              key={group.title}
              className={`filter-pill ${activeGroup === group.title ? 'active' : ''}`}
              onClick={() => setActiveGroup(group.title)}
            >
              {group.title}
            </button>
          ))}
        </motion.div>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            className="row justify-content-center"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredGroups.map((group) => (
              <motion.div
                className="col-md-6 col-lg-5 mb-4"
                key={group.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="skill-card-premium glass-card p-4">
                  <h4 className="skill-group-title">{group.title}</h4>
                  {group.items.map((skill, i) => (
                    <SkillBar
                      key={skill}
                      name={skill}
                      level={Math.floor(Math.random() * 40 + 60)} // dummy
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;