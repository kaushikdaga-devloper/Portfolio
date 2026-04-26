// src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/content/blog.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="blog-page">
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
      </div>
      <div className="container py-5">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="section-title">Learning Journal</h1>
          <p className="lead mx-auto" style={{ maxWidth: 600 }}>Thoughts, tutorials, and lessons learned.</p>
        </motion.div>
        <motion.div className="row g-4" variants={container} initial="hidden" animate="visible">
          {posts.map((post, idx) => (
            <motion.div key={idx} className="col-md-6 col-lg-4" variants={item}>
              <div className="glass-card blog-card p-4 h-100 d-flex flex-column">
                <h5 className="blog-title">{post.title}</h5>
                <p className="blog-date small text-muted">{post.date}</p>
                <p className="blog-excerpt flex-grow-1">{post.excerpt}</p>
                <div className="mt-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="badge me-1 mb-1" style={{ background: 'rgba(108,92,231,0.15)', color: 'var(--color-accent-light)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {post.link && (
                  <a href={post.link} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm mt-3">
                    Read More →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;