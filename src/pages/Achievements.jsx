// src/pages/Achievements.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---- Lightbox for certificate images ----
const CertificateLightbox = ({ src, alt, onClose }) => (
  <motion.div
    className="lightbox-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.img
      src={src}
      alt={alt}
      className="lightbox-image"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    />
    <button className="lightbox-close" onClick={onClose}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </motion.div>
);

// ---- Staggered container variants ----
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('/content/achievements.json')
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch(() => setAchievements([]));
  }, []);

  return (
    <div className="achievements-page">
      {/* Floating shapes */}
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
      </div>

      <div className="container py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="section-title">Achievements & Certifications</h1>
          <p className="lead mx-auto" style={{ maxWidth: 600 }}>
            Credentials that reflect my dedication to growth.
          </p>
        </motion.div>

        <motion.div
          className="achievements-bento"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              className={`achievement-bento-card glass-card ${idx === 0 ? 'featured' : ''}`}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Icon & Title */}
              <div className="ach-card-header">
                <span className="ach-icon">{ach.icon}</span>
                <div>
                  <h4 className="ach-title">{ach.title}</h4>
                  <span className="ach-org">{ach.organization}</span>
                </div>
              </div>

              {/* Description */}
              <p className="ach-desc">{ach.description}</p>

              {/* Certificate image (if exists) */}
              {ach.certificateImage && (
                <div
                  className="ach-cert-preview"
                  onClick={() => setSelectedImage(ach.certificateImage)}
                >
                  <img
                    src={ach.certificateImage}
                    alt={ach.title}
                    className="ach-cert-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('placeholder');
                    }}
                  />
                  <div className="ach-cert-overlay">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Date & Link */}
              <div className="ach-footer">
                <span className="ach-date">{ach.date}</span>
                {ach.certificateLink && (
                  <a
                    href={ach.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="ach-link"
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certificate Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <CertificateLightbox
            src={selectedImage}
            alt="Certificate"
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;