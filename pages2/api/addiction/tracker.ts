import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase-admin";
import { verifyUser } from "../../../utils/verifyUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const trackerRef = db.collection("addictionTrackers").doc(user.uid);

  if (req.method === "GET") {
    const doc = await trackerRef.get();
    res.status(200).json(doc.exists ? doc.data() : {});
  } else if (req.method === "POST") {
    const { date, status } = req.body; // e.g., {date: '2025-07-11', status: 'sober'}
    await trackerRef.set({ [date]: status }, { merge: true });
    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}