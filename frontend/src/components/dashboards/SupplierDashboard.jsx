import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Factory,
  Plus,
  List,
  MessageSquare,
  Settings,
  BarChart3,
  MapPin,
  Upload,
  FileText,
  DollarSign,
  Truck,
  Calendar,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

// InfoCard component defined before usage
const InfoCard = ({ title, value, icon: Icon, color }) => (
  <div
    className={`bg-black/80 p-6 rounded-xl border border-${color}-400/20 shadow-lg shadow-${color}-400/10 hover:shadow-${color}-400/20 transition-all duration-300 group relative overflow-hidden`}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-r from-${color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className={`text-sm text-${color}-300/70`}>{title}</p>
        <p className={`text-2xl font-bold text-${color}-400`}>{value}</p>
      </div>
      <Icon className={`w-8 h-8 text-${color}-400/70 group-hover:scale-110 transition-transform duration-300`} />
    </div>
  </div>
);

const SupplierDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [ashListing, setAshListing] = useState({
    name: "",
    volume: "",
    location: "",
    price: "",
    description: "",
  });
  const [labReport, setLabReport] = useState(null);
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({ name: profile?.name || "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !user ||
      (profile?.role !== "Supplier" && user?.user_metadata?.role !== "Supplier")
    ) {
      console.warn("Unauthorized access to SupplierDashboard");
      navigate("/");
    } else if (activeTab === "my-listings") {
      fetchListings();
    } else if (activeTab === "messages") {
      fetchMessages();
    }
  }, [user, profile, navigate, activeTab]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          "X-User-Email": user.email,
        },
        body: JSON.stringify({ email: user.email }), // Fallback for body-based auth
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch listings: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log("Raw API response:", data);
      const supplierListings = data.filter((listing) => listing.supplier_email === user.email);
      console.log("Filtered listings for supplier:", supplierListings);
      setListings(supplierListings);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/messages", {
        method: "GET",
        headers: {
          "X-User-Email": user.email,
        },
        body: JSON.stringify({ email: user.email }), // Fallback for body-based auth
      });
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitListing = async (e) => {
    e.preventDefault();
    if (ashListing.volume <= 0 || ashListing.price <= 0) {
      setError("Volume and price must be positive numbers");
      return;
    }
    if (!ashListing.location.trim() || !ashListing.name.trim()) {
      setError("Name and location are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", ashListing.name);
    formData.append("description", ashListing.description);
    formData.append("price", ashListing.price);
    formData.append("quantity_available", ashListing.volume);
    formData.append("location", ashListing.location);
    formData.append("supplier_email", user.email);
    if (labReport) formData.append("labReport", labReport);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "X-User-Email": user.email,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create listing: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setAshListing({ name: "", volume: "", location: "", price: "", description: "" });
      setLabReport(null);
      fetchListings(); // Refresh listings
      setError(null);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    if (!settings.name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/supplier/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": user.email,
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed to update settings");
      setError(null);
    } catch (err) {
      setError("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
        </div>
      );
    }
    if (error) {
      return <div className="text-red-400">{error}</div>;
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard title="Total Listings" value={listings.length} icon={Factory} color="green" />
              <InfoCard title="Revenue" value="₹2.4L" icon={DollarSign} color="emerald" />
              <InfoCard title="Delivered" value="8" icon={Truck} color="green" />
            </div>
          </div>
        );

      case "add-listing":
        return (
          <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
            <h2 className="text-xl font-bold text-green-400 mb-6">Add New Ash Listing</h2>
            <form onSubmit={handleSubmitListing} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">Listing Name</label>
                  <input
                    type="text"
                    name="name"
                    value={ashListing.name}
                    onChange={(e) => setAshListing({ ...ashListing, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter listing name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">Ash Volume (tons)</label>
                  <input
                    type="number"
                    name="volume"
                    value={ashListing.volume}
                    onChange={(e) => setAshListing({ ...ashListing, volume: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter volume in tons"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">Price per ton (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={ashListing.price}
                    onChange={(e) => setAshListing({ ...ashListing, price: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter price per ton"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
                    <input
                      type="text"
                      name="location"
                      value={ashListing.location}
                      onChange={(e) => setAshListing({ ...ashListing, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">Description</label>
                <textarea
                  name="description"
                  value={ashListing.description}
                  onChange={(e) => setAshListing({ ...ashListing, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                  placeholder="Describe the ash quality, specifications, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">Upload Lab Report</label>
                <div className="border-2 border-dashed border-green-400/20 rounded-xl p-6 text-center hover:border-green-400 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Upload className="w-8 h-8 text-green-400/70 mx-auto mb-2 group-hover:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-green-300/70">{labReport ? labReport.name : "Click to upload or drag and drop"}</p>
                  <p className="text-xs text-green-300/50">PDF files only (Max 10MB)</p>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf"
                    onChange={(e) => setLabReport(e.target.files[0])}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Create Listing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </form>
          </div>
        );

      case "my-listings":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-green-400">My Listings</h2>
              <button
                onClick={() => setActiveTab("add-listing")}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </span>
              </button>
            </div>
            <div className="grid gap-4">
              {listings.length === 0 ? (
                <div className="text-center text-green-300/70">No listings found.</div>
              ) : (
                listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-black/80 p-6 rounded-xl border border-green-400/20 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-green-400">{listing.name || `${listing.quantity_available} tons Fly Ash`}</h3>
                        <div className="flex items-center space-x-4 text-sm text-green-300/70">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{listing.location || "N/A"}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span>₹{listing.price}/ton</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-400/20">Active</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-400">Messages</h2>
            {messages.length === 0 ? (
              <p className="text-green-300/70">No messages found.</p>
            ) : (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <li key={message.id} className="bg-black/80 p-4 rounded-xl border border-green-400/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-green-300">{message.sender}</p>
                        <p className="text-sm text-green-300/70">{message.subject}</p>
                      </div>
                      <p className="text-xs text-green-300/50">{message.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
            <h2 className="text-xl font-bold text-green-400 mb-4">Settings</h2>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                  aria-label="Update your name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Save
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black text-white flex relative overflow-hidden">
      {/* Sidebar and background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/80 rounded-full animate-float-${(i % 6) + 1} shadow-lg shadow-green-400/50`}
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
            className={`absolute border-2 border-green-400/60 rounded-full animate-morphing-wave-${(i % 3) + 1} shadow-lg shadow-green-400/30`}
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
              <p className="text-sm text-green-300/70">Supplier Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "add-listing", label: "Add Ash Listing", icon: Plus },
              { id: "my-listings", label: "My Listings", icon: List },
              { id: "messages", label: "Messages", icon: MessageSquare },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(({ id, label, icon: Icon }, index) => (
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
              <Factory className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-medium text-green-300">{profile?.name}</p>
              <p className="text-sm text-green-300/70">{profile?.role || "Supplier"}</p>
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
            !
          </p>
          {renderContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-25px) translateX(15px) rotate(120deg); opacity: 0.9; }
          66% { transform: translateY(-10px) translateX(-8px) rotate(240deg); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
          33% { transform: translateY(-20px) translateX(-12px) rotate(90deg); opacity: 0.9; }
          66% { transform: translateY(-30px) translateX(18px) rotate(180deg); opacity: 0.7; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          33% { transform: translateY(-35px) translateX(20px) rotate(150deg); opacity: 0.8; }
          66% { transform: translateY(-8px) translateX(-15px) rotate(300deg); opacity: 0.5; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-18px) translateX(-20px) rotate(60deg); opacity: 0.8; }
          66% { transform: translateY(-28px) translateX(12px) rotate(270deg); opacity: 0.6; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          33% { transform: translateY(-22px) translateX(25px) rotate(200deg); opacity: 0.7; }
          66% { transform: translateY(-12px) translateX(-18px) rotate(320deg); opacity: 0.5; }
        }
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
          33% { transform: translateY(-30px) translateX(-25px) rotate(45deg); opacity: 0.9; }
          66% { transform: translateY(-20px) translateX(22px) rotate(225deg); opacity: 0.6; }
        }
        @keyframes morphing-wave-1 {
          0% { transform: scale(0.5) rotate(0deg); opacity: 0.4; border-radius: 50%; }
          33% { transform: scale(1.2) rotate(120deg); opacity: 0.2; border-radius: 30%; }
          66% { transform: scale(0.8) rotate(240deg); opacity: 0.3; border-radius: 60%; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; border-radius: 50%; }
        }
        @keyframes morphing-wave-2 {
          0% { transform: scale(0.3) rotate(0deg); opacity: 0.3; border-radius: 40%; }
          33% { transform: scale(1) rotate(90deg); opacity: 0.1; border-radius: 70%; }
          66% { transform: scale(0.7) rotate(180deg); opacity: 0.2; border-radius: 20%; }
          100% { transform: scale(1.3) rotate(270deg); opacity: 0; border-radius: 50%; }
        }
        @keyframes morphing-wave-3 {
          0% { transform: scale(0.6) rotate(0deg); opacity: 0.2; border-radius: 60%; }
          33% { transform: scale(1.4) rotate(150deg); opacity: 0.05; border-radius: 40%; }
          66% { transform: scale(0.9) rotate(300deg); opacity: 0.15; border-radius: 80%; }
          100% { transform: scale(1.6) rotate(450deg); opacity: 0; border-radius: 50%; }
        }
        @keyframes sparkle-logout {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        }
        @keyframes sparkle-logout-2 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(-180deg); opacity: 1; }
        }
        @keyframes pulse-logout {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 9s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 6s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 11s ease-in-out infinite; }
        .animate-morphing-wave-1 { animation: morphing-wave-1 6s ease-out infinite; }
        .animate-morphing-wave-2 { animation: morphing-wave-2 5s ease-out infinite 1s; }
        .animate-morphing-wave-3 { animation: morphing-wave-3 7s ease-out infinite 2s; }
        .animate-sparkle-logout { animation: sparkle-logout 1s ease-in-out infinite; }
        .animate-sparkle-logout-2 { animation: sparkle-logout-2 1s ease-in-out infinite 0.5s; }
        .animate-pulse-logout { animation: pulse-logout 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SupplierDashboard;