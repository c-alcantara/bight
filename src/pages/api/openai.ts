import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PRIVATE_OPENAI_API_KEY });
const assistantId = process.env.NEXT_PRIVATE_ASSISTANT_ID;
console.log("Assistant ID:", assistantId); // Keep this for debugging

if (!assistantId) {
  console.error(
    "NEXT_PRIVATE_ASSISTANT_ID is not defined in the environment variables"
  );
  // Instead of throwing an error, we'll handle it in the request handler
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      action,
      threadId,
      content,
      instructions,
      additional_instructions,
      runId,
    } = req.body;

    if (!assistantId) {
      return res.status(500).json({ error: "Assistant ID is not configured" });
    }

    try {
      switch (action) {
        case "createThread":
          const thread = await openai.beta.threads.create();
          res.status(200).json(thread);
          break;

        case "listMessages":
          const messages = await openai.beta.threads.messages.list(threadId);
          res.status(200).json(messages);
          break;

        case "createMessage":
          await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: content,
          });
          res.status(200).json({ success: true });
          break;

        case "createRun":
          if (typeof threadId !== "string") {
            return res.status(400).json({ error: "Invalid threadId" });
          }
          const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
            instructions: instructions || undefined,
            additional_instructions: additional_instructions || undefined,
          });
          res.status(200).json({ id: run.id, status: run.status });
          break;

        case "retrieveRun":
          const retrievedRun = await openai.beta.threads.runs.retrieve(
            threadId,
            runId
          );
          res.status(200).json(retrievedRun);
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
