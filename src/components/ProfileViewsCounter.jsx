// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// This is your unique tracking key assigned to your Vercel URL
const UNIQUE_KEY = "kaushikdaga_portfolio_counter";

// Corrected API endpoint using proper backticks and the global cloud tracker
const API_URL = `https://vercel.app{UNIQUE_KEY}`;

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // Fetches the global counter from the cloud server and adds 1
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("API network error");
        return response.json();
      })
      .then((data) => {
        // Successfully fetched data.value from the cloud
        setViews(data.value);
      })
      .catch((error) => {
        console.error("Error updating global visitor count:", error);
        // Fallback so your text layout doesn't break if the server lags
        setViews('Many'); 
      });
  }, []);

  return (
    <motion.div
      className="profile-views-badge"
      initial={{ opacity: 0, y: 10 }}
      animate={views !== null ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="views-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
      <span className="views-members-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </span>
      <span className="views-text">
        Viewed by <strong>{views !== null ? views : '...'}</strong> visitors
      </span>
    </motion.div>
  );
};

export default ProfileViewsCounter;
