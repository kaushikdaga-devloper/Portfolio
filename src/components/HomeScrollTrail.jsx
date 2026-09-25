import { useEffect, useState } from 'react';

const HomeScrollTrail = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      frameId = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setProgress(Math.min(Math.max(nextProgress, 0), 1));
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="home-scroll-trail" aria-hidden="true">
      <span className="home-scroll-trail-line" />
      <span
        className="home-scroll-trail-point"
        style={{ top: `${progress * 100}%` }}
      />
    </div>
  );
};

export default HomeScrollTrail;