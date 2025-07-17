<<<<<<< HEAD
=======
// App.jsx
>>>>>>> upstream/main
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
<<<<<<< HEAD
import ResetPassword from "./components/ResetPassword";
import { useState } from "react";

// ✅ Loader UI component
const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="text-white text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
);

// ✅ Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading, profileLoading } = useAuth();

  if (loading || profileLoading) return <FullPageLoader />;

  if (!user) return <Navigate to="/" replace />;

  const userRole = profile?.role || user?.user_metadata?.role || "Buyer";
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
=======
import { useState } from "react";
import ResetPassword from "./components/ResetPassword";
import TeamCarousel from "./components/TeamCarousel";
import ConnectSteps from "./components/ConnectSteps";


// 🔐 Protected Route
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

  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(profile?.role))
    return <Navigate to="/" replace />;
>>>>>>> upstream/main

  return children;
};

<<<<<<< HEAD
// ✅ Landing Page Component
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, profile, loading, profileLoading } = useAuth();

  if (loading || profileLoading) return <FullPageLoader />;

  if (user) {
    const userRole = profile?.role || user?.user_metadata?.role || "Buyer";
    const redirectPath = {
      Supplier: "/supplier-dashboard",
      Buyer: "/buyer-dashboard",
      Admin: "/admin-dashboard",
    }[userRole] || "/buyer-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <BackgroundBlobs />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onAuthClick={() => setShowAuth(true)} />
=======
// 🏠 Landing Page
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, profile } = useAuth();

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
    <div className="min-h-screen bg-site-image text-white overflow-hidden">
      <BackgroundBlobs />
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onAuthClick={() => setShowAuth(true)}
      />
>>>>>>> upstream/main
      <Hero onAuthClick={() => setShowAuth(true)} />
      <Metrics />
      <Features />
      <AIFeatures />
      <Impact />
      <CTA onAuthClick={() => setShowAuth(true)} />
<<<<<<< HEAD
      <Footer />
=======
      <ConnectSteps />
      <TeamCarousel />
      <Footer />

>>>>>>> upstream/main
      {showAuth && (
        <AuthPage
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

<<<<<<< HEAD
// ✅ Main App Component
function App() {
  const { loading, profileLoading } = useAuth();

  if (loading || profileLoading) return <FullPageLoader />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />

=======
// 🌐 Main App
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
>>>>>>> upstream/main
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
<<<<<<< HEAD
        path="/admin-dashboard"
=======
        path="/admin"
>>>>>>> upstream/main
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
<<<<<<< HEAD
=======
      <Route path="/reset-password" element={<ResetPassword />} />
>>>>>>> upstream/main
    </Routes>
  );
}

export default App;
