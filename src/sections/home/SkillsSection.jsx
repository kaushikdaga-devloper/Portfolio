// src/sections/home/SkillsSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillChip = ({ name }) => {
  return (
    <motion.div
      className="skill-chip"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
    >
      <span className="skill-chip-dot" aria-hidden="true" />
      <span className="skill-name">{name}</span>
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

        {/* Grouped skill cards */}
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
                  <div className="skill-card-heading">
                    <span className="skill-card-kicker">01 / category</span>
                    <h4 className="skill-group-title">{group.title}</h4>
                  </div>
                  <div className="skill-chip-grid">
                    {group.items.map((skill) => (
                      <SkillChip key={skill} name={skill} />
                    ))}
                  </div>
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