import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authHelpers = {
  // Sign up new user
  async signUp(email, password, role, name) {
    try {
      console.log("📧 Signing up:", { email, role, name });

      // Validate role
      if (!['Buyer', 'Supplier'].includes(role)) {
        return { 
          data: null, 
          error: new Error("Invalid role. Only 'Buyer' and 'Supplier' are allowed for signup.") 
        };
      }

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            name: name?.trim(),
          },
        },
      });

      if (authError) {
        console.error("❌ Signup error:", authError);
        return { data: null, error: authError };
      }

      const user = authData.user;
      const session = authData.session;

      // If no session, user needs to confirm email
      if (!session) {
        console.warn("⚠️ No session returned. User needs to confirm email.");
        return {
          data: authData,
          error: null,
          message: "Please check your email to confirm your account.",
        };
      }

      // Create profile after successful signup
      const { error: profileError } = await this.createProfile(
        user.id,
        email,
        role,
        name
      );

      if (profileError) {
        console.error("❌ Profile creation error:", profileError);
        // Don't return error, profile can be created later
      }

      console.log("✅ Signup successful");
      return { data: authData, error: null };
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
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        return { exists: null, error };
      }

      return { exists: !!data, error: null };
    } catch (err) {
      console.error("❌ Email check error:", err);
      return { exists: null, error: err };
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    } catch (err) {
      console.error("❌ Get session error:", err);
      return { session: null, error: err };
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("❌ Password reset error:", error);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error("❌ Unexpected password reset error:", err);
      return { error: err };
    }
  },

  // Update password
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("❌ Password update error:", error);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error("❌ Unexpected password update error:", err);
      return { error: err };
    }
  },
};
