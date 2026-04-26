// src/pages/OpenSource.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OpenSource = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/kaushikdaga-devloper/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(() => setRepos([]));
  }, []);

  return (
    <div className="opensource-page">
      <div className="floating-shapes">
        <motion.div className="shape shape-1" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
      </div>
      <div className="container py-5">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="section-title">Open Source</h1>
          <p className="lead mx-auto" style={{ maxWidth: 600 }}>Contributions and projects I've shared with the community.</p>
        </motion.div>

        {/* Contribution Graph */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <img
              src="https://ghchart.rshah.org/6c5ce7/kaushikdaga-devloper"
              alt="GitHub Contribution Graph"
              className="img-fluid rounded-4"
              style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem' }}
            />
          </div>
        </div>

        {/* Repo Cards */}
        <div className="row g-4">
          {repos.map(repo => (
            <motion.div
              key={repo.id}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-decoration-none">
                <div className="glass-card os-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="os-repo-name">{repo.name}</h5>
                      <p className="small text-muted">{repo.description || 'No description'}</p>
                    </div>
                    <span className="os-star">⭐ {repo.stargazers_count}</span>
                  </div>
                  <div className="d-flex gap-3">
                    <span className="small text-muted">🍴 {repo.forks_count}</span>
                    {repo.language && <span className="small text-muted">🔹 {repo.language}</span>}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSource;