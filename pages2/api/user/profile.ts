import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase-admin";
import { verifyUser } from "../../../utils/verifyUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const userRef = db.collection("users").doc(user.uid);

  if (req.method === "GET") {
    const doc = await userRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(doc.data());
  } else if (req.method === "POST") {
    const { displayName, bio } = req.body;
    await userRef.set({ displayName, bio }, { merge: true });
    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
