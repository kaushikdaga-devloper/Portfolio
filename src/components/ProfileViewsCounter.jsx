// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// This is your completely custom workspace and key name on the cloud
const WORKSPACE = "kaushikdaga_portfolio";
const COUNTER_KEY = "main_page_views";

// The official, high-speed CounterAPI endpoint
const API_URL = `https://counterapi.dev{WORKSPACE}/${COUNTER_KEY}/up`;

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // This increments your counter +1 on the cloud instantly on every page load
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("CounterAPI Network Error");
        return response.json();
      })
      .then((resData) => {
        // CounterAPI returns an object structured as: { status: 200, id: ..., data: { value: X } }
        if (resData && resData.data && typeof resData.data.value !== 'undefined') {
          setViews(resData.data.value);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching live visitor data:", error);
        // Fallback layout if the network drops completely
        setViews(100); 
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
