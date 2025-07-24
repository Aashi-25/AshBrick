import { con } from "../db/pgdb.js";// assuming you're using con.query for PostgreSQL

export const registerBuyer = async (req, res) => {
  const { user_id, name, email } = req.body;

  if (!user_id || !name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await con.query("SELECT * FROM buyers WHERE user_id = $1", [user_id]);
    if (existing.rows.length > 0) {
      return res.status(200).json({ message: "Buyer already registered" });
    }

    const result = await con.query(
      "INSERT INTO buyers (user_id, name, email) VALUES ($1, $2, $3) RETURNING *",
      [user_id, name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error registering buyer:", err);
    res.status(500).json({ error: "Failed to register buyer" });
  }
};
