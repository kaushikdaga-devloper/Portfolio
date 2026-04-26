// src/sections/home/FeaturedProjectsSection.jsx (new component)
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/content/projects/index.json')
      .then((res) => res.json())
      .then((data) => setProjects(data.items.slice(0, 3))) // featured 3
      .catch(() => setProjects([]));
  }, []);

  if (!projects.length) return null;

  return (
    <section className="featured-projects py-6" id="work">
      <div className="container">
        <motion.h2
          className="section-title text-center mb-5 mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.h2>
        <motion.div
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              className="col-md-6 col-lg-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={`/projects/${proj.slug}`} className="text-decoration-none">
                <div className="glass-card project-card-featured p-4 h-100">
                  <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{proj.title}</h5>
                  <p className="domain-link-desc">{proj.description}</p>
                  <div className="mt-3">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="badge me-1 mb-1" style={{ background: 'rgba(108,92,231,0.15)', color: 'var(--color-accent-light)' }}>{tag}</span>
                    ))}
                  </div>
                  <span className="project-status mt-2 d-inline-block small">{proj.status}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;