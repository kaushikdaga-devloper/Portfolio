// src/assistant/assistant.guard.js
// No more keyword‑based blocking – the LLM will handle relevance.
export function isAllowedQuestion(question) {
  return true; // all questions pass through
}

export const REFUSAL_MESSAGE =
  "I can only answer questions related to Kaushik's portfolio, projects, skills, experience, achievements, and education.";