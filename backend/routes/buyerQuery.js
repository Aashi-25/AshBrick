import { Router } from "express";
import {createClient} from "@supabase/supabase-js"
import { suggestSuppliers } from "../utils/aiMatcher.js";
const queryrouter = Router();


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,

);


queryrouter.post("/",async(req,res)=>{
  try {
    const queryDetails = req.body;

    const { data, error } = await supabase
      .from("queries")
      .insert([queryDetails])
      .select();
    if (error) throw error;

    const aiResponse = await suggestSuppliers(queryDetails);

    return res.json({ savedQuery: data[0], suggestions: aiResponse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
})

export default queryrouter;