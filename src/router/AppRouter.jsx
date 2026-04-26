// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import DSA from '../pages/DSA';
import CoreCS from '../pages/CoreCS';
import Achievements from '../pages/Achievements';
import Experience from '../pages/Experience';
import Blog from '../pages/Blog';
import OpenSource from '../pages/OpenSource';
import Testimonials from '../pages/Testimonials';
import PageNotFound from '../pages/PageNotFound';
import ProjectDetail from '../sections/projects/pages/ProjectDetail';

const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/dsa" element={<DSA />} />
      <Route path="/core-cs" element={<CoreCS />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/open-source" element={<OpenSource />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default AppRouter;