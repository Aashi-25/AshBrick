import { con as supabase } from "../db/supabasesClients.js";

export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      return res
        .status(500)
        .json({ error: `Failed to fetch products: ${error.message}` });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Debug: see what comes from frontend

    const {
      name,
      description,
      price,
      quantity_available,
      location,
      supplier_id,
    } = req.body;

    if (!name || !price || !quantity_available || !location || !supplier_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (req.userId !== supplier_id) {
      return res.status(403).json({
        error: "Unauthorized: supplier_id must match authenticated user",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description: description || "",
          price: parseFloat(price),
          quantity_available: parseInt(quantity_available),
          location,
          supplier_id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return res
        .status(500)
        .json({ error: `Failed to create product: ${error.message}` });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // First check if the product exists and belongs to the authenticated user
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("id, supplier_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return res.status(404).json({ error: "Product not found" });
      }
      return res
        .status(500)
        .json({ error: `Failed to fetch product: ${fetchError.message}` });
    }

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user is authorized to delete this product
    if (existingProduct.supplier_id !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only delete your own products" });
    }

    // Delete the product
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return res
        .status(500)
        .json({ error: `Failed to delete product: ${deleteError.message}` });
    }

    // Return success response
    res.status(200).json({ message: "Product deleted successfully", id });
  } catch (err) {
    console.log("Error found while deleting:", err.message);
    return res
      .status(500)
      .json({ error: `Failed to delete product: ${err.message}` });
  }
};
