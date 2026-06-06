// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SUPABASE_URL = "https://qwiolgwfvpxawomljjaz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qPyJTWwALnZcYZmZmFjNS0wZmY2LTRiMTQtOWZhYy00ZTcwMDkzNWMyYzg="; 

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // URL containing a cache-busting timestamp to avoid cached responses
    const url = `${SUPABASE_URL}/rest/v1/rpc/increment_views?t=${Date.now()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      return res.json();
    })
    .then((countResult) => {
      if (countResult !== undefined && countResult !== null) {
        setViews(Number(countResult));
      } else {
        throw new Error("Received an empty database payload response");
      }
    })
    .catch((error) => {
      console.error("Database counter initialization failure:", error);
      // Fallback number so the UI remains interactive if a network connection drops
      setViews(9); 
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
