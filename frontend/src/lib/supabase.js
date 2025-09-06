import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to wait for authentication to be fully established
async function waitForAuth(maxAttempts = 10, delay = 500) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      console.log("✅ Auth user confirmed:", user.id);
      return user;
    }
    console.log(`⏳ Waiting for auth... attempt ${attempts + 1}`);
    await new Promise((r) => setTimeout(r, delay));
    attempts++;
  }
  throw new Error("Auth user not available after waiting");
}

export async function createProfile(userId, email, role = "Buyer", name) {
  try {
    const finalName =
      name?.trim() && name !== "Unknown"
        ? name.trim()
        : email?.split("@")[0] || "User";
    const now = new Date().toISOString();

    console.log("🚀 Creating profile for:", { userId, email, role, finalName });

    // 1. First, upsert into profiles table
    const { data: profileResult, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        { 
          id: userId, 
          email, 
          role, 
          name: finalName, 
          created_at: now, 
          updated_at: now 
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (profileError) {
      console.error("❌ Profile creation error:", profileError);
      throw profileError;
    }
    
    console.log("✅ Profile created successfully:", profileResult);

    // 2. Insert into the appropriate role-based table
    const roleTable = role === "Buyer" ? "buyers" : "suppliers";
    console.log(`🎯 Inserting into ${roleTable} table...`);

    const { data: roleData, error: roleError } = await supabase
      .from(roleTable)
      .upsert(
        { 
          id: userId, 
          email, 
          name: finalName, 
          created_at: now 
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (roleError) {
      console.error(`❌ ${roleTable} insertion error:`, roleError);
      console.error("Error details:", {
        message: roleError.message,
        details: roleError.details,
        hint: roleError.hint,
        code: roleError.code
      });
      throw roleError;
    }

    console.log(`✅ ${roleTable} record created successfully:`, roleData);

    // 3. Verify the insertion worked
    const { data: verifyData, error: verifyError } = await supabase
      .from(roleTable)
      .select("*")
      .eq("id", userId)
      .single();

    if (verifyError) {
      console.error(`❌ Verification failed for ${roleTable}:`, verifyError);
    } else {
      console.log(`✅ Verification successful - ${roleTable} record exists:`, verifyData);
    }

    return { data: profileResult, error: null };
  } catch (err) {
    console.error("❌ Profile creation failed:", err);
    return { data: null, error: err };
  }
}

export const authHelpers = {
  signUp: async (email, password, role, name) => {
    console.log("🔄 Starting signup process...");
    
    // Validate role
    if (!["Buyer", "Supplier"].includes(role)) {
      console.error("❌ Invalid role:", role);
      return { data: null, error: new Error("Invalid role. Must be 'Buyer' or 'Supplier'") };
    }

    const finalName =
      name?.trim() && name !== "Unknown"
        ? name.trim()
        : email?.split("@")[0] || "User";

    console.log("📝 Signup details:", { email, role, finalName });

    try {
      // 1. Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { role, name: finalName },
          // Uncomment if you want to redirect after email confirmation
          // emailRedirectTo: `${window.location.origin}/dashboard`
        },
      });

      if (error) {
        console.error("❌ Auth signup error:", error);
        return { data, error };
      }

      if (!data.user) {
        console.error("❌ No user returned from signup");
        return { data, error: new Error("No user returned from signup") };
      }

      console.log("✅ Auth signup successful:", {
        userId: data.user.id,
        email: data.user.email,
        emailConfirmed: data.user.email_confirmed_at ? 'Yes' : 'No'
      });

      // 2. Wait a moment for the auth system to fully process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 3. Create profile and role-specific record
      console.log("🔄 Creating profile and role record...");
      const profileResult = await createProfile(data.user.id, email, role, finalName);

      if (profileResult.error) {
        console.error("❌ Profile creation failed after signup:", profileResult.error);
        // Return the auth data even if profile creation failed
        // The user is still created in auth system
        return { 
          data, 
          error: new Error(`User created but profile setup failed: ${profileResult.error.message}`) 
        };
      }

      console.log("🎉 Signup process completed successfully!");
      return { data, error: null };

    } catch (err) {
      console.error("❌ Signup process failed:", err);
      return { data: null, error: err };
    }
  },

  signIn: async (email, password) => {
    console.log("🔄 Starting signin process for:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      console.error("❌ Auth signin error:", error);
      return { data, error };
    }

    if (data.user) {
      console.log("✅ User signed in:", data.user.id);
      
      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("❌ Error checking existing profile:", profileError);
      }

      if (!existingProfile) {
        console.log("🔄 No existing profile found, creating one...");
        
        const role = data.user.user_metadata?.role || "Buyer";
        const name =
          data.user.user_metadata?.name && data.user.user_metadata.name !== "Unknown"
            ? data.user.user_metadata.name
            : email.split("@")[0] || "User";

        const profileResult = await createProfile(data.user.id, email, role, name);
        
        if (profileResult.error) {
          console.error("❌ Profile creation during signin failed:", profileResult.error);
        }
      } else {
        console.log("✅ Existing profile found:", existingProfile);
      }
    }

    return { data, error };
  },

  signOut: async () => {
    console.log("🔄 Signing out...");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Signout error:", error);
    } else {
      console.log("✅ Signed out successfully");
    }
    return { error: error || null };
  },

  getUserProfile: async (userId) => {
    console.log("🔍 Getting user profile for:", userId);
    
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        *,
        buyer:buyers(*),
        supplier:suppliers(*)
      `)
      .eq("id", userId)
      .maybeSingle();
      
    if (error) {
      console.error("❌ Error getting user profile:", error);
    } else {
      console.log("✅ User profile retrieved:", data);
    }
    
    return { data, error: error || null };
  },

  updateProfile: async (userId, updates) => {
    console.log("🔄 Updating profile for:", userId, "with:", updates);
    
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();
      
    if (error) {
      console.error("❌ Error updating profile:", error);
    } else {
      console.log("✅ Profile updated successfully:", data);
    }
    
    return { data, error: error || null };
  },

  // Helper function to check what's in both role tables
  checkRoleTables: async () => {
    console.log("🔍 Checking role tables...");
    
    const { data: buyers } = await supabase.from("buyers").select("*");
    const { data: suppliers } = await supabase.from("suppliers").select("*");
    
    console.log("👥 Buyers table:", buyers);
    console.log("🏪 Suppliers table:", suppliers);
    
    return { buyers, suppliers };
  }
};