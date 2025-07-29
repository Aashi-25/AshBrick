import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { authHelpers } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleProfileSetup = async (sessionUser) => {
    try {
      console.log("🔍 Setting up profile for user:", sessionUser.id);

      // Try to fetch existing profile first
      const { data, error } = await supabase
        .from("profiles")
        .select("id, role, name, email")
        .eq("id", sessionUser.id)
        .single();

      const metadata = sessionUser.user_metadata || {};
      const fallbackName =
        metadata.name || sessionUser.email?.split("@")[0] || "Unknown";
      const fallbackRole = metadata.role || "Buyer";

      console.log("📊 Profile data:", { data, error });
      console.log("🔄 Fallback values:", { fallbackName, fallbackRole });

      // If profile doesn't exist or has missing/null name, create/update it
      if (error || !data || !data.name || data.name === "Unknown") {
        console.log(
          "🔄 Creating/updating profile due to missing or invalid name"
        );

        const { data: createdProfile, error: createErr } =
          await authHelpers.createProfile(
            sessionUser.id,
            sessionUser.email,
            fallbackRole,
            fallbackName
          );

        if (createErr) {
          console.error("❌ Failed to auto-create/update profile:", createErr);
          // Set profile with fallback values even if creation failed
          setProfile({
            id: sessionUser.id,
            role: fallbackRole,
            name: fallbackName,
            email: sessionUser.email,
          });
        } else {
          console.log(
            "✅ Profile created/updated successfully:",
            createdProfile
          );
          setProfile(createdProfile);
        }
      } else {
        console.log("✅ Using existing profile:", data);
        setProfile({
          id: data.id,
          role: data.role || fallbackRole,
          name: data.name || fallbackName,
          email: data.email || sessionUser.email,
        });
      }
    } catch (err) {
      console.error("❌ Error in handleProfileSetup:", err);
      // Set basic profile as fallback
      const metadata = sessionUser.user_metadata || {};
      setProfile({
        id: sessionUser.id,
        role: metadata.role || "Buyer",
        name: metadata.name || sessionUser.email?.split("@")[0] || "Unknown",
        email: sessionUser.email,
      });
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);

        if (session?.user) {
          await handleProfileSetup(session.user);
        }
      } catch (error) {
        console.error("Error initializing session:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event);

      setUser(session?.user ?? null);

      if (event === "SIGNED_IN" && session?.user) {
        await handleProfileSetup(session.user);
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const value = {
    user,
    profile,
    signUp: authHelpers.signUp,
    signIn: authHelpers.signIn,
    signOut: authHelpers.signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900/20 to-black relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-green-400/60 rounded-full animate-float-${
                  (i % 3) + 1
                } shadow-md shadow-green-400/30`}
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
            @keyframes float-1 {
              0%,
              100% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-15px) translateX(8px) rotate(90deg);
                opacity: 0.7;
              }
            }
            @keyframes float-2 {
              0%,
              100% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.3;
              }
              50% {
                transform: translateY(-12px) translateX(-6px) rotate(-90deg);
                opacity: 0.6;
              }
            }
            @keyframes float-3 {
              0%,
              100% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.5;
              }
              50% {
                transform: translateY(-18px) translateX(10px) rotate(180deg);
                opacity: 0.8;
              }
            }
            @keyframes pulse-ring {
              0% {
                transform: scale(0.8);
                opacity: 0.5;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.2;
              }
              100% {
                transform: scale(1.6);
                opacity: 0;
              }
            }
            .animate-float-1 {
              animation: float-1 6s ease-in-out infinite;
            }
            .animate-float-2 {
              animation: float-2 7s ease-in-out infinite;
            }
            .animate-float-3 {
              animation: float-3 5s ease-in-out infinite;
            }
            .animate-pulse-ring {
              animation: pulse-ring 1.5s ease-out infinite;
            }
          `}</style>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
