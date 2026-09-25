// src/sections/projects/pages/ProjectsIndex.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const ProjectTile = ({ project }) => {
  const { title, description, slug, tags, status } = project;
  // Use a placeholder gradient if no hero image is provided (we'll fetch later, but just show gradient)
  return (
    <motion.div variants={item} className="project-tile-wrapper">
      <Link to={`/projects/${slug}`} className="project-tile" aria-label={`View ${title} project details`}>
        <div className="tile-image">
          {/* We'll attempt to load the actual heroImage later, but for now show gradient */}
          <div className="tile-placeholder" />
          <div className="tile-visual-mark" aria-hidden="true">{title.slice(0, 1)}</div>
          <div className="tile-overlay" />
          <div className="tile-content">
            <h3 className="tile-title">{title}</h3>
            <p className="tile-desc">{description}</p>
            <div className="tile-tags">
              {tags.map(tag => (
                <span key={tag} className="tile-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="tile-footer">
          <span className="tile-status"><span className="tile-status-dot" />{status}</span>
          <span className="tile-action">View project
            <span className="tile-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsIndex = () => {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/content/projects/index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoaded(true);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">Failed to load projects.</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="projects-loader">
        <div className="spinner" />
        <p className="mt-3 text-muted">Curating masterpieces…</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="container py-5">
        <motion.div
          className="projects-header mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="projects-header-copy">
            <span className="projects-eyebrow">Selected work / {String(projects.items.length).padStart(2, '0')} projects</span>
            <h1 className="display-4 fw-bold mb-2">{projects.title}</h1>
            <p className="lead">{projects.subtitle}</p>
          </div>
          <div className="projects-stats" aria-label="Project overview">
            <div className="project-stat">
              <strong>{projects.items.length}</strong>
              <span>Total projects</span>
            </div>
            <div className="project-stat">
              <strong>{projects.items.filter((project) => project.status === 'Active').length}</strong>
              <span>Active builds</span>
            </div>
            <div className="project-stat">
              <strong>{new Set(projects.items.flatMap((project) => project.tags)).size}</strong>
              <span>Core technologies</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {projects.items.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsIndex;