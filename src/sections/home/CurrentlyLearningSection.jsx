// src/sections/home/CurrentlyLearningSection.jsx
import { motion } from 'framer-motion';

const learningItems = [
  { name: 'System Design', icon: '🏗️' },
  { name: 'Machine Learning', icon: '📱' },
  { name: 'Docker & K8s', icon: '🐳' },
  { name: 'DSA', icon: '⚡' },
];

const CurrentlyLearningSection = () => (
  <section className="learning-section py-6" id="learning">
    <div className="container">
      <motion.h2
        className="section-title text-center mb-5 mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Currently Learning
      </motion.h2>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {learningItems.map((item, idx) => (
          <motion.div
            key={item.name}
            className="glass-card learning-card px-4 py-3 d-flex align-items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="learning-icon">{item.icon}</span>
            <span className="learning-name">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CurrentlyLearningSection;