// src/sections/home/DomainsSection.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DomainsSection = ({ data }) => (
  <section className="domains-section py-6" id="domains">
    <div className="container">
      <motion.h2
        className="section-title text-center mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        What I Work On
      </motion.h2>

      <motion.div
        className="domains-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {data.items.map((item, i) => (
          <motion.div key={i} variants={item}>
            <Link to={item.route} className="domain-link">
              <span className="domain-link-title">{item.title}</span>
              <span className="domain-link-desc">{item.description}</span>
              <span className="domain-link-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DomainsSection;