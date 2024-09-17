import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

async function checkDuplicate(data: any) {
  const { name, email, phone, event } = data;

  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
    [
      Query.equal('name', name),
      Query.equal('email', email),

    ],
  );

  return response.total > 0;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const isDuplicate = await checkDuplicate(req.body);

      if (isDuplicate) {
        res.status(400).json({ success: false, error: "This event was already recorded." });
        return;
      }

      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        ID.unique(),
        req.body,
      );

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



