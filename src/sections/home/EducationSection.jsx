// src/sections/home/EducationSection.jsx
import { motion } from 'framer-motion';

const educationData = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'Guru Nanak Institute of Technology',
    location: 'Hyderabad, Telangana',
    duration: '2023 – 2027',
    currentSem: '6th Semester',
    cgpa: '8.73',
    status: 'Pursuing',
    highlights: [
      'Specialized in Artificial Intelligence & Machine Learning',
      'Core CS: DSA, OOP, DBMS, OS, Computer Networks',
      'Active in coding competitions & hackathons',
    ],
    color: '#6c5ce7',
  },
  {
    id: 2,
    degree: 'Intermediate (Class XII)',
    institution: 'Sri Chaitanya Junior College',
    location: 'Hyderabad, Telangana',
    duration: '2021 – 2023',
    percentage: '92.9%',
    status: 'Completed',
    highlights: [
      'Physics, Chemistry, Mathematics (PCM) stream',
      'Strong understanding of physics and math concepts',
    ],
    color: '#00b894',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const EducationCard = ({ edu, index }) => {
  return (
    <motion.div className="edu-card-wrapper" variants={item}>
      <div className="edu-card glass-card">
        {/* Timeline connector */}
        <div className="edu-timeline">
          <div className="edu-dot" style={{ background: edu.color }} />
          <div className="edu-line" style={{ background: `linear-gradient(180deg, ${edu.color}, transparent)` }} />
        </div>

        {/* Content */}
        <div className="edu-content">
          {/* Status badge */}
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
            <h4 className="edu-degree">{edu.degree}</h4>
            <span
              className="edu-status-badge"
              style={{
                background: `${edu.color}20`,
                color: edu.color,
                border: `1px solid ${edu.color}40`,
              }}
            >
              {edu.status}
            </span>
          </div>

          <h5 className="edu-institution">{edu.institution}</h5>
          <p className="edu-location">{edu.location}</p>

          {/* Meta info cards */}
          <div className="edu-meta-row">
            <div className="edu-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{edu.duration}</span>
            </div>
            {edu.cgpa && (
              <div className="edu-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>CGPA: {edu.cgpa}</span>
              </div>
            )}
            {edu.percentage && (
              <div className="edu-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{edu.percentage}</span>
              </div>
            )}
            {edu.currentSem && (
              <div className="edu-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>{edu.currentSem}</span>
              </div>
            )}
          </div>

          {/* Highlights */}
          <ul className="edu-highlights">
            {edu.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection = () => (
  <section className="education-section py-6" id="education">
    <div className="container">
      <motion.h2
        className="section-title text-center mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Education
      </motion.h2>

      <motion.div
        className="edu-timeline-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {educationData.map((edu, i) => (
          <EducationCard key={edu.id} edu={edu} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default EducationSection;