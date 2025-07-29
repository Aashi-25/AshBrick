import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SupplierDashboard from "./components/dashboards/SupplierDashboard";
import BuyerDashboard from "./components/dashboards/BuyerDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import Metrics from "./components/Metrics";
import Features from "./components/Features";
import AIFeatures from "./components/AIFeatures";
import Impact from "./components/Impact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import ResetPassword from "./components/ResetPassword";
import TeamCarousel from "./components/TeamCarousel";
import AnimatedBackdrop from "./components/AnimatedBackdrop";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.error("Loading timeout reached in ProtectedRoute, redirecting to home");
        setTimeoutReached(true);
        navigate("/");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading, navigate]);

  if (loading && !timeoutReached) {
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
          @keyframes float-1 {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.4; }
            50% { transform: translateY(-15px) translateX(8px) rotate(90deg); opacity: 0.7; }
          }
          @keyframes float-2 {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-12px) translateX(-6px) rotate(-90deg); opacity: 0.6; }
          }
          @keyframes float-3 {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-18px) translateX(10px) rotate(180deg); opacity: 0.8; }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.2; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
          .animate-pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
        `}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  const userRole = profile?.role || user?.user_metadata?.role;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`Unauthorized role: ${userRole} for route requiring ${allowedRoles}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

const LandingPage = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (user && profile) {
    switch (profile.role) {
      case "Supplier":
        return <Navigate to="/supplier-dashboard" replace />;
      case "Buyer":
        return <Navigate to="/buyer-dashboard" replace />;
      case "Admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/buyer-dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen text-white overflow-auto relative">
      <AnimatedBackdrop />
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onAuthClick={() => navigate("/login")} // Changed to navigate to /login
      />
      <main className="relative z-10 flex flex-col gap-16 md:gap-24">
        <section className="w-full flex justify-center items-center pt-8 md:pt-16 pb-8 md:pb-16">
          <Hero />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Features />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <AIFeatures />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Impact />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Metrics />
        </section>
        <section className="w-full max-w-4xl mx-auto px-4 md:px-8">
          <CTA />
        </section>
        <section className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <TeamCarousel />
        </section>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <LoginPage
            onClose={() => navigate("/")}
            onSuccess={(userData) => {
              navigate("/dashboard");
            }}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup
            onClose={() => navigate("/")}
            onSuccess={(userData, role) => {
              if (role === "Buyer") {
                navigate("/buyer-dashboard");
              } else if (role === "Supplier") {
                navigate("/supplier-dashboard");
              } else if (role === "Admin") {
                navigate("/admin");
              } else {
                navigate("/buyer-dashboard");
              }
            }}
          />
        }
      />
      <Route
        path="/supplier-dashboard"
        element={
          <ProtectedRoute allowedRoles={["Supplier"]}>
            <SupplierDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["Buyer"]}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;