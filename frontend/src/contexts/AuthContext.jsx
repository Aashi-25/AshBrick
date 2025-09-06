import { createContext, useContext, useState, useEffect } from "react";
import { supabase, authHelpers } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleProfileSetup = async (sessionUser) => {
    try {
      console.log("🔄 Setting up profile for user:", sessionUser);
      
      const { data: existingProfile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sessionUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found, which is okay
        console.error("❌ Error checking existing profile:", error);
        throw error;
      }

      const metadata = sessionUser.user_metadata || {};
      console.log("📝 User metadata:", metadata);
      
      const getName = () => {
        if (metadata.name && metadata.name.trim()) return metadata.name.trim();
        if (metadata.full_name && metadata.full_name.trim()) return metadata.full_name.trim();
        return sessionUser.email?.split("@")[0] || "User";
      };
      
      const fallbackName = getName();
      const fallbackRole = metadata.role || "Buyer";
      
      console.log("📝 Fallback values:", { fallbackName, fallbackRole });

      if (!existingProfile) {
        console.log("📝 No existing profile found, creating new one...");
        
        const { data: newProfile } = await authHelpers.createProfile(
          sessionUser.id,
          sessionUser.email,
          fallbackRole,
          fallbackName
        );
        
        const finalProfile = newProfile || {
          id: sessionUser.id,
          role: fallbackRole,
          name: fallbackName,
          email: sessionUser.email,
        };
        
        console.log("✅ New profile created:", finalProfile);
        setProfile(finalProfile);
      } else {
        console.log("✅ Existing profile found:", existingProfile);
        
        const shouldUpdateName = !existingProfile.name || 
                                existingProfile.name === "User" || 
                                existingProfile.name === sessionUser.email?.split("@")[0];
        
        if (shouldUpdateName && fallbackName !== "User" && fallbackName !== sessionUser.email?.split("@")[0]) {
          console.log("🔄 Updating profile with better name:", fallbackName);
          
          const { data: updatedProfile } = await authHelpers.updateProfile(
            sessionUser.id, 
            { name: fallbackName }
          );
          
          setProfile(updatedProfile || {
            ...existingProfile,
            name: fallbackName,
          });
        } else {
          setProfile({
            id: existingProfile.id,
            role: existingProfile.role || fallbackRole,
            name: existingProfile.name || fallbackName,
            email: existingProfile.email || sessionUser.email,
          });
        }
      }
    } catch (err) {
      console.error("❌ Profile setup error:", err);
      setProfile({
        id: sessionUser.id,
        role: sessionUser.user_metadata?.role || "Buyer",
        name: sessionUser.user_metadata?.name || 
              sessionUser.user_metadata?.full_name || 
              sessionUser.email?.split("@")[0] || "User",
        email: sessionUser.email,
      });
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);
      try {
        console.log("🔄 Initializing session...");
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Session initialization error:", error);
          return;
        }
        
        console.log("📝 Current session:", session);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await handleProfileSetup(session.user);
        }
      } catch (err) {
        console.error("❌ Initialize session error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event, session?.user?.id);
      
      setUser(session?.user ?? null);

      if (event === "SIGNED_IN" && session?.user) {
        setLoading(true);
        await handleProfileSetup(session.user);
        setLoading(false);
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        navigate("/login");
      }
    });

    return () => {
      console.log("🔄 Cleaning up auth subscription...");
      subscription.unsubscribe();
    };
  }, [navigate]);

  const contextValue = {
    user,
    profile,
    signUp: authHelpers.signUp,
    signIn: authHelpers.signIn,
    signOut: authHelpers.signOut,
    supabase,
    loading,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-green-400/60 rounded-full animate-float-${(i % 3) + 1} shadow-md shadow-green-400/30`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="text-white text-center">
          <div className="relative flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-400 shadow-lg shadow-green-400/50"></div>
            <div className="absolute h-16 w-16 bg-green-400/20 rounded-full animate-pulse-ring"></div>
          </div>
          <p className="text-green-300/70 text-lg font-medium">Loading...</p>
        </div>
        <style jsx>{`
          @keyframes float-1 { 0%,100% { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.4; } 50% { transform: translateY(-15px) translateX(8px) rotate(90deg); opacity:0.7; } }
          @keyframes float-2 { 0%,100% { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.3; } 50% { transform: translateY(-12px) translateX(-6px) rotate(-90deg); opacity:0.6; } }
          @keyframes float-3 { 0%,100% { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.5; } 50% { transform: translateY(-18px) translateX(10px) rotate(180deg); opacity:0.8; } }
          @keyframes pulse-ring { 0% { transform: scale(0.8); opacity:0.5; } 50% { transform: scale(1.2); opacity:0.2; } 100% { transform: scale(1.6); opacity:0; } }
          .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
          .animate-pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};