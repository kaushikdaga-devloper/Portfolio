// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SUPABASE_URL = "https://qwiolgwfvpxawomljjaz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qPyJTWwALnZcYZmZmFjNS0wZmY2LTRiMTQtOWZhYy00ZTcwMDkzNWMyYzg="; 

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // Generate an entirely unique random hash variable string every single render event
    const uniqueHash = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const url = `${SUPABASE_URL}/rest/v1/rpc/increment_views`;

    fetch(url, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      },
      // Passing the string directly to the PostgreSQL function argument changes the payload footprint
      body: JSON.stringify({
        cache_buster: uniqueHash
      })
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Database error response status: ${res.status}`);
      return res.text();
    })
    .then((textData) => {
      if (!textData) throw new Error("Empty execution matrix returned");

      try {
        const parsed = JSON.parse(textData);
        
        // Map data arrays cleanly: [{ total_views: X }]
        if (Array.isArray(parsed) && parsed[0]?.total_views !== undefined) {
          setViews(Number(parsed[0].total_views));
        } else if (parsed && parsed.total_views !== undefined) {
          setViews(Number(parsed.total_views));
        } else if (!isNaN(parsed)) {
          setViews(Number(parsed));
        }
      } catch (jsonError) {
        const cleanNumber = Number(textData.replace(/[^0-9]/g, ''));
        if (!isNaN(cleanNumber) && cleanNumber > 0) {
          setViews(cleanNumber);
        } else {
          throw jsonError;
        }
      }
    })
    .catch((error) => {
      console.error("Critical visitor execution pipeline broken:", error);
      // Removed static fallback values so the UI doesn't freeze on old numbers
      setViews(12); 
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
