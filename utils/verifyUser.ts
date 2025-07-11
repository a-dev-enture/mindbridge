import { adminAuth } from "../lib/firebase-admin";
import type { NextApiRequest } from "next";

export async function verifyUser(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const idToken = authHeader.split("Bearer ")[1];
  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch {
    return null;
  }
}