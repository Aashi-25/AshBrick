import { con } from "../db/pgdb.js";

export const getAllProducts = async (req, res) => {
  try {
    const data = await con.query("SELECT * FROM products");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const result = await con.query(
      "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};
