import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Building,
  Map,
  Calculator,
  MessageSquare,
  Settings,
  BarChart3,
  MapPin,
  Factory,
  Leaf,
  Droplets,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

const BuyerDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [calculatorData, setCalculatorData] = useState({
    bricks: "",
    co2Savings: 0,
    waterSavings: 0,
  });

  useEffect(() => {
    if (
      !user ||
      (profile?.role !== "Buyer" && user?.user_metadata?.role !== "Buyer")
    ) {
      console.warn("Unauthorized access to BuyerDashboard");
      navigate("/");
    }
  }, [user, profile, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-green-300/70">Loading user data...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "suppliers", label: "Find Suppliers", icon: Map },
    { id: "calculator", label: "CO₂ Calculator", icon: Calculator },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const mockSuppliers = [
    {
      id: 1,
      name: "Green Ash Industries",
      location: "Mumbai, Maharashtra",
      distance: "12 km",
      volume: 500,
      price: 2500,
      rating: 4.8,
    },
    {
      id: 2,
      name: "EcoFly Materials",
      location: "Pune, Maharashtra",
      distance: "25 km",
      volume: 750,
      price: 2800,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Sustainable Ash Co.",
      location: "Nashik, Maharashtra",
      distance: "45 km",
      volume: 300,
      price: 2300,
      rating: 4.9,
    },
  ];

  const calculateSavings = (bricks) => {
    const co2PerBrick = 0.15;
    const waterPerBrick = 0.6;
    return {
      co2Savings: (bricks * co2PerBrick).toFixed(2),
      waterSavings: (bricks * waterPerBrick).toFixed(1),
    };
  };

  const handleCalculatorChange = (e) => {
    const bricks = Math.max(0, parseInt(e.target.value) || 0);
    const savings = calculateSavings(bricks);
    setCalculatorData({
      bricks: e.target.value,
      co2Savings: savings.co2Savings,
      waterSavings: savings.waterSavings,
    });
  };

  const resetCalculator = () => {
    setCalculatorData({ bricks: "", co2Savings: 0, waterSavings: 0 });
  };

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <InfoCard
                title="Active Orders"
                value="5"
                icon={Building}
                color="green"
                unit=""
              />
              <InfoCard
                title="CO₂ Saved"
                value="2.4"
                unit="tons"
                icon={Leaf}
                color="emerald"
              />
              <InfoCard
                title="Water Saved"
                value="1.2"
                unit="kL"
                icon={Droplets}
                color="green"
              />
            </div>
            <div className="bg-black/80 p-6 rounded-xl border border-green-400/30 shadow-lg shadow-green-400/20 hover:shadow-green-400/30 transition-all duration-300">
              <h2 className="text-xl font-bold mb-4 text-green-400">
                Nearby Suppliers
              </h2>
              <div className="bg-black/60 h-64 rounded-xl flex items-center justify-center text-green-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent animate-pulse-ring" />
                <div className="text-center relative z-10">
                  <Map className="w-12 h-12 mx-auto mb-2 text-green-400" />
                  <p>Interactive Map Coming Soon</p>
                  <p className="text-sm text-green-300/70">
                    Real-time supplier locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "suppliers":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-green-400">
                Find Suppliers
              </h2>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/60 text-white border border-green-400/30 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400/50 hover:bg-green-400/20 transition-all duration-300 outline-none"
                    aria-label="Search suppliers by location"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-black/60 border border-green-400/30 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/20 transition-all duration-300 outline-none"
                  aria-label="Filter suppliers"
                >
                  <option>All</option>
                  <option>High Rating</option>
                  <option>Low Price</option>
                  <option>Close Proximity</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredSuppliers.length === 0 ? (
                <div className="text-center text-green-300/70 p-6">
                  No suppliers found for "{searchQuery}".
                </div>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-black/80 p-6 rounded-xl border border-green-400/30 hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-white gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-green-400">
                          {supplier.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm text-green-300/70 mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{supplier.location}</span>
                          </div>
                          <span className="hidden sm:inline">•</span>
                          <span>{supplier.distance}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>⭐ {supplier.rating}</span>
                        </div>
                        <div className="text-sm text-green-300/70 mt-2 space-x-6">
                          <span>
                            Available:{" "}
                            <strong>
                              {supplier.volume.toLocaleString()} tons
                            </strong>
                          </span>
                          <span>
                            Price:{" "}
                            <strong>
                              ₹{supplier.price.toLocaleString()}/ton
                            </strong>
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-2 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 group/button relative overflow-hidden w-full sm:w-auto"
                        aria-label={`Request quote from ${supplier.name}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Request Quote</span>
                          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "calculator":
        return (
          <div className="bg-black/80 p-6 rounded-xl border border-green-400/30 text-white shadow-lg shadow-green-400/20 hover:shadow-green-400/30 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-green-400">
              CO₂ & Water Savings Calculator
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label
                  htmlFor="bricks"
                  className="block text-sm mb-2 text-green-300/70"
                >
                  Number of Bricks
                </label>
                <div className="relative">
                  <input
                    id="bricks"
                    type="number"
                    min="0"
                    value={calculatorData.bricks}
                    onChange={handleCalculatorChange}
                    className="w-full px-4 py-3 bg-black/60 border border-green-400/30 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400/50 text-white hover:bg-green-400/20 transition-all duration-300 outline-none"
                    placeholder="Enter number of bricks"
                    aria-label="Number of bricks for CO2 and water savings calculation"
                  />
                </div>
                <button
                  onClick={resetCalculator}
                  className="w-full px-4 py-2 bg-black/60 text-green-400 border border-green-400/30 rounded-xl hover:bg-green-400/20 hover:scale-105 transition-all duration-300 group"
                  aria-label="Reset calculator"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Reset</span>
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-green-900/30 p-6 rounded-xl border border-green-400/30 shadow-lg shadow-green-400/20 hover:shadow-green-400/30 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-200 mb-2">
                    CO₂ Savings
                  </h3>
                  <p className="text-3xl font-bold text-green-400">
                    {Number(calculatorData.co2Savings).toLocaleString()} kg
                  </p>
                  <p className="text-sm text-green-300/70 mt-1">
                    ≈ {Math.round(calculatorData.co2Savings / 22)} trees planted
                  </p>
                </div>
                <div className="bg-green-900/30 p-6 rounded-xl border border-green-400/30 shadow-lg shadow-green-400/20 hover:shadow-green-400/30 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-200 mb-2">
                    Water Savings
                  </h3>
                  <p className="text-3xl font-bold text-green-400">
                    {Number(calculatorData.waterSavings).toLocaleString()} L
                  </p>
                  <p className="text-sm text-green-300/70 mt-1">
                    ≈ {Math.round(calculatorData.waterSavings / 150)} people/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "messages":
      case "settings":
        return (
          <div className="bg-black/80 p-6 rounded-xl border border-green-400/30 text-white shadow-lg shadow-green-400/20">
            <h2 className="text-xl font-bold mb-4 text-green-400 capitalize">
              {activeTab}
            </h2>
            <p className="text-green-300/70">This section is coming soon...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black text-white flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/80 rounded-full animate-float-${
              (i % 6) + 1
            } shadow-lg shadow-green-400/50`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute border-2 border-green-400/60 rounded-full animate-morphing-wave-${
              (i % 3) + 1
            } shadow-lg shadow-green-400/30`}
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-black/95 border-r border-green-400/30 flex flex-col shadow-lg shadow-green-400/20">
        <div className="p-6 border-b border-green-400/30">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-green-400/30 group-hover:shadow-green-400/50">
                <Factory className="w-6 h-6 text-black" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 rounded-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                AshBrick
              </h1>
              <p className="text-sm text-green-300/70">Buyer Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map(({ id, label, icon: Icon }, index) => (
              <li key={id}>
                <button
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    activeTab === id
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
                      : "text-green-300/70 hover:bg-green-400/20"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={`Navigate to ${label}`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      activeTab === id ? "text-black" : "text-green-400"
                    } group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="font-medium">{label}</span>
                  {activeTab === id && (
                    <div className="ml-auto w-0 h-1 bg-green-400 group-hover:w-6 transition-all duration-300 shadow-sm shadow-green-400/50" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-green-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30">
              <Building className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-medium text-green-300">{profile?.name}</p>
              <p className="text-sm text-green-300/70">
                {profile?.role || "Buyer"}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 group relative overflow-hidden shadow-lg shadow-red-500/50 hover:shadow-red-500/70 hover:scale-105"
            aria-label="Logout"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white animate-sparkle-logout" />
            </div>
            <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white animate-sparkle-logout-2" />
            </div>
            <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-40 animate-pulse-logout rounded-xl" />
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Logout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2 capitalize bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {activeTab.replace("-", " ")}
          </h1>
          <p className="text-green-300/70">
            Welcome back,{" "}
            {user?.user_metadata?.name ||
              profile?.name ||
              user?.email?.split("@")[0] ||
              "User"}
            !{" "}
          </p>

          {renderContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          33% {
            transform: translateY(-25px) translateX(15px) rotate(120deg);
            opacity: 0.9;
          }
          66% {
            transform: translateY(-10px) translateX(-8px) rotate(240deg);
            opacity: 0.6;
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.5;
          }
          33% {
            transform: translateY(-20px) translateX(-12px) rotate(90deg);
            opacity: 0.9;
          }
          66% {
            transform: translateY(-30px) translateX(18px) rotate(180deg);
            opacity: 0.7;
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-35px) translateX(20px) rotate(150deg);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-8px) translateX(-15px) rotate(300deg);
            opacity: 0.5;
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          33% {
            transform: translateY(-18px) translateX(-20px) rotate(60deg);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-28px) translateX(12px) rotate(270deg);
            opacity: 0.6;
          }
        }
        @keyframes float-5 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-22px) translateX(25px) rotate(200deg);
            opacity: 0.7;
          }
          66% {
            transform: translateY(-12px) translateX(-18px) rotate(320deg);
            opacity: 0.5;
          }
        }
        @keyframes float-6 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.5;
          }
          33% {
            transform: translateY(-30px) translateX(-25px) rotate(45deg);
            opacity: 0.9;
          }
          66% {
            transform: translateY(-20px) translateX(22px) rotate(225deg);
            opacity: 0.6;
          }
        }
        @keyframes morphing-wave-1 {
          0% {
            transform: scale(0.5) rotate(0deg);
            opacity: 0.4;
            border-radius: 50%;
          }
          33% {
            transform: scale(1.2) rotate(120deg);
            opacity: 0.2;
            border-radius: 30%;
          }
          66% {
            transform: scale(0.8) rotate(240deg);
            opacity: 0.3;
            border-radius: 60%;
          }
          100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        @keyframes morphing-wave-2 {
          0% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0.3;
            border-radius: 40%;
          }
          33% {
            transform: scale(1) rotate(90deg);
            opacity: 0.1;
            border-radius: 70%;
          }
          66% {
            transform: scale(0.7) rotate(180deg);
            opacity: 0.2;
            border-radius: 20%;
          }
          100% {
            transform: scale(1.3) rotate(270deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        @keyframes morphing-wave-3 {
          0% {
            transform: scale(0.6) rotate(0deg);
            opacity: 0.2;
            border-radius: 60%;
          }
          33% {
            transform: scale(1.4) rotate(150deg);
            opacity: 0.05;
            border-radius: 40%;
          }
          66% {
            transform: scale(0.9) rotate(300deg);
            opacity: 0.15;
            border-radius: 80%;
          }
          100% {
            transform: scale(1.6) rotate(450deg);
            opacity: 0;
            border-radius: 50%;
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
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes sparkle-logout {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes sparkle-logout-2 {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-180deg);
            opacity: 1;
          }
        }
        @keyframes pulse-logout {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
        }
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }
        .animate-float-5 {
          animation: float-5 6s ease-in-out infinite;
        }
        .animate-float-6 {
          animation: float-6 11s ease-in-out infinite;
        }
        .animate-morphing-wave-1 {
          animation: morphing-wave-1 6s ease-out infinite;
        }
        .animate-morphing-wave-2 {
          animation: morphing-wave-2 5s ease-out infinite 1s;
        }
        .animate-morphing-wave-3 {
          animation: morphing-wave-3 7s ease-out infinite 2s;
        }
        .animate-pulse-ring {
          animation: pulse-ring 1s ease-out infinite;
        }
        .animate-sparkle-logout {
          animation: sparkle-logout 1s ease-in-out infinite;
        }
        .animate-sparkle-logout-2 {
          animation: sparkle-logout-2 1s ease-in-out infinite 0.5s;
        }
        .animate-pulse-logout {
          animation: pulse-logout 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Reusable InfoCard Component
const InfoCard = ({ title, value, unit, icon: Icon, color }) => (
  <div
    className={`bg-black/80 p-6 rounded-xl border border-${color}-400/30 shadow-lg shadow-${color}-400/20 hover:shadow-${color}-400/30 transition-all duration-300 group relative overflow-hidden`}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-r from-${color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />
    <div className="flex items-center space-x-3 relative z-10">
      <div
        className={`w-12 h-12 bg-${color}-900/30 rounded-xl flex items-center justify-center`}
      >
        <Icon
          className={`w-6 h-6 text-${color}-400 group-hover:scale-110 transition-transform duration-300`}
        />
      </div>
      <div>
        <p className="text-sm text-green-300/70">{title}</p>
        <p className="text-2xl font-bold text-green-400">
          {value} {unit && <span className="text-sm">{unit}</span>}
        </p>
      </div>
    </div>
  </div>
);

export default BuyerDashboard;
