// src/sections/projects/pages/ProjectDetail.jsx
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ProjectOverview from '../sections/ProjectOverview';
import ProjectProblem from '../sections/ProjectProblem';
import ProjectApproach from '../sections/ProjectApproach';
import ProjectTech from '../sections/ProjectTech';
import ProjectLearnings from '../sections/ProjectLearnings';
import ProjectStatus from '../sections/ProjectStatus';
import ProjectNotes from '../sections/ProjectNotes';

/* ---------- Helpers ---------- */

const SectionWrapper = ({ children, delay = 0 }) => (
  <motion.div
    className="detail-section mb-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Lightbox = ({ src, alt, onClose }) => (
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
      onClick={e => e.stopPropagation()}
    />
    <button className="lightbox-close" onClick={onClose}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </motion.div>
);

/* ---------- Reliable image that always shows something ---------- */

const AlwaysVisibleImage = ({ src, alt, className = '', onClick }) => {
  const [broken, setBroken] = useState(false);

  const placeholder = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22225%22%3E%3Crect fill=%22%232d1b4e%22 width=%22400%22 height=%22225%22/%3E%3Ctext fill=%22%23a29bfe%22 x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22%3E📷 Image%3C/text%3E%3C/svg%3E';

  const source = broken || !src ? placeholder : src;

  return (
    <img
      src={source}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => setBroken(true)}
      loading="lazy"
    />
  );
};

/* ---------- Screenshot Carousel – reliable scroll row ---------- */

const ScreenshotsCarousel = ({ screenshots, onImageClick }) => {
  const rowRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollState = () => {
    const el = rowRef.current;
    if (!el) return;
    setScrollLeft(el.scrollLeft);
    setMaxScroll(el.scrollWidth - el.clientWidth);
  };

  useEffect(() => {
    updateScrollState();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [screenshots]);

  const scroll = direction => {
    const el = rowRef.current;
    if (!el) return;
    const item = el.querySelector('.screenshot-thumb');
    if (!item) return;
    const style = window.getComputedStyle(item);
    const marginRight = parseFloat(style.marginRight || 0);
    const width = item.offsetWidth + marginRight;
    el.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="screenshots-carousel">
      <div className="carousel-wrapper">
        {scrollLeft > 4 && (
          <button className="carousel-arrow left" onClick={() => scroll(-1)} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className="carousel-viewport" ref={rowRef}>
          {screenshots.map((img, idx) => (
            <div
              key={idx}
              className="screenshot-thumb"
              onClick={() => onImageClick(img)}
            >
              <AlwaysVisibleImage
                src={img}
                alt={`Screenshot ${idx + 1}`}
                className="screenshot-img"
              />
            </div>
          ))}
        </div>

        {scrollLeft < maxScroll - 4 && (
          <button className="carousel-arrow right" onClick={() => scroll(1)} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- Main ProjectDetail ---------- */

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setError(false);
    setProject(null);
    fetch(`/content/projects/projects/${slug}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then(data => {
        console.log('✅ Project data loaded:', data);
        setProject(data);
      })
      .catch(() => setError(true));
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-outline-primary mt-3">Back to Projects</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="projects-loader">
        <div className="spinner" />
        <p className="mt-3 text-muted">Loading project…</p>
      </div>
    );
  }

  const { overview, problem, approach, tech, learnings, status, notes } = project;
  const heroImage = overview?.heroImage || '';
  const screenshots = overview?.screenshots || [];
  const links = overview?.links || {};

  console.log('📸 Screenshots array:', screenshots);
  console.log('🖼️ Hero image:', heroImage);

  return (
    <div className="project-detail-new">
      {/* Hero Banner */}
      <div className="detail-hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
        </div>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/projects" className="back-link mb-3 d-inline-block">← All Projects</Link>
            <div className="hero-title-row">
              <div>
                <h1 className="hero-title">{overview?.title}</h1>
                <p className="hero-summary">{overview?.summary}</p>
              </div>
              <div className="hero-links-desktop">
                {links.live && (
                  <a href={links.live} target="_blank" rel="noreferrer" className="hero-btn live-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {links.github && (
                  <a href={links.github} target="_blank" rel="noreferrer" className="hero-btn github-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="hero-links-mobile mt-3">
              {links.live && (
                <a href={links.live} target="_blank" rel="noreferrer" className="btn btn-primary rounded-pill me-2">Live Demo</a>
              )}
              {links.github && (
                <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-outline-light rounded-pill">GitHub</a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Screenshot Gallery */}
      {screenshots.length > 0 && (
        <div className="container py-4">
          <ScreenshotsCarousel screenshots={screenshots} onImageClick={setSelectedImage} />
        </div>
      )}

      {/* Content */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {overview && <SectionWrapper delay={0}><ProjectOverview data={overview} /></SectionWrapper>}
            {problem && <SectionWrapper delay={0.1}><ProjectProblem data={problem} /></SectionWrapper>}
            {approach && <SectionWrapper delay={0.2}><ProjectApproach data={approach} /></SectionWrapper>}
            {tech && <SectionWrapper delay={0.3}><ProjectTech data={tech} /></SectionWrapper>}
            {learnings && <SectionWrapper delay={0.4}><ProjectLearnings data={learnings} /></SectionWrapper>}
            {status && <SectionWrapper delay={0.5}><ProjectStatus data={status} /></SectionWrapper>}
            {notes && <SectionWrapper delay={0.6}><ProjectNotes data={notes} /></SectionWrapper>}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox src={selectedImage} alt="Enlarged screenshot" onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;