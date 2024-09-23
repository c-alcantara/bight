import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.NEXT_PRIVATE_VAPI_API_KEY;
const assistantId = process.env.NEXT_PRIVATE_VAPI_ASSISTANT_ID;

console.log("Assistant ID:", assistantId); // Keep this for debugging

if (!assistantId) {
  console.error(
    "NEXT_PRIVATE_VAPI_ASSISTANT_ID is not defined in the environment variables"
  );
  // Handle this case in the request handler
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      action,
      conversationId,
      message,
      instructions,
      additional_instructions,
      runId,
    } = req.body;

    if (!assistantId) {
      return res.status(500).json({ error: "Assistant ID is not configured" });
    }

    try {
      switch (action) {
        case "createConversation":
          const createConversationResponse = await axios.post(
            "https://api.vapi.ai/conversation",
            { assistant_id: assistantId },
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );
          res.status(200).json(createConversationResponse.data);
          break;

        case "listMessages":
          const listMessagesResponse = await axios.get(
            `https://api.vapi.ai/conversation/${conversationId}/messages`,
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );
          res.status(200).json(listMessagesResponse.data);
          break;

        case "sendMessage":
          const sendMessageResponse = await axios.post(
            `https://api.vapi.ai/conversation/${conversationId}/message`,
            { message },
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );
          res.status(200).json(sendMessageResponse.data);
          break;

        case "startRun":
          if (typeof conversationId !== "string") {
            return res.status(400).json({ error: "Invalid conversationId" });
          }

          const startRunResponse = await axios.post(
            `https://api.vapi.ai/conversation/${conversationId}/run`,
            {
              assistant_id: assistantId,
              instructions,
              additional_instructions,
            },
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );
          res.status(200).json({
            id: startRunResponse.data.id,
            status: startRunResponse.data.status,
          });
          break;

        case "getRun":
          const getRunResponse = await axios.get(
            `https://api.vapi.ai/conversation/${conversationId}/run/${runId}`,
            { headers: { Authorization: `Bearer ${apiKey}` } }
          );
          res.status(200).json(getRunResponse.data);
          break;

        default:
          res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Error processing your request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
