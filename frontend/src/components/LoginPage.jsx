import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import {
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  Factory,
  Sparkles,
  House,
} from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const LoginPage = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await signIn(formData.email, formData.password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Incorrect email or password");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Please verify your email before logging in");
        }
        throw error;
      }
      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => {
        onSuccess?.(data.user);
        navigate("/dashboard");
      }, 1000);
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
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );
      if (error) throw error;
      setMessage({
        type: "success",
        text: "Reset link sent! Please check your email.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send reset link.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      email: "",
      password: "",
    });
    setMessage({ type: "", text: "" });
    setShowPassword(false);
    setLoading(false);
    onClose?.();
    navigate("/");
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

      <CardContainer className="inter-var w-full max-w-md relative">
        <CardBody className="bg-black/95 text-white rounded-2xl shadow-2xl shadow-green-400/20 w-full h-auto p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar group/card border border-green-400/30 hover:shadow-green-400/30 transition-all duration-500">
          <div className="sticky top-0 z-30 bg-black/95 border-b border-green-400/30 -mx-8 px-8 pt-6 pb-4 backdrop-blur-lg">
            <CardItem translateZ={60}>
              <button
                onClick={handleClose}
               className="absolute top-4 left-0 w-10 h-10 bg-gradient-to-br from-gray-900/95 to-gray-800/95 hover:from-green-600/95 hover:to-emerald-500/95 rounded-full flex items-center justify-center transition-all duration-300 group shadow-md shadow-green-400/30 hover:shadow-green-400/50 backdrop-blur-md border border-green-400/40 hover:border-red-400/60 hover:scale-110 z-40"
                aria-label="Close"
              >
                <House className="w-5 h-5 text-green-300 group-hover:text-white transition-all duration-300 " />
                <div className="absolute rounded-full inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-green-400/30">
                  Home
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-green-400/30"></div>
                </div>
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
                Welcome Back
              </h2>
              <p className="text-green-300/70 text-center text-sm mt-1">
                Sign in to your account
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
                    autoComplete="current-password"
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

              <CardItem translateZ={30} className="text-right w-full">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors duration-300 focus:outline-none focus:underline"
                  aria-label="Forgot password"
                >
                  Forgot password?
                </button>
              </CardItem>

              <CardItem translateZ={90} className="w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden shadow-lg shadow-green-400/30 hover:shadow-green-400/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Sign In"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </CardItem>

              <CardItem translateZ={30} className="mt-6 text-center w-full">
                <p className="text-green-300/70 text-sm">
                  Don't have an account?
                  <button
                    onClick={() => navigate("/signup")}
                    className="ml-2 text-green-400 hover:text-green-300 font-semibold transition-colors duration-300 focus:outline-none focus:underline"
                    aria-label="Sign up"
                  >
                    Sign up
                  </button>
                </p>
              </CardItem>
            </form>
          </div>
        </CardBody>
      </CardContainer>

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
      `}</style>
    </div>
  );
};

export default LoginPage;
