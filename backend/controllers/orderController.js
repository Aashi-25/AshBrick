import { con } from "../db/supabasesClients.js";


//create
export const createOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: buyer, error: buyerErr } = await con
      .from("buyers")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (buyerErr) return res.status(404).json({ error: "Buyer not found" });

    const buyerId = buyer.id;

    const { data: product, error: productErr } = await con
      .from("products")
      .select("price")
      .eq("id", product_id)
      .single();

    if (productErr) return res.status(404).json({ error: "Product not found" });

    const total_price = quantity * parseFloat(product.price);

    const { data: newOrder, error: insertErr } = await con
      .from("orders")
      .insert([{ buyer_id: buyerId, product_id, quantity, total_price }])
      .select()
      .single();

    if (insertErr) throw insertErr;

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create Order Error:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

//getallorders

export const getAllOrders = async (req, res) => {
  try {
    const { data, error } = await con
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

//getbyid
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await con
      .from("orders")
      .select("*")
      .eq("id", id)
      .eq("buyer_id", req.userId) 
      .single();

    if (error || !data) return res.status(404).json({ error: "Order not found or access denied" });

    res.json(data);
  } catch (error) {
    console.error("Fetch Order By ID Error:", error.message);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

 
    const { data: product, error: productErr } = await con
      .from("products")
      .select("price")
      .eq("id", product_id)
      .single();

    if (productErr) return res.status(404).json({ error: "Product not found" });

    const total_price = quantity * parseFloat(product.price);

  
    const { data: updatedOrder, error: updateErr } = await con
      .from("orders")
      .update({
        product_id,
        quantity,
        total_price,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) return res.status(404).json({ error: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    console.error("Update Order Error:", error.message);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// ✅ Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: deletedOrder, error } = await con
      .from("orders")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(404).json({ error: "Order not found" });

    res.json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Delete Order Error:", error.message);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
