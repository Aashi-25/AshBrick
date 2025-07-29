
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Factory,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  Building,
  Shield,
  Sparkles,
  ArrowLeft,
  User,
  Send,
} from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const Signup = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  });

  const { signUp, supabase } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      value: "Buyer",
      label: "Buyer",
      icon: Building,
      description: "Purchase fly ash materials",
      color: "blue",
    },
    {
      value: "Supplier",
      label: "Supplier",
      icon: Factory,
      description: "Supply fly ash materials",
      color: "green",
    },
    {
      value: "Admin",
      label: "Admin",
      icon: Shield,
      description: "Platform administration",
      color: "purple",
    },
  ];

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    let verificationInterval;
    if (showVerificationPopup) {
      verificationInterval = setInterval(async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("❌ Error checking verification status:", error.message);
          return;
        }
        if (user?.email_confirmed_at) {
          console.log("✅ Email verified for user:", user.id);
          setShowVerificationPopup(false);
          onSuccess?.();
          navigate("/dashboard");
        }
      }, 3000); // Poll every 3 seconds
    }
    return () => clearInterval(verificationInterval);
  }, [showVerificationPopup, supabase, navigate, onSuccess]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return false;
    }

    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Please enter your full name" });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters, including one uppercase letter, one number, and one special character",
      });
      return false;
    }

    if (formData.role === "Admin") {
      setMessage({
        type: "error",
        text: "Admin role is restricted. Contact support.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      setMessage({
        type: "error",
        text: "Name is required. Please provide a valid name.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      console.log("📤 Submitting signup with name:", trimmedName);
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        formData.role,
        trimmedName
      );
      if (error) {
        if (error.message.includes("User already registered")) {
          throw new Error("An account with this email already exists");
        }
        if (error.message.includes("Password should be at least")) {
          throw new Error(
            "Password is too weak. Please use a stronger password."
          );
        }
        throw error;
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Buyer",
      });
      setShowVerificationPopup(true);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: formData.email,
      });
      if (error) {
        setMessage({
          type: "error",
          text: "Failed to resend verification email: " + error.message,
        });
      } else {
        setMessage({
          type: "success",
          text: "Verification email resent successfully!",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while resending the email.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Buyer",
    });
    setMessage({ type: "", text: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setLoading(false);
    setShowVerificationPopup(false);
    onClose?.();
    navigate("/");
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-400/50 bg-blue-900/30 text-blue-400 shadow-blue-400/20",
      green:
        "border-green-400/50 bg-green-900/30 text-green-400 shadow-green-400/20",
      purple:
        "border-purple-400/50 bg-purple-900/30 text-purple-400 shadow-purple-400/20",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
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

      {showVerificationPopup ? (
        <CardContainer className="inter-var w-full max-w-md relative">
          <CardBody className="bg-black/95 text-white rounded-2xl shadow-2xl shadow-green-400/20 w-full h-auto p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar group/card border border-green-400/30 hover:shadow-green-400/30 transition-all duration-500">
            <div className="flex flex-col items-center space-y-6">
              <CardItem translateZ={70}>
                <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-pulse" />
              </CardItem>
              <CardItem translateZ={60} className="text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  Account Created Successfully!
                </h2>
                <p className="text-green-300/70 text-sm">
                  Please check your email ({formData.email}) to verify your account.
                </p>
              </CardItem>
              <CardItem translateZ={60} className="w-full max-w-xs">
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden shadow-lg shadow-green-400/30 hover:shadow-green-400/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {resendLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Resend Verification Email</span>
                      </>
                    )}
                  </span>
                </button>
              </CardItem>
              <CardItem translateZ={60} className="w-full max-w-xs">
                <button
                  onClick={handleClose}
                  className="w-full text-green-400 hover:text-green-300 transition-colors duration-300 text-sm"
                >
                  Close
                </button>
              </CardItem>
              {message.text && (
                <CardItem
                  translateZ={70}
                  className={`p-4 rounded-lg flex items-center space-x-3 w-full max-w-sm ${
                    message.type === "error"
                      ? "bg-red-900/30 text-red-400 border border-red-400/30 shadow-red-400/20"
                      : "bg-green-900/30 text-green-400 border border-green-400/30 shadow-green-400/20"
                  }`}
                >
                  {message.type === "error" ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </CardItem>
              )}
            </div>
          </CardBody>
        </CardContainer>
      ) : (
        <CardContainer className="inter-var w-full max-w-md relative">
          <CardBody className="bg-black/95 text-white rounded-2xl shadow-2xl shadow-green-400/20 w-full h-auto p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar group/card border border-green-400/30 hover:shadow-green-400/30 transition-all duration-500">
            <div className="sticky top-0 z-30 bg-black/95 border-b border-green-400/30 -mx-8 px-8 pt-6 pb-4 backdrop-blur-lg">
              <CardItem translateZ={60}>
                <button
                  onClick={() => navigate("/login")}
                  className="absolute top-6 left-6 max-sm:left-0 flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-300 group"
                  aria-label="Back to Login"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
              </CardItem>

              <div className="flex flex-col items-center pt-2">
                <div className="flex items-center justify-center space-x-3 mb-4 group">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-green-400/30">
                      <Factory className="w-6 h-6 text-black" />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 rounded-xl" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    AshBrick
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-center text-green-400">
                  Join AshBrick
                </h2>
                <p className="text-green-300/70 text-center text-sm mt-1">
                  Create your account to get started
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center px-4 py-6">
              {message.text && (
                <CardItem
                  translateZ={70}
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 w-full max-w-sm ${
                    message.type === "error"
                      ? "bg-red-900/30 text-red-400 border border-red-400/30 shadow-red-400/20"
                      : "bg-green-900/30 text-green-400 border border-green-400/30 shadow-green-400/20"
                  }`}
                >
                  {message.type === "error" ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </CardItem>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full max-w-sm flex flex-col items-center"
              >
                <CardItem translateZ={60} className="space-y-3 w-full">
                  <label className="block text-sm font-medium text-green-300/70 text-center">
                    I am a
                  </label>
                  <div className="grid grid-cols-1 gap-4 w-full max-w-xs mx-auto">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, role: role.value })
                          }
                          className={`p-4 rounded-xl border transition-all text-left group relative w-full transform hover:scale-105 duration-300 ${
                            formData.role === role.value
                              ? getColorClasses(role.color)
                              : "border-green-400/20 bg-black/60 text-green-300/70 hover:border-green-400/40 hover:bg-green-400/20"
                          }`}
                          aria-label={`Select ${role.label} role`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          <div className="flex items-center space-x-3 relative z-10">
                            <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            <div>
                              <div className="font-semibold text-base">
                                {role.label}
                              </div>
                              <div className="text-xs text-green-300/60">
                                {role.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardItem>

                <CardItem translateZ={60} className="space-y-2 w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-green-300/70 text-center"
                  >
                    Full Name
                  </label>
                  <div className="relative w-full">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400/50" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/70 border border-green-400/30 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400/50 hover:bg-green-400/20 transition-all duration-300 outline-none"
                      placeholder="Enter your full name"
                      required
                      aria-required="true"
                      autoComplete="name"
                    />
                  </div>
                </CardItem>

                <CardItem translateZ={60} className="space-y-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-green-300/70 text-center"
                  >
                    Email Address
                  </label>
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400/50" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/70 border border-green-400/30 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400/50 hover:bg-green-400/20 transition-all duration-300 outline-none"
                      placeholder="Enter your email"
                      required
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                </CardItem>

                <CardItem translateZ={60} className="space-y-2 w-full">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-green-300/70 text-center"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-black/70 border border-green-400/30 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400/50 hover:bg-green-400/20 transition-all duration-300 outline-none"
                      placeholder="Enter your password"
                      required
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400/50 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </CardItem>

                <CardItem translateZ={60} className="space-y-2 w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-green-300/70 text-center"
                  >
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-black/70 border border-green-400/30 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400/50 hover:bg-green-400/20 transition-all duration-300 outline-none"
                      placeholder="Confirm your password"
                      required
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400/50 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </CardItem>

                <CardItem translateZ={90} className="w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden shadow-lg shadow-green-400/30 hover:shadow-green-400/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Create Account"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className="w-4 h-4 text-black animate-sparkle-auth" />
                    </div>
                    <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className="w-4 h-4 text-black animate-sparkle-auth delay-200" />
                    </div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </CardItem>

                <CardItem translateZ={30} className="mt-4 text-center w-full">
                  <p className="text-xs text-green-300/60 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-green-400 hover:text-green-300 transition-colors duration-300 focus:outline-none focus:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-green-400 hover:text-green-300 transition-colors duration-300 focus:outline-none focus:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </CardItem>
              </form>
            </div>
          </CardBody>
        </CardContainer>
      )}

      <style jsx>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
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
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-12px) rotate(-90deg);
            opacity: 0.6;
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-18px) translateX(10px) rotate(180deg);
            opacity: 0.8;
          }
        }
        @keyframes sparkle-auth {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(360deg);
            opacity: 1;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b98180;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981a0;
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
        .animate-sparkle-auth {
          animation: sparkle-auth 1.2s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
