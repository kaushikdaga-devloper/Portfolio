export const ASSISTANT_INTENTS = {
  PROJECTS_OVERVIEW: {
    keywords: ["projects", "work", "portfolio"],
    description: "Explain what kind of projects are included",
  },

  PROJECT_EXPLAIN: {
    keywords: ["explain", "project", "how", "what is"],
    description: "Explain a specific project using its content",
  },

  SKILLS_OVERVIEW: {
    keywords: ["skills", "technologies", "tools"],
    description: "Summarize skills listed on the site",
  },

  DOMAIN_EXPLAIN: {
    keywords: ["cybersecurity", "dsa", "core cs", "computer science"],
    description: "Explain a domain section",
  },

  NAVIGATION_HELP: {
    keywords: ["where", "find", "navigate", "read next"],
    description: "Help user find content on the site",
  },
};

export const FALLBACK_RESPONSES = {
  UNKNOWN: "I don’t have information about that here.",
  OUT_OF_SCOPE:
    "I can only help explain the content and structure of this site.",
};
