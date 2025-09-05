import { createClient } from "@supabase/supabase-js";

// ------------------
// Supabase Client
// ------------------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ------------------
// Create or Update Profile
// ------------------
export async function createProfile(userId, email, role = "Buyer", name) {
  try {
    const finalName = name?.trim() || email?.split("@")[0] || "User";

    const profileData = {
      id: userId,
      email,
      role,
      name: finalName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: profileResult, error: profileError } = await supabase
      .from("profiles")
      .upsert(profileData, { onConflict: "id" });

    if (profileError) {
      console.error("❌ Profile upsert error:", profileError);
      return { data: null, error: profileError };
    }

    // Role-specific table
    const roleTable = role === "Buyer" ? "buyers" : "suppliers";
    await supabase.from(roleTable).upsert({
      id: userId,
      name: finalName,
      email,
      created_at: new Date().toISOString(),
    }, { onConflict: "id" });

    return { data: profileResult, error: null };
  } catch (err) {
    console.error("❌ Unexpected profile creation error:", err);
    return { data: null, error: err };
  }
}

// ------------------
// Auth Helpers
// ------------------
export const authHelpers = {
  signUp: async (email, password, role, name) => {
    if (!["Buyer", "Supplier"].includes(role)) 
      return { data: null, error: new Error("Invalid role") };

    const finalName = name?.trim() || email?.split("@")[0] || "User";

    // 1️⃣ Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, name: finalName } }, // store both role & name in metadata
    });

    if (error || !data.user) return { data, error };

    // 2️⃣ Immediately create profile
    await createProfile(data.user.id, email, role, finalName);

    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data.user) {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!existingProfile) {
        const role = data.user.user_metadata?.role || "Buyer";
        const name = data.user.user_metadata?.name || email.split("@")[0] || "User";
        await createProfile(data.user.id, email, role, name);
      }
    }

    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error: error || null };
  },

  createProfile,

  getUserProfile: async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    return { data, error: error || null };
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .maybeSingle();
    return { data, error: error || null };
  },
};
