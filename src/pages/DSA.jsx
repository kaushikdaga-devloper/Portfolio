// src/pages/DSA.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// -------------------- Circular Progress Ring --------------------
const CircularRing = ({ value, max, size = 180, strokeWidth = 14 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    setAnimatedOffset(circumference - progress * circumference);
  }, [progress, circumference]);

  return (
    <div className="ring-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6c5ce7" />
            <stop offset="100%" stopColor="#a29bfe" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animatedOffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">
        <span className="ring-value">{value}</span>
        <span className="ring-outof">/ {max}</span>
        <span className="ring-label">Solved</span>
      </div>
    </div>
  );
};

// -------------------- Difficulty Bar --------------------
const DifficultyBar = ({ label, solved, total, color }) => {
  const percent = total > 0 ? (solved / total) * 100 : 0;
  return (
    <motion.div
      className="diff-bar"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="diff-header">
        <span className="diff-label">{label}</span>
        <span className="diff-numbers">
          {solved} <span className="diff-sep">/</span> {total}
        </span>
      </div>
      <div className="diff-track">
        <motion.div
          className="diff-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

// -------------------- Tag List --------------------
const TagList = ({ items }) => (
  <div className="d-flex flex-wrap gap-2">
    {items.map((item) => (
      <motion.span
        key={item}
        className="dsa-tag"
        whileHover={{ scale: 1.05, backgroundColor: '#6c5ce7', color: '#fff' }}
        transition={{ duration: 0.2 }}
      >
        {item}
      </motion.span>
    ))}
  </div>
);

// -------------------- Platform Tab Selector --------------------
const PlatformTabs = ({ platforms, activeKey, setActiveKey }) => {
  return (
    <div className="platform-tabs">
      {Object.entries(platforms).map(([key, platform]) => (
        <motion.button
          key={key}
          className={`platform-tab ${activeKey === key ? 'active' : ''}`}
          onClick={() => setActiveKey(key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {platform.name}
          {activeKey === key && (
            <motion.div
              className="tab-indicator"
              layoutId="tabIndicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

// -------------------- Main DSA Component --------------------
const DSA = () => {
  const [platforms, setPlatforms] = useState(null);
  const [activePlatform, setActivePlatform] = useState('leetcode');

  useEffect(() => {
    fetch('/content/dsa.json')
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data.platforms);
        // Set default active to first key if leetcode not present
        if (!data.platforms[activePlatform]) {
          setActivePlatform(Object.keys(data.platforms)[0]);
        }
      })
      .catch(() => {
        // fallback empty if file missing
        setPlatforms({});
      });
  }, []);

  if (!platforms) return null;  // or a loader

  const data = platforms[activePlatform];
  if (!data) return <div className="container py-5 text-center">Platform data missing.</div>;

  const totalUserProblems = data.easy + data.medium + data.hard;

  return (
    <div className="dsa-page">
      {/* Floating decorative shapes */}
      <div className="floating-shapes">
        <motion.div
          className="shape shape-1"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="shape shape-2"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="shape shape-3"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />
      </div>

      <div className="container py-5">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="dsa-heading">DSA & Problem Solving</h1>
          <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
            Platforms I use to sharpen my algorithmic skills.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <PlatformTabs
            platforms={platforms}
            activeKey={activePlatform}
            setActiveKey={setActivePlatform}
          />
        </motion.div>

        {/* Main Progress Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="row justify-content-center mb-5">
              <div className="col-lg-9">
                <div className="glass-card dsa-card p-4 p-md-5">
                  <div className="row align-items-center g-4">
                    {/* Left: Circular Ring */}
                    <div className="col-md-4 d-flex justify-content-center">
                      <CircularRing
                        key={activePlatform + '-ring'}
                        value={totalUserProblems}
                        max={data.totalProblems}
                        size={180}
                        strokeWidth={14}
                      />
                    </div>

                    {/* Right: Difficulty Breakdown */}
                    <div className="col-md-8">
                      <h4 className="mb-4">Difficulty Breakdown</h4>
                      <DifficultyBar
                        label="Easy"
                        solved={data.easy}
                        total={totalUserProblems}
                        color="#00b894"
                      />
                      <DifficultyBar
                        label="Medium"
                        solved={data.medium}
                        total={totalUserProblems}
                        color="#fdcb6e"
                      />
                      <DifficultyBar
                        label="Hard"
                        solved={data.hard}
                        total={totalUserProblems}
                        color="#e17055"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages & Topics */}
            <div className="row justify-content-center g-4 mb-5">
              <div className="col-md-5">
                <motion.div
                  className="glass-card dsa-card p-4 h-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="mb-3">Languages I Use</h4>
                  <TagList items={data.languages} />
                </motion.div>
              </div>
              <div className="col-md-5">
                <motion.div
                  className="glass-card dsa-card p-4 h-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="mb-3">Topics I Focus On</h4>
                  <TagList items={data.skills} />
                </motion.div>
              </div>
            </div>

            {/* Images & Profile Link */}
            <div className="row justify-content-center g-4">
              {data.images.map((img, idx) => (
                <div key={idx} className="col-md-4 text-center">
                  <motion.div
                    className="glass-card dsa-card p-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <img
                      src={img}
                      alt={`${data.name} screenshot ${idx + 1}`}
                      className="img-fluid rounded-4"
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add('dsa-placeholder');
                      }}
                    />
                    <p className="small text-muted mt-2">
                      {data.name} activity {idx + 1}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Profile button */}
            <div className="text-center mt-4">
              <motion.a
                href={data.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg rounded-pill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View {data.name} Profile
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DSA;