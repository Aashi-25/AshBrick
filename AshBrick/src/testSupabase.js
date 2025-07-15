import { supabase } from "./lib/supabase";

supabase
  .from('profiles')
  .select('*')
  .limit(1)
  .then(res => console.log("Test Supabase query result (standalone):", res))
  .catch(err => console.error("Test Supabase query error (standalone):", err));