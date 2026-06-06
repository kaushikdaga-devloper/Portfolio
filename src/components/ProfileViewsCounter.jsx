// src/components/ProfileViewsCounter.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SUPABASE_URL = "https://qwiolgwfvpxawomljjaz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qPyJTWwALnZcYZmZmFjNS0wZmY2LTRiMTQtOWZhYy00ZTcwMDkzNWMyYzg="; 

const ProfileViewsCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // 1. First, check if this browser tab session has already contributed a view increment
    const hasVisitedThisSession = sessionStorage.getItem('has_counted_profile_view');
    const selectUrl = `${SUPABASE_URL}/rest/v1/analytics?key=eq.portfolio_views&select=value`;

    // 2. Fetch the absolute latest global row integer value from the cloud
    fetch(selectUrl, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      const currentCount = data && data[0] ? Number(data[0].value) : 11;

      // 3. If they ALREADY incremented during this browser session, just show the live global count
      if (hasVisitedThisSession === 'true') {
        setViews(currentCount);
        return;
      }

      // 4. Otherwise, calculate the fresh incremented value
      const updatedCount = currentCount + 1;

      // 5. Update the global cloud database safely
      fetch(`${SUPABASE_URL}/rest/v1/analytics?key=eq.portfolio_views`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ value: updatedCount })
      })
      .then(() => {
        // Mark session tracking flag active so rapid refreshes don't double count or trigger Vercel caching locks
        sessionStorage.setItem('has_counted_profile_view', 'true');
        setViews(updatedCount);
      })
      .catch(() => {
        setViews(currentCount);
      });
    })
    .catch((error) => {
      console.error("Supabase engine fallback hook initialization error:", error);
      setViews(11); 
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
