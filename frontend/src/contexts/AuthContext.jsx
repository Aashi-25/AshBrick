import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

console.log("AuthContext loaded");

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

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
      }
    };

    initAuth();

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

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
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
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
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
    </AuthContext.Provider>
  );
};
