import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
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

      if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
      }
      
      console.log("✅ Profile fetched:", data);
      setProfile(data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching profile:", error.message);
      return null;
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
          }
        }
      } catch (err) {
        console.error("❌ Error in initAuth:", err.message);
        if (mounted) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        if (!mounted) return;

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
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, role = 'Buyer') => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (error) throw error;

      console.log("✅ User signed up:", data.user?.email);
      
      return { data, error: null };
    } catch (error) {
      console.error("❌ Sign up error:", error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("✅ User signed in:", data.user?.email);
      
      return { data, error: null };
    } catch (error) {
      console.error("❌ Sign in error:", error.message);
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
      
      console.log("✅ User signed out");
      
      // Redirect to home
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};