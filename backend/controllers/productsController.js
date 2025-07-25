import { con } from "../db/supabasesClients.js";


export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await con
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(" Supabase fetch error:", error.message);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(" Unknown error:", err.message);
    res.status(500).json({ error: "Server error while fetching products" });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity_available } = req.body;

    if (!name || !description || !price || !quantity_available) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data, error } = await con
      .from("products")
      .insert([
        { name, description, price, quantity_available }
      ])
      .select()
      .single();

    if (error) {
      console.error(" Supabase insert error:", error.message);
      return res.status(500).json({ error: "Failed to create product" });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error(" Unknown error:", err.message);
    res.status(500).json({ error: "Server error while creating product" });
  }
};
