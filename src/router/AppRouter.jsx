// src/router/AppRouter.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import routeLoaders from './routeLoaders';

const Home = lazy(routeLoaders['/']);
const About = lazy(routeLoaders['/about']);
const Contact = lazy(routeLoaders['/contact']);
const Projects = lazy(routeLoaders['/projects']);
const DSA = lazy(routeLoaders['/dsa']);
const CoreCS = lazy(routeLoaders['/core-cs']);
const Achievements = lazy(routeLoaders['/achievements']);
const Experience = lazy(routeLoaders['/experience']);
const OpenSource = lazy(routeLoaders['/open-source']);
const PageNotFound = lazy(routeLoaders['/404']);
const ProjectDetail = lazy(routeLoaders.projectDetail);

const AppRouter = () => (
  <Suspense fallback={<div className="container py-5 text-center">Loading page...</div>}>
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
        <Route path="/open-source" element={<OpenSource />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRouter;