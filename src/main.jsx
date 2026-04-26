import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Theme tokens (must come first)
import './styles/theme.css';

// Shared base
import './styles/base.css';
import './styles/layout.css';

// Page‑specific styles
import './styles/home.css';
import './styles/projects.css';
import './styles/dsa.css';
import './styles/about.css';
import './styles/contact.css';
import './styles/corecs.css';
import './styles/achievements.css';
import './styles/experience.css';
import './styles/blog.css';
import './styles/opensource.css';
import './styles/testimonials.css';

// Components
import './styles/assistant.css';
import './styles/profile-views.css';
import './styles/page-transition.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);