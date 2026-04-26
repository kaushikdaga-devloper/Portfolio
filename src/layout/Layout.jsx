// src/layout/Layout.jsx
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AssistantWidget from '../assistant/AssistantWidget';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Layout = () => {
  const location = useLocation();
  useScrollReveal(); // optional, keep for legacy data-reveal elements

  return (
    <>
      <Header />
      {/* key forces React to fully remount the page component on every navigation */}
      <div className="page-fade-in" key={location.pathname}>
        <Outlet />
      </div>
      <Footer />
      <AssistantWidget />
    </>
  );
};

export default Layout;