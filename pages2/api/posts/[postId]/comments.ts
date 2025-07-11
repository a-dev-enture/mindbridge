import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase-admin";
import { verifyUser } from "../../../../utils/verifyUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  const commentsRef = db.collection("posts").doc(postId as string).collection("comments");

  if (req.method === "GET") {
    const snapshot = await commentsRef.orderBy("createdAt", "asc").get();
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const user = await verifyUser(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const { text } = req.body;
    const commentRef = await commentsRef.add({
      text,
      uid: user.uid,
      createdAt: Date.now(),
    });
    res.status(201).json({ id: commentRef.id });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}