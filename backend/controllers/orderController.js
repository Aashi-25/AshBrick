import { con } from "../db/pgdb.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { buyer_id, product_id, quantity } = req.body;

    if (!buyer_id || !product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Incoming order data:", req.body);

    
    const productResult = await con.query(
      "SELECT price FROM products WHERE id = $1",
      [product_id]
    );
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

   
    const buyerResult = await con.query(
      "SELECT * FROM buyers WHERE user_id = $1",
      [buyer_id]
    );
    if (buyerResult.rows.length === 0) {
      return res.status(404).json({ error: "Buyer not found" });
    }

    const price = parseFloat(productResult.rows[0].price);
    const total_price = quantity * price;

    const insertResult = await con.query(
      `INSERT INTO orders (buyer_id, product_id, quantity, total_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [buyer_id, product_id, quantity, total_price]
    );

    console.log("Order created:", insertResult.rows[0]); // Debug

    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    console.error("Create Order Error:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const result = await con.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const result = await con.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch Order By ID Error:", error.message);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
