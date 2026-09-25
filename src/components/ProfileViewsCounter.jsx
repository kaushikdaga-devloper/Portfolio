// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SUPABASE_URL = "https://qwiolgwfvpxawomljjaz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qPYjTWwALnZcYZZpttRFaQ_zpI160XG"; 

const readCount = (data) => {
  const value = Array.isArray(data) ? data[0]?.value : data?.value ?? data;
  const count = Number(value);
  if (!Number.isFinite(count)) throw new Error('Invalid profile view count');
  return count;
};

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const visitKey = 'has_counted_profile_view';
    const hasVisitedThisSession = sessionStorage.getItem(visitKey);

    if (hasVisitedThisSession === 'true') {
      fetch(`${SUPABASE_URL}/rest/v1/analytics?key=eq.portfolio_views&select=value`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      })
        .then((response) => {
          if (!response.ok) throw new Error(`Supabase read failed (${response.status})`);
          return response.json();
        })
        .then((data) => setViews(readCount(data)))
        .catch((error) => {
          console.error('Profile views error:', error);
          setViews(null);
        });
      return;
    }

    sessionStorage.setItem(visitKey, 'true');

    fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_profile_views`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Supabase increment failed (${response.status})`);
      return response.json();
    })
    .then((updatedCount) => setViews(readCount(updatedCount)))
    .catch((error) => {
      console.error('Profile views error:', error);
      sessionStorage.removeItem(visitKey);
      setViews(null);
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
