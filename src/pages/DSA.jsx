import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const difficultyMeta = [
  { key: 'easy', label: 'Easy', color: '#00b894' },
  { key: 'medium', label: 'Medium', color: '#fdcb6e' },
  { key: 'hard', label: 'Hard', color: '#e17055' },
];

const StatTile = ({ value, label, accent }) => (
  <div className="dsa-stat-tile">
    <strong style={{ color: accent }}>{value}</strong>
    <span>{label}</span>
  </div>
);

const TagGroup = ({ label, items }) => (
  <div className="dsa-focus-group">
    <span className="dsa-eyebrow">{label}</span>
    <div className="dsa-tags">
      {items.map((item) => <span className="dsa-tag" key={item}>{item}</span>)}
    </div>
  </div>
);

const DSA = () => {
  const [platforms, setPlatforms] = useState(null);
  const [activePlatform, setActivePlatform] = useState('leetcode');

  useEffect(() => {
    fetch('/content/dsa.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load DSA data');
        return response.json();
      })
      .then((data) => {
        setPlatforms(data.platforms);
        if (!data.platforms[activePlatform]) setActivePlatform(Object.keys(data.platforms)[0]);
      })
      .catch(() => setPlatforms({}));
  }, [activePlatform]);

  if (!platforms) return null;
  const data = platforms[activePlatform];
  if (!data) return <div className="container py-5 text-center">Problem-solving data is unavailable.</div>;

  const solved = data.totalSolved ?? data.easy + data.medium + data.hard;

  return (
    <main className="dsa-page">
      <div className="dsa-page-glow" aria-hidden="true" />
      <div className="container dsa-shell">
        <motion.header className="dsa-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div>
            <span className="dsa-eyebrow">Algorithmic practice / 01</span>
            <h1>Thinking in <span>patterns.</span></h1>
            <p>Selected problem-solving progress across the platforms I use to sharpen fundamentals and build better systems.</p>
          </div>
          <a className="dsa-profile-link" href={data.profileUrl} target="_blank" rel="noreferrer">Open {data.name} <span aria-hidden="true">-&gt;</span></a>
        </motion.header>

        <div className="dsa-platform-bar" role="tablist" aria-label="Problem-solving platforms">
          {Object.entries(platforms).map(([key, platform]) => (
            <button key={key} className={activePlatform === key ? 'active' : ''} onClick={() => setActivePlatform(key)} role="tab" aria-selected={activePlatform === key}>{platform.name}</button>
          ))}
          <span className="dsa-data-note">Portfolio snapshot</span>
        </div>

        <motion.section className="dsa-overview-grid" key={activePlatform} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="dsa-summary-panel">
            <div className="dsa-panel-heading"><div><span className="dsa-eyebrow">Current snapshot</span><h2>{data.name} progress</h2></div><span className="dsa-total-badge">{solved} solved</span></div>
            <div className="dsa-stat-grid">
              <StatTile value={solved} label="Problems solved" accent="var(--color-accent-light)" />
              <StatTile value={data.languages.length} label="Languages" accent="#55efc4" />
              <StatTile value={data.skills.length} label="Focus areas" accent="#ffeaa7" />
            </div>
          </div>

          <div className="dsa-difficulty-panel">
            <div className="dsa-panel-heading"><div><span className="dsa-eyebrow">By difficulty</span><h2>Where the work goes</h2></div></div>
            <div className="dsa-difficulty-list">
              {difficultyMeta.map(({ key, label, color }) => {
                const value = data[key];
                const percentage = data.difficultyShare?.[key] ?? 0;
                return <div className="dsa-difficulty-row" key={key}><div><span><i style={{ background: color }} />{label}</span><strong>{value}</strong></div><span className="dsa-progress-track"><span style={{ width: `${percentage}%`, background: color }} /></span></div>;
              })}
            </div>
          </div>
        </motion.section>

        <section className="dsa-focus-grid"><TagGroup label="Languages in rotation" items={data.languages} /><TagGroup label="Concepts in focus" items={data.skills} /></section>

        <section className="dsa-sync-note">
          <div><span className="dsa-eyebrow">Keeping it honest</span><h2>Stats are maintained as a portfolio snapshot.</h2><p>LeetCode does not provide a stable public browser API for automatic profile syncing. The profile link above always opens the live source.</p></div>
          <a href={data.profileUrl} target="_blank" rel="noreferrer" className="dsa-outline-link">See live profile <span aria-hidden="true">-&gt;</span></a>
        </section>
      </div>
    </main>
  );
};

export default DSA;
