// src/assistant/assistant.logic.js
import { isAllowedQuestion, REFUSAL_MESSAGE } from "./assistant.guard";

let memory = [];
let messageCount = 0;
const MAX_MESSAGES = 25;

function resetConversation() {
  memory = [];
  messageCount = 0;
}

async function loadFullPortfolioContext() {
  const endpoints = [
    { key: "Home / Intro", url: "/content/home/home.json" },
    { key: "Projects", url: "/content/projects/index.json" },
    { key: "Achievements & Certifications", url: "/content/achievements.json" },
    { key: "Experience & Activities", url: "/content/experience.json" },
    { key: "Blog / Learning Journal", url: "/content/blog.json" },
    { key: "Testimonials", url: "/content/testimonials.json" },
  ];

  let context = "";

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint.url);
      if (!res.ok) continue;
      const data = await res.json();
      context += `----- ${endpoint.key} -----\n`;
      if (Array.isArray(data)) {
        data.forEach((item, idx) => {
          context += `${idx + 1}. ${JSON.stringify(item, null, 2)}\n\n`;
        });
      } else if (data.sections) {
        data.sections.forEach((section) => {
          if (section.enabled) {
            context += `Section: ${section.type}\n${JSON.stringify(section.data, null, 2)}\n\n`;
          }
        });
      } else {
        context += JSON.stringify(data, null, 2) + "\n\n";
      }
    } catch (err) {
      continue;
    }
  }

  context += `----- About Kaushik -----\n`;
  context += `Name: Kaushik Daga\n`;
  context += `Education: B.Tech CS(AI&ML) at Guru Nanak Institute of Technology, 6th Semester, CGPA 8.73\n`;
  context += `Location: Hyderabad, India\n`;
  context += `Contact: kaushikdaga05@gmail.com | +91 7989774645\n`;
  context += `LinkedIn: https://linkedin.com/in/kaushik-daga\n`;
  context += `GitHub: https://github.com/kaushikdaga-devloper\n`;
  context += `LeetCode: https://leetcode.com/u/your-username (150+ problems)\n`;
  context += `Skills: C, C++, JavaScript, Python, React, Node.js, MongoDB, Linux, DSA\n`;

  return context;
}

async function callLLM(systemPrompt, userPrompt) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer REMOVED_API_KEY",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...memory,
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("LLM error:", response.status, errText);
      return "The assistant is temporarily unavailable. Please try again.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("LLM request failed:", err);
    return "Network error while contacting the assistant.";
  }
}

export async function handleAssistantQuery(userQuestion) {
  if (messageCount >= MAX_MESSAGES) {
    resetConversation();
    return (
      "To keep responses accurate, this conversation has been reset. " +
      "You can continue asking about the portfolio."
    );
  }

  const portfolioContext = await loadFullPortfolioContext();
  if (!portfolioContext) {
    return "Portfolio information is currently unavailable.";
  }

  const SYSTEM_PROMPT = `
You are Kaushik's personal portfolio assistant.
You answer questions about Kaushik's education, skills, projects, achievements, experience, contact info, blog, and anything else found in the portfolio content.
You answer in a friendly, professional, and concise manner.

You can include **Markdown** formatting: **bold**, *italic*, \`code\`, and [links](url).

Additionally, you can insert **action buttons** that navigate the user directly. Use the syntax:
[button:LABEL|URL]
For example:
[button:View Smart Travel Planner|/projects/smart-travel-planner]
[button:Contact Kaushik|/contact]
[button:View GitHub|https://github.com/kaushikdaga-devloper]
Always use these buttons when you want to guide the user to a specific section or external link.

If the answer is not in the content, say: "I don’t have that information, but I can help with anything about Kaushik's portfolio."
Tone: friendly, professional, concise.
`;

  const FINAL_PROMPT = `
PORTFOLIO CONTENT:
${portfolioContext}

USER QUESTION:
${userQuestion}
`;

  const answer = await callLLM(SYSTEM_PROMPT, FINAL_PROMPT);

  memory.push({ role: "user", content: userQuestion });
  memory.push({ role: "assistant", content: answer });
  messageCount += 2;

  return answer;
}