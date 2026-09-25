// src/assistant/assistant.logic.js
let memory = [];
let messageCount = 0;
const MAX_MESSAGES = 25;

function resetConversation() {
  memory = [];
  messageCount = 0;
}

export async function handleAssistantQuery(userQuestion) {
  if (messageCount >= MAX_MESSAGES) {
    resetConversation();
    return (
      "To keep responses accurate, this conversation has been reset. " +
      "You can continue asking about the portfolio."
    );
  }

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userQuestion, history: memory }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Assistant API error:", data.error);
      return data.message || "The assistant is temporarily unavailable. Please try again.";
    }

    const answer = data.answer || "I could not generate a response.";
    memory.push({ role: "user", content: userQuestion });
    memory.push({ role: "assistant", content: answer });
    messageCount += 2;
    return answer;
  } catch (err) {
    console.error("Assistant request failed:", err);
    return "Network error while contacting the assistant.";
  }
}