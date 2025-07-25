import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authHelpers = {
async signUp(email, password, role, name) {
  try {
    console.log("📧 Signing up:", { email, role, name });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name: name?.trim(),
        },
      },
    });

    if (error) {
      console.error("❌ Signup error:", error);
      return { data: null, error };
    }

    const user = data.user;
    const session = data.session;

    const userId = user?.id ?? session?.user?.id;

    // wait for email confirmation
    if (!session) {
      console.warn("⚠️ No session returned. Ask user to check their email.");
      return {
        data,
        error: new Error("Check your email to confirm and log in."),
      };
    }

    // build name from metadata if needed
    const meta = session?.user?.user_metadata || {};
    const fallbackName = meta.name || email.split("@")[0];
    const fallbackRole = meta.role || role || "Buyer";

    const { error: profileError } = await authHelpers.createProfile(
      userId,
      email,
      fallbackRole,
      fallbackName
    );

    if (profileError) {
      console.error("❌ Profile creation error:", profileError);
      return { data, error: profileError };
    }

    console.log("✅ Signup & profile created");
    return { data, error: null };
  } catch (err) {
    console.error("❌ Unexpected signup error:", err);
    return { data: null, error: err };
  }
},



  // Sign in
  async signIn(email, password) {
    try {
      console.log("🔐 Signing in:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Signin error:", error);
        return { data: null, error };
      }

      console.log("✅ Signin successful:", data);
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected signin error:", err);
      return { data: null, error: err };
    }
  },

  // Sign out
  async signOut() {
    try {
      console.log("👋 Signing out");

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("❌ Signout error:", error);
        return { error };
      }

      console.log("✅ Signout successful");
      return { error: null };
    } catch (err) {
      console.error("❌ Unexpected signout error:", err);
      return { error: err };
    }
  },

  // Get user profile with role
  async getUserProfile(userId) {
    try {
      console.log("🔍 Fetching profile for:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Profile fetch error:", error);
        return { data: null, error };
      }

      console.log("✅ Profile fetched:", data);
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected profile fetch error:", err);
      return { data: null, error: err };
    }
  },

  // Create user profile
  async createProfile(userId, email, role, name) {
    try {
      console.log("📝 Creating profile:", { userId, email, role, name });

      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          email,
          role,
          name: name?.trim(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("❌ Profile creation error:", error);
        return { data: null, error };
      }

      console.log("✅ Profile created:", data);
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected profile creation error:", err);
      return { data: null, error: err };
    }
  },

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      console.log("📝 Updating profile:", userId, updates);

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        console.error("❌ Profile update error:", error);
        return { data: null, error };
      }

      console.log("✅ Profile updated:", data);
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected profile update error:", err);
      return { data: null, error: err };
    }
  },

  // Check if email exists
  async checkEmailExists(email) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      // If no error and data exists, email is taken
      if (data && !error) {
        return { exists: true, error: null };
      }

      // If error code is PGRST116, no rows found - email available
      if (error && error.code === "PGRST116") {
        return { exists: false, error: null };
      }

      // Other errors
      return { exists: null, error };
    } catch (err) {
      console.error("❌ Email check error:", err);
      return { exists: null, error: err };
    }
  },
};
