# Kaushik Daga | Personal Portfolio

A polished, content-driven personal portfolio for **Kaushik Daga**, a software developer focused on full-stack engineering, algorithmic problem solving, systems thinking, and practical product development.

The site is more than a collection of pages. It is an interactive professional profile with a portfolio-aware AI assistant, structured project case studies, live navigation, performance-conscious motion, and JSON-powered content.

## Personal Portfolio Assistant

The first-class feature of this portfolio is Kaushik's personal AI assistant.

Visitors can open the assistant directly from the floating chat button or from the home-page prompt and ask questions such as:

- What projects has Kaushik built?
- What technologies does he use?
- What achievements or certifications does he have?
- What is his experience?
- How can I contact him?
- Can you take me to a specific project or section?

### How the assistant works

1. The visitor submits a question from the React chat interface.
2. The frontend sends the question and recent conversation history to `/api/assistant`.
3. The server loads the portfolio's JSON content as context.
4. The server sends the grounded context to Groq's OpenAI-compatible chat API.
5. The response is returned as Markdown and rendered inside the assistant panel.
6. Optional action buttons can navigate to internal portfolio routes or open external links.

The assistant is deliberately constrained to the portfolio context. When information is unavailable, it communicates that clearly instead of inventing an answer.

### Assistant capabilities

- Portfolio-aware answers grounded in the site's content
- Markdown response rendering
- GitHub-style Markdown support through `remark-gfm`
- Internal navigation buttons
- External action links
- Conversation history for contextual follow-up questions
- Message limit and automatic conversation reset for bounded client-side memory
- Loading, error, and network-failure states
- Responsive chat panel for desktop and mobile
- Visibility-aware animation handling
- Secure server-side API key usage through environment variables

## Portfolio Features

### Home

The home page introduces Kaushik through a focused developer profile:

- Animated role rotation for Developer, Problem Solver, and Systems Thinker
- Personal introduction and summary
- Profile image and visitor counter
- GitHub and resume actions
- Skills grouped by discipline
- Featured project cards with descriptions, tags, status, and navigation
- Education and learning information
- Achievement highlights
- Contact call-to-action
- Experimental scroll-progress trail

### Projects

The projects area is designed for quick scanning and deeper exploration:

- Dynamic project count and project overview statistics
- Active-build count
- Core technology count derived from project tags
- Responsive project card grid
- Project summaries directly on each card
- Technology tags and project status indicators
- Keyboard focus states and accessible card labels
- Dedicated project detail routes
- Technical sections for project overview, problem, approach, technology, learnings, notes, and status
- Screenshot carousel and image lightbox support where available

Project index content is stored in `public/content/projects/index.json`. Individual project case-study content lives under `public/content/projects/projects/`.

### About

- Developer profile and biography
- Education and engineering focus
- DSA, project, platform, and coding statistics
- GitHub, LinkedIn, and email actions
- Responsive profile presentation

### DSA

- Platform-based problem-solving snapshots
- Easy, medium, and hard problem breakdowns
- Solved count, language count, and focus-area metrics
- Skills and concept tags
- Direct links to live coding profiles
- Platform switching without leaving the page

### Core Computer Science

A structured overview of foundational topics:

- Operating systems
- Database management systems
- Computer networks
- Object-oriented programming
- Concurrency, memory, indexing, protocols, security, and design principles

### Experience

- Timeline-style experience cards
- Role, organization, duration, description, and technology badges
- JSON-powered experience content

### Achievements and Certifications

- Achievement and certification cards
- Organization, description, date, and certificate links
- Certificate image previews
- Full-screen certificate lightbox
- Graceful image fallback behavior

### Open Source

- GitHub repository overview
- Contribution graph
- Repository cards with description, language, stars, and forks
- Direct links to GitHub repositories

### Contact

- Contact form interaction
- Email, phone, and location details
- Social links
- Responsive layout for desktop and mobile

## Design and UX

The interface uses a dark-first visual system with a corresponding light theme:

- Space Grotesk and Inter typography
- Purple accent gradient used as a controlled brand signal
- Glass-inspired surfaces and borders
- Responsive Bootstrap layout primitives
- Framer Motion page and component transitions
- Keyboard-visible focus states on interactive project cards
- Mobile-specific spacing and navigation behavior
- Browser-tab favicon using the profile image
- Home-page assistant prompt that avoids covering the visitor counter

The design favors compact information hierarchy over generic marketing sections. Cards expose useful context immediately, while dedicated detail pages provide depth when the visitor wants it.

## Performance Work

Performance is treated as a progressive optimization effort rather than a visual downgrade.

Implemented optimizations include:

- Page-level code splitting with `React.lazy`
- Route prefetching when navigation links receive hover or keyboard focus
- Lazy loading and asynchronous decoding for below-the-fold images
- High-priority loading for above-the-fold profile images
- Viewport-aware pause and resume for continuous decorative animations
- Typewriter timer pause when the home intro is outside the viewport
- Browser-tab visibility handling for assistant animations
- Strict low-end device mode for very constrained hardware
- Reduced blur and backdrop-filter cost on low-end devices while retaining motion
- Responsive layout and mobile-specific controls

The low-end mode is intentionally conservative. It targets devices reporting approximately 1GB memory or 2 or fewer CPU threads; capable devices retain the full visual experience.

## Content Architecture

The public portfolio is currently content-driven through JSON files. This keeps content separate from page components and makes routine updates straightforward.

```text
public/content/
├── achievements.json
├── blog.json
├── dsa.json
├── experience.json
├── home/
│   └── home.json
└── projects/
    ├── index.json
    └── projects/
        ├── smart-travel-planner.json
        ├── test-project.json
        └── video-connect.json
```

Typical content workflow:

1. Edit the relevant JSON file.
2. Keep the existing field structure.
3. Run the production build.
4. Review the affected page locally.
5. Deploy the updated site.

A future administration dashboard can replace these static JSON reads with authenticated database-backed content management without requiring a redesign of the public interface.

## Technology Stack

### Frontend

- React 19
- React Router
- Vite
- Framer Motion
- Bootstrap 5
- React Markdown
- Remark GFM

### Backend and services

- Vercel serverless API route for the assistant
- Groq chat completion API
- Supabase-backed profile view counter
- Supabase RPC for atomic profile-view increments
- GitHub API for open-source repository data

### Tooling

- ESLint
- Vite production builds
- GitHub repository deployment workflow

## Project Structure

```text
.
├── api/
│   └── assistant.js              # Serverless assistant endpoint
├── public/
│   ├── assets/                   # Images and public media
│   └── content/                  # JSON portfolio content
├── src/
│   ├── assistant/                # Assistant UI, API logic, and context loading
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Scroll reveal and performance hooks
│   ├── layout/                   # Header, footer, and shared layout
│   ├── pages/                    # Route-level page components
│   ├── router/                   # Routes, lazy loaders, and prefetching
│   ├── sections/                 # Reusable page sections and project detail sections
│   └── styles/                   # Theme, layout, page, and component styles
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Local Development

### Requirements

- Node.js 18 or newer
- npm
- A Groq API key for assistant responses
- Supabase configuration is already used by the profile counter implementation

### Installation

```bash
npm install
```

Create a local `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Never commit `.env` or any file containing a real API key. Environment files are ignored by Git.

### Start the development server

```bash
npm run dev
```

The Vite development server includes the local `/api/assistant` middleware configured in `vite.config.js`.

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

The build is the primary production validation command. Lint may report existing cleanup issues in unrelated legacy files and should be reviewed separately from build correctness.

## Deployment

The project is configured for Vercel-style deployment:

1. Connect the GitHub repository to Vercel.
2. Set `GROQ_API_KEY` in the Vercel project environment variables.
3. Deploy the repository.
4. Confirm `/api/assistant` is available in the deployed environment.
5. Test navigation, assistant responses, project routes, and the light theme in production.

The `vercel.json` rewrite sends application routes back to `index.html`, allowing React Router routes to work when opened directly.

## Security Notes

- API keys belong in environment variables, never in source files or example files.
- The Groq key is read on the server through `process.env.GROQ_API_KEY`.
- The assistant endpoint accepts `POST` requests only.
- Assistant history is filtered to valid user and assistant messages and bounded before being sent upstream.
- External assistant links open in a separate tab with `noopener,noreferrer`.
- Public Supabase keys are not equivalent to server secrets, but database policies and RPC permissions must still be configured correctly.

## Roadmap

- Authenticated content-management dashboard
- Database-backed project and portfolio content
- Draft and publish workflow
- Image and certificate uploads
- Project preview before publishing
- More granular performance profiling on older devices
- Automated visual and accessibility testing
- Further bundle analysis and dependency optimization

## License

This repository represents a personal portfolio. The source can be inspected for learning and reference, but portfolio content, personal information, imagery, and branding should not be reused without permission.

## Contact

**Kaushik Daga**

- Email: [kaushikdaga05@gmail.com](mailto:kaushikdaga05@gmail.com)
- GitHub: [kaushikdaga-devloper](https://github.com/kaushikdaga-devloper)
- LinkedIn: [Kaushik Daga](https://linkedin.com/in/kaushik-daga)
- Location: Hyderabad, India
