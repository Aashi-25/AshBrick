import { Routes, Route, Navigate } from "react-router-dom";
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
import BackgroundBlobs from "./components/BackgroundBlobs";
import AuthPage from "./components/AuthPage";
import ResetPassword from "./components/ResetPassword";
import { useState, useEffect } from "react";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Landing Page Component
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, profile, loading } = useAuth();

  // Auto-redirect authenticated users to their dashboard
  useEffect(() => {
    if (!loading && user && profile) {
      const redirectPath = {
        'Supplier': '/supplier-dashboard',
        'Buyer': '/buyer-dashboard', 
        'Admin': '/admin-dashboard'
      }[profile.role] || '/buyer-dashboard';
      
      window.location.href = redirectPath;
    }
  }, [user, profile, loading]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Only show landing page if user is not authenticated
  if (user && profile) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <BackgroundBlobs />
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onAuthClick={() => setShowAuth(true)}
      />
      <Hero onAuthClick={() => setShowAuth(true)} />
      <Metrics />
      <Features />
      <AIFeatures />
      <Impact />
      <CTA onAuthClick={() => setShowAuth(true)} />
      <Footer />

      {showAuth && (
        <AuthPage
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
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
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;