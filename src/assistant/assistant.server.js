const endpoints = [
  { key: "Home / Intro", path: "/content/home/home.json" },
  { key: "Projects", path: "/content/projects/index.json" },
  { key: "Achievements & Certifications", path: "/content/achievements.json" },
  { key: "Experience & Activities", path: "/content/experience.json" },
  { key: "Blog / Learning Journal", path: "/content/blog.json" },
  { key: "Testimonials", path: "/content/testimonials.json" },
];

async function loadPortfolioContext(origin) {
  let context = "";
  for (const endpoint of endpoints) {
    const response = await fetch(new URL(endpoint.path, origin));
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) continue;
    const data = await response.json();
    context += `----- ${endpoint.key} -----\n${JSON.stringify(data, null, 2)}\n\n`;
  }
  return `${context}----- About Kaushik -----\nName: Kaushik Daga\nEducation: B.Tech CS(AI&ML) at Guru Nanak Institute of Technology, 6th Semester, CGPA 8.70\nLocation: Hyderabad, India\nContact: kaushikdaga05@gmail.com | +91 7989774645\nLinkedIn: https://linkedin.com/in/kaushik-daga\nGitHub: https://github.com/kaushikdaga-devloper\nSkills: C, C++, JavaScript, Python, React, Node.js, MongoDB, Linux, DSA`;
}

export async function handleAssistantApi({ question, history = [], origin }) {
  const apiKey = globalThis.process?.env?.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured");
  if (typeof question !== "string" || !question.trim()) {
    return { answer: "Please enter a question about Kaushik's portfolio." };
  }

  const portfolioContext = await loadPortfolioContext(origin);
  const systemPrompt = `You are Kaushik's personal portfolio assistant. Answer only from the portfolio context below, in a friendly, concise manner. Use Markdown and action buttons in the format [button:LABEL|URL] when useful. If information is missing, say: "I don't have that information, but I can help with anything about Kaushik's portfolio."\n\nPORTFOLIO CONTEXT:\n${portfolioContext}`;
  const messages = Array.isArray(history)
    ? history.filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string").slice(-24)
    : [];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "system", content: systemPrompt }, ...messages, { role: "user", content: question.trim() }],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Groq API error:", response.status, details);
    throw new Error(`Groq API returned ${response.status}`);
  }
  const data = await response.json();
  return { answer: data.choices?.[0]?.message?.content || "I could not generate a response." };
}