import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
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
} from "lucide-react";

const BuyerDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [calculatorData, setCalculatorData] = useState({
    bricks: "",
    co2Savings: 0,
    waterSavings: 0,
  });

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
    const bricks = parseInt(e.target.value) || 0;
    const savings = calculateSavings(bricks);
    setCalculatorData({
      bricks: e.target.value,
      co2Savings: savings.co2Savings,
      waterSavings: savings.waterSavings,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="Active Orders"
                value="5"
                icon={Building}
                color="blue"
              />
              <InfoCard
                title="CO₂ Saved"
                value="2.4t"
                icon={Leaf}
                color="green"
              />
              <InfoCard
                title="Water Saved"
                value="1.2kL"
                icon={Droplets}
                color="purple"
              />
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Nearby Suppliers</h2>
              <div className="bg-slate-700 h-64 rounded-xl flex items-center justify-center text-slate-300">
                <div className="text-center">
                  <Map className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map Coming Soon</p>
                  <p className="text-sm text-slate-400">
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Find Suppliers</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="pl-10 pr-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-xl focus:ring-green-400 outline-none"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-xl hover:bg-slate-700">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {mockSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start text-white">
                    <div>
                      <h3 className="font-semibold text-lg">{supplier.name}</h3>
                      <div className="flex items-center text-sm text-slate-300 mt-1 space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <span>•</span>
                        <span>{supplier.distance}</span>
                        <span>•</span>
                        <span>⭐ {supplier.rating}</span>
                      </div>
                      <div className="text-sm text-slate-300 mt-2 space-x-6">
                        <span>
                          Available: <strong>{supplier.volume} tons</strong>
                        </span>
                        <span>
                          Price: <strong>₹{supplier.price}/ton</strong>
                        </span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-xl text-white font-semibold hover:scale-105 transition">
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "calculator":
        return (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-white">
            <h2 className="text-xl font-bold mb-6">
              CO₂ & Water Savings Calculator
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm mb-2">Number of Bricks</label>
                <input
                  type="number"
                  value={calculatorData.bricks}
                  onChange={handleCalculatorChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-green-400 text-white"
                  placeholder="Enter number of bricks"
                />
              </div>

              <div className="space-y-6">
                <div className="bg-green-900 p-6 rounded-xl border border-green-700">
                  <h3 className="text-lg font-semibold text-green-200 mb-2">
                    CO₂ Savings
                  </h3>
                  <p className="text-3xl font-bold text-green-400">
                    {calculatorData.co2Savings} kg
                  </p>
                  <p className="text-sm text-green-300 mt-1">
                    ≈ {Math.round(calculatorData.co2Savings / 22)} trees
                  </p>
                </div>
                <div className="bg-blue-900 p-6 rounded-xl border border-blue-700">
                  <h3 className="text-lg font-semibold text-blue-200 mb-2">
                    Water Savings
                  </h3>
                  <p className="text-3xl font-bold text-blue-400">
                    {calculatorData.waterSavings} L
                  </p>
                  <p className="text-sm text-blue-300 mt-1">
                    ≈ {Math.round(calculatorData.waterSavings / 150)} people/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-white">
            <h2 className="text-xl font-bold mb-4">{activeTab}</h2>
            <p>This section is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AshBrick</h1>
              <p className="text-sm text-slate-400">Buyer Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === id
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-slate-400">{profile?.role}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-900/10 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2 capitalize">
            {activeTab.replace("-", " ")}
          </h1>
          <p className="text-slate-300 mb-6">
            Welcome, {profile?.name || user?.email?.split("@")[0]}!
          </p>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Reusable card
const InfoCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
    <div className="flex items-center space-x-3">
      <div
        className={`w-12 h-12 bg-${color}-900/30 rounded-xl flex items-center justify-center`}
      >
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div>
        <p className="text-sm text-slate-300">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default BuyerDashboard;
