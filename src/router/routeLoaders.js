const routeLoaders = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/contact': () => import('../pages/Contact'),
  '/projects': () => import('../pages/Projects'),
  '/dsa': () => import('../pages/DSA'),
  '/core-cs': () => import('../pages/CoreCS'),
  '/achievements': () => import('../pages/Achievements'),
  '/experience': () => import('../pages/Experience'),
  '/open-source': () => import('../pages/OpenSource'),
  '/404': () => import('../pages/PageNotFound'),
  projectDetail: () => import('../sections/projects/pages/ProjectDetail'),
};

export const loadRoute = (path) => {
  const loader = path.startsWith('/projects/')
    ? routeLoaders.projectDetail
    : routeLoaders[path] || routeLoaders['/404'];

  return loader();
};

export default routeLoaders;