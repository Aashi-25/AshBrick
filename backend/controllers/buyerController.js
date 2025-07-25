import { con } from "../db/supabasesClients.js";

export const registerBuyer = async (req, res) => {
  const { user_id, name, email } = req.body;

  if (!user_id || !name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
  
    const { data: existingBuyer, error: checkError } = await con
      .from("buyers")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
     
      throw checkError;
    }

    if (existingBuyer) {
      return res.status(200).json({
        message: "Buyer already registered",
        buyer: existingBuyer,
      });
    }

    const { data: newBuyer, error: insertError } = await con
      .from("buyers")
      .insert({
        user_id,
        name: name.trim(),
        email: email.toLowerCase(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return res.status(201).json({
      message: "Buyer registered successfully",
      buyer: newBuyer,
    });
  } catch (err) {
    console.error("Error registering buyer:", err);
    return res.status(500).json({ error: "Failed to register buyer" });
  }
};
