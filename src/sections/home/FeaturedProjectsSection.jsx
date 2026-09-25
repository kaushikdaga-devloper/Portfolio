// src/sections/home/FeaturedProjectsSection.jsx (new component)
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedProjectsSection = () => {
  const [projectData, setProjectData] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetch('/content/projects/index.json')
      .then((res) => res.json())
      .then((data) => setProjectData({ items: data.items.slice(0, 3), total: data.items.length }))
      .catch(() => setProjectData({ items: [], total: 0 }));
  }, []);

  if (!projectData.items.length) return null;

  return (
    <section className="featured-projects py-6" id="work">
      <div className="container">
        <motion.div
          className="featured-projects-header mb-5 mt-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="featured-projects-eyebrow">Selected work / {String(projectData.total).padStart(2, '0')} projects</span>
            <h2 className="section-title mb-2">Featured Work</h2>
            <p className="featured-projects-summary">A focused selection of systems, products, and experiments built with intent.</p>
          </div>
          <Link to="/projects" className="featured-projects-view-all">
            View all projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
        <motion.div
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projectData.items.map((proj) => (
            <motion.div
              key={proj.id}
              className="col-md-6 col-lg-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={`/projects/${proj.slug}`} className="featured-project-link" aria-label={`View ${proj.title} project details`}>
                <div className="glass-card project-card-featured h-100">
                  <div className="featured-project-visual">
                    <span className="featured-project-mark" aria-hidden="true">{proj.title.slice(0, 1)}</span>
                  </div>
                  <div className="featured-project-body">
                    <h5>{proj.title}</h5>
                    <p>{proj.description}</p>
                    <div className="featured-project-tags">
                    {proj.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                    </div>
                  </div>
                  <div className="featured-project-footer">
                    <span><i />{proj.status}</span>
                    <span className="featured-project-arrow">View <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
                  </div>
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