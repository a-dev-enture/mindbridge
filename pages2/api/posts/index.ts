import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase-admin";
import { verifyUser } from "../../../utils/verifyUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const snapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const user = await verifyUser(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const { content } = req.body;
    const postRef = await db.collection("posts").add({
      content,
      uid: user.uid,
      createdAt: Date.now(),
    });
    res.status(201).json({ id: postRef.id });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
