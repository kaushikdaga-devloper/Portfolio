// src/pages/Testimonials.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/content/testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <div className="testimonials-page">
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
      </div>
      <div className="container py-5">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="section-title">What People Say</h1>
          <p className="lead mx-auto" style={{ maxWidth: 600 }}>Kind words from mentors and peers.</p>
        </motion.div>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="glass-card testimonial-card p-4 h-100">
                <div className="mb-3 text-muted">“{t.quote}”</div>
                <div className="d-flex align-items-center">
                  <div className="testimonial-avatar me-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} />
                    ) : (
                      <div className="avatar-placeholder">{t.name.charAt(0)}</div>
                    )}
                  </div>
                  <div>
                    <h6 className="mb-0">{t.name}</h6>
                    <small className="text-muted">{t.title}</small>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;