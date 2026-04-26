// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import IntroSection from '../sections/home/IntroSection';
import SkillsSection from '../sections/home/SkillsSection';
import EducationSection from '../sections/home/EducationSection';
import CurrentlyLearningSection from '../sections/home/CurrentlyLearningSection';
import FeaturedProjectsSection from '../sections/home/FeaturedProjectsSection';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/content/home/home.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="home-page">
      {data.sections.map((section) => {
        if (!section.enabled) return null;
        switch (section.type) {
          case 'intro':
            return <IntroSection key={section.id} data={section.data} />;
          case 'skills':
            return <SkillsSection key={section.id} data={section.data} />;
          default:
            return null;
        }
      })}
      <EducationSection />
      <CurrentlyLearningSection />
      <FeaturedProjectsSection />
      {/* Compact Contact CTA */}
      <section className="py-6 text-center">
        <div className="container">
          <h2 className="section-title mb-4 mt-5">Let's Work Together</h2>
          <p className="lead mx-auto mb-4">I'm currently open to opportunities and collaborations.</p>
          <Link to="/contact" className="btn btn-primary btn-lg rounded-pill">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;