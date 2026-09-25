import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeAchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch('/content/achievements.json')
      .then((response) => response.json())
      .then(setAchievements)
      .catch(() => setAchievements([]));
  }, []);

  return (
    <section className="home-achievements-section py-6" id="achievements">
      <div className="container">
        <motion.div
          className="home-achievements-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="home-section-kicker">Proof of practice</span>
            <h2 className="section-title mb-2">Achievements &amp; Certifications</h2>
            <p className="home-achievements-intro">
              Milestones, credentials, and the work behind them.
            </p>
          </div>
          <Link to="/achievements" className="home-achievements-link">
            View all <span aria-hidden="true">-&gt;</span>
          </Link>
        </motion.div>

        <div className="home-achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.article
              key={`${achievement.title}-${index}`}
              className={`home-achievement-card ${index === 0 ? 'is-featured' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <div className="home-achievement-topline">
                <span className="home-achievement-icon" aria-hidden="true">{achievement.icon}</span>
                <span className="home-achievement-date">{achievement.date}</span>
              </div>
              <h3>{achievement.title}</h3>
              <p className="home-achievement-org">{achievement.organization}</p>
              <p className="home-achievement-description">{achievement.description}</p>
              {achievement.certificateLink && achievement.certificateLink !== '#' && (
                <a
                  href={achievement.certificateLink}
                  target={achievement.certificateLink.startsWith('http') ? '_blank' : undefined}
                  rel={achievement.certificateLink.startsWith('http') ? 'noreferrer' : undefined}
                  className="home-achievement-action"
                >
                  {achievement.certificateLink === '/dsa' ? 'Explore DSA' : 'View credential'}
                  <span aria-hidden="true">-&gt;</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAchievementsSection;