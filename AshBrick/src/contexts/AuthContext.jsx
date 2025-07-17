import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";

console.log("AuthContext loaded");
>>>>>>> upstream/main

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
<<<<<<< HEAD
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
=======
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
>>>>>>> upstream/main
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true); // for auth
  const [profileLoading, setProfileLoading] = useState(true); // for profile

  const fetchUserProfile = async (userId) => {
    setProfileLoading(true);
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn("⚠️ Supabase not configured.");
        return null;
      }

=======
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId) => {
    try {
>>>>>>> upstream/main
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

<<<<<<< HEAD
      if (error) {
        if (error.code === "PGRST116") {
          console.warn("⚠️ Profiles table not found.");
          return null;
        }
        console.error("Error fetching profile:", error.message);
        return null;
      }

      setProfile(data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching profile:", error.message);
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error.message);
          if (mounted) {
            setUser(null);
            setProfile(null);
            setProfileLoading(false);
          }
          return;
        }

        const currentUser = session?.user || null;
        if (mounted) {
          setUser(currentUser);
          if (currentUser) {
            await fetchUserProfile(currentUser.id);
          } else {
            setProfile(null);
            setProfileLoading(false);
          }
        }
      } catch (err) {
        console.error("❌ Error in initAuth:", err.message);
        if (mounted) {
          setUser(null);
          setProfile(null);
          setProfileLoading(false);
        }
      } finally {
        if (mounted) setLoading(false);
=======
      if (error) throw error;
      console.log("✅ Profile fetched:", data);
      setProfile(data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error.message);
      setProfile(null);
    }
  };
  
  useEffect(() => {
    console.log("AuthContext useEffect running");
    // Test Supabase connectivity
    supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .then(res => console.log("Test Supabase query result:", res))
      .catch(err => console.error("Test Supabase query error:", err));
    const initAuth = async () => {
      try {
        setLoading(true);
        console.log("Before getSession");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        console.log("After getSession");
        console.log("Session from getSession:", session, "Error:", error);
        if (error) throw error;
        
        const currentUser = session?.user || null;
        setUser(currentUser);
        if (currentUser) {
          await fetchUserProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("❌ Error in initAuth:", err.message);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false); // ✅ MUST BE HERE
>>>>>>> upstream/main
      }
    };

    initAuth();

<<<<<<< HEAD
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        try {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (currentUser) {
            await fetchUserProfile(currentUser.id);
          } else {
            setProfile(null);
            setProfileLoading(false);
          }
        } catch (err) {
          console.error("❌ Error in onAuthStateChange:", err.message);
          setUser(null);
          setProfile(null);
          setProfileLoading(false);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

 const signUp = async (email, password, role = "Buyer") => {
  try {
    setLoading(true);
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error("Supabase is not configured.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
        // ⬇️ Add this line to support email confirmation redirect
        emailRedirectTo: `${window.location.origin}/confirmed`
      }
    });

    if (error) throw error;

    // ⛔ Don't assume user is signed in until email is confirmed
    setUser(null);
    setProfile(null);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  } finally {
    setLoading(false);
  }
};

=======
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const currentUser = session?.user || null;
        setUser(currentUser);
        if (currentUser) {
          await fetchUserProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("❌ Error in onAuthStateChange:", err.message);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false); // ✅ IMPORTANT!
      }
    });

    // Fallback: force loading to false after 5 seconds
    const timeout = setTimeout(() => setLoading(false), 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signUp = async (email, password, role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data?.user) {
      // Save role to 'profiles' table
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        role,
      });
    }

    return { data, error };
  };
>>>>>>> upstream/main

  const signIn = async (email, password) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase is not configured.");
      }

=======
>>>>>>> upstream/main
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
<<<<<<< HEAD

=======
>>>>>>> upstream/main
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
<<<<<<< HEAD
      setProfileLoading(false);

=======
>>>>>>> upstream/main
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
<<<<<<< HEAD
    profileLoading,
=======
>>>>>>> upstream/main
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
<<<<<<< HEAD
    role: profile?.role || user?.user_metadata?.role || "Buyer",
    name: profile?.name || user?.email?.split("@")[0] || "User",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
=======
    role: profile?.role,
    name: profile?.name || user?.email?.split("@")[0] || "User",
  };

  console.log("👤 User:", user);
  console.log("🧾 Profile:", profile);
  console.log("⌛ Loading:", loading);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="h-screen flex items-center justify-center text-lg text-gray-500">
          Loading...
        </div>
      ) : (
        children
      )}
>>>>>>> upstream/main
    </AuthContext.Provider>
  );
};
