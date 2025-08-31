import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createProfile(userId, email, role, name) {
  try {
    const finalName = name?.trim() || "Unknown";
    console.log("📝 Creating profile and role-specific record:", {
      userId,
      email,
      role,
      name: finalName,
    });

    // Create profile record
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

    console.log("✅ Profile created/updated");

    // Create role-specific record
    if (role === "Buyer") {
      console.log("📝 Creating buyer record...");
      const { data: buyerData, error: buyerError } = await supabase
        .from("buyers")
        .upsert(
          {
            id: userId, 
            name: finalName,
            email: email,
            created_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (buyerError) {
        console.error("❌ Buyer record creation error:", buyerError);
        return { data: profileResult, error: buyerError };
      } else {
        console.log("✅ Buyer record created:", buyerData);
      }
    } else if (role === "Supplier") {
      console.log("📝 Creating supplier record...");
      const { data: supplierData, error: supplierError } = await supabase
        .from("suppliers")
        .upsert(
          {
            id: userId, 
            name: finalName,
            email: email,
            created_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (supplierError) {
        console.error("❌ Supplier record creation error:", supplierError);
        return { data: profileResult, error: supplierError };
      } else {
        console.log("✅ Supplier record created:", supplierData);
      }
    }

    console.log("✅ All records created successfully");
    return { data: profileResult, error: null };
  } catch (err) {
    console.error("❌ Unexpected profile creation error:", err);
    return { data: null, error: err };
  }
}

export const authHelpers = {
  //Signup
  async signUp(email, password, role, name) {
    try {
      console.log("📧 Signing up:", { email, role, name });

      if (!["Buyer", "Supplier"].includes(role)) {
        return {
          data: null,
          error: new Error("Invalid role. Only 'Buyer' or 'Supplier' allowed."),
        };
      }

      const finalName = name?.trim() || "Unknown";

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role, name: finalName },
        },
      });

      if (authError) {
        console.error("❌ Signup error:", authError);
        return { data: null, error: authError };
      }

      // Don't create profile immediately - let it be created after email verification
      // The profile will be created when user signs in after verification

      console.log("✅ Signup successful - Check email for verification");
      return { data: authData, error: null };
    } catch (err) {
      console.error("❌ Unexpected signup error:", err);
      return { data: null, error: err };
    }
  },

  // Keep createProfile in authHelpers for AuthContext compatibility
  async createProfile(userId, email, role, name) {
    return await createProfile(userId, email, role, name);
  },

  // Simple method to create profile after manual verification
  async createProfileAfterVerification(userId, email, role, name) {
    return await createProfile(userId, email, role, name);
  },

  async signIn(email, password) {
    try {
      console.log("🔐 Signing in:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { data: null, error };

      // Create profile if it doesn't exist (for users who verified email)
      if (data.user) {
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single();

        if (!existingProfile && data.user.user_metadata) {
          await createProfile(
            data.user.id,
            data.user.email,
            data.user.user_metadata.role || "Buyer",
            data.user.user_metadata.name || "Unknown"
          );
        }
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error || null };
    } catch (err) {
      return { error: err };
    }
  },

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      return { data, error: error || null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();
      return { data, error: error || null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async checkEmailExists(email) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();
      return {
        exists: !!data,
        error: error?.code !== "PGRST116" ? error : null,
      };
    } catch (err) {
      return { exists: null, error: err };
    }
  },

  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      return { session, error };
    } catch (err) {
      return { session: null, error: err };
    }
  },

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error: error || null };
    } catch (err) {
      return { error: err };
    }
  },

  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error: error || null };
    } catch (err) {
      return { error: err };
    }
  },
};
