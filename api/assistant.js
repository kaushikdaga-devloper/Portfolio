import { handleAssistantApi } from "../src/assistant/assistant.server.js";

async function getRequestBody(req) {
  if (req.body) return req.body;
  let rawBody = "";
  for await (const chunk of req) rawBody += chunk;
  return rawBody ? JSON.parse(rawBody) : {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const result = await handleAssistantApi({
      ...(await getRequestBody(req)),
      origin: `${protocol}://${host}`,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Assistant handler error:", error);
    return res.status(500).json({
      error: error.message,
      message: "The assistant is temporarily unavailable. Please try again.",
    });
  }
}