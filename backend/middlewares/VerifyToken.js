
import { con } from "../db/supabasesClients.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await con.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = data.user;
    next();
  } catch (err) {
    console.error(" Token verification error:", err.message);
    return res.status(500).json({ error: "Token verification failed" });
  }
};
