import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

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
  X,
} from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const AuthPage = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  });

  const { signUp, signIn } = useAuth();
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return false;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" });
        return false;
      }
      if (formData.password.length < 6) {
        setMessage({
          type: "error",
          text: "Password must be at least 6 characters",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isLogin) {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        setMessage({ type: "success", text: "Login successful!" });
        setTimeout(() => {
          onSuccess && onSuccess(data.user, formData.role);
        }, 1000);
      } else {
        const { data, error } = await signUp(
          formData.email,
          formData.password,
          formData.role
        );
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Account created! Please check your email to verify your account.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage({
        type: "error",
        text: "Please enter your email to reset password",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: window.location.origin + "/reset-password",
        }
      );

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Reset link sent! Please check your email.",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      role: "Buyer",
    });
    setMessage({ type: "", text: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setLoading(false);
    onClose();
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-400/50 bg-blue-900/30 text-blue-400",
      green: "border-green-400/50 bg-green-900/30 text-green-400",
      purple: "border-purple-400/50 bg-purple-900/30 text-purple-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/50 rounded-full animate-float-${i % 2 + 1} shadow-sm shadow-green-400/20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <CardContainer className="inter-var w-full max-w-md relative">

        <CardBody className="bg-black/90 text-white rounded-xl shadow-lg shadow-green-400/10 w-full h-auto p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar group/card">
          {/* Header with sticky positioning */}
          <div className="sticky top-0 z-30 bg-black/95 border-b border-green-400/20 -mx-6 px-6 pt-6 pb-4 backdrop-blur-sm">
            {/* Back to Login Button (Top-Left, Signup Only) */}
            {!isLogin && (
              <CardItem translateZ={50}>
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setMessage({ type: "", text: "" });
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      role: "Buyer",
                    });
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                    navigate("#login");
                  }}
                  className="absolute top-6 left-6 flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-sm font-medium">Login</span>
                </button>
              </CardItem>
            )}

            {/* Close Button (Top-Right) */}
            <CardItem translateZ={50}>
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 hover:from-red-500/95 hover:to-red-600/95 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg shadow-green-400/20 hover:shadow-red-400/40 backdrop-blur-md border border-green-400/30 hover:border-red-400/50 hover:scale-110"
              >
                <X className="w-5 h-5 text-green-300 group-hover:text-white transition-all duration-300 group-hover:rotate-90" />
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-gradient-to-br from-red-400 to-red-600 transition-opacity duration-300" />
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-green-400/20">
                  Close
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-green-400/20"></div>
                </div>
              </button>
            </CardItem>

            {/* Header Content */}
            <div className="flex flex-col items-center pt-2">
              <div className="flex items-center justify-center space-x-3 mb-4 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-sm shadow-green-400/20">
                    <Factory className="w-6 h-6 text-black" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  AshBrick
                </span>
              </div>
              <h2 className="text-xl font-semibold text-center text-green-400">
                {isLogin ? "Welcome Back" : "Join AshBrick"}
              </h2>
              <p className="text-green-300/70 text-center text-sm mt-1">
                {isLogin ? "Sign in to your account" : "Create your account to get started"}
              </p>
            </div>
          </div>

          {/* Form Content - Centered */}
          <div className="flex flex-col items-center px-6 py-4">
            {message.text && (
              <CardItem
                translateZ={60}
                className={`mb-4 p-3 rounded-lg flex items-center space-x-2 w-full max-w-sm ${
                  message.type === "error"
                    ? "bg-red-900/20 text-red-400 border border-red-400/20"
                    : "bg-green-900/20 text-green-400 border border-green-400/20"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{message.text}</span>
              </CardItem>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm flex flex-col items-center">
              {!isLogin && (
                <CardItem translateZ={50} className="space-y-3 w-full">
                  <label className="block text-sm font-medium text-green-300/70 text-center">
                    I am a
                  </label>
                  <div className="grid grid-cols-1 gap-3 w-full">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: role.value })}
                          className={`p-4 rounded-lg border transition-all text-left group relative w-full ${
                            formData.role === role.value
                              ? getColorClasses(role.color)
                              : "border-green-400/20 bg-black/50 text-green-300/70 hover:border-green-400/30 hover:bg-green-400/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-sm text-green-300/50">
                                {role.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardItem>
              )}

              {/* Email */}
              <CardItem translateZ={50} className="space-y-2 w-full">
                <label className="block text-sm font-medium text-green-300/70 text-center">
                  Email Address
                </label>
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </CardItem>

              {/* Password */}
              <CardItem translateZ={50} className="space-y-2 w-full">
                <label className="block text-sm font-medium text-green-300/70 text-center">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-12 py-3 bg-black/50 border border-green-400/20 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400/50 hover:text-green-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </CardItem>

              {/* Confirm Password */}
              {!isLogin && (
                <CardItem translateZ={50} className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-green-300/70 text-center">
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-black/50 border border-green-400/20 text-white placeholder-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400 hover:bg-green-400/10 transition-all duration-300 outline-none"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400/50 hover:text-green-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </CardItem>
              )}

              {/* Forgot Password */}
              {isLogin && (
                <CardItem translateZ={20} className="text-right w-full">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-green-400 hover:text-green-300 font-medium"
                  >
                    Forgot password?
                  </button>
                </CardItem>
              )}

              {/* Submit */}
              <CardItem translateZ={80} className="w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-semibold transition-all duration-300 group relative overflow-hidden shadow-md shadow-green-400/20 hover:shadow-green-400/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Sparkles className="w-4 h-4 text-black animate-sparkle-auth" />
                  </div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{isLogin ? "Sign In" : "Create Account"}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </CardItem>

              {/* Toggle Login/Signup */}
              <CardItem translateZ={20} className="mt-6 text-center w-full">
                <p className="text-green-300/70 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setMessage({ type: "", text: "" });
                      setFormData({
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "Buyer",
                      });
                      setShowPassword(false);
                      setShowConfirmPassword(false);
                      navigate(isLogin ? "#signup" : "#login");
                    }}
                    className="ml-1 text-green-400 hover:text-green-300 font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </CardItem>

              {/* Terms */}
              {!isLogin && (
                <CardItem translateZ={20} className="mt-4 text-center w-full">
                  <p className="text-xs text-green-300/50">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-green-400 hover:text-green-300">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-400 hover:text-green-300">
                      Privacy Policy
                    </a>
                  </p>
                </CardItem>
              )}
            </form>
          </div>
        </CardBody>
      </CardContainer>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-8px) translateX(-4px); opacity: 0.5; }
        }
        @keyframes sparkle-auth {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b98160;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b98180;
        }

        .animate-float-1 { animation: float-1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
        .animate-sparkle-auth { animation: sparkle-auth 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AuthPage;