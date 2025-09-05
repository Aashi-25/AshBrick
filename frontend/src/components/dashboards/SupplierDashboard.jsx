import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
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
  BarChart2,
} from "lucide-react";

// Color mapping for consistent styling
const colorClasses = {
  green: {
    bg: "bg-green-400/20",
    text: "text-green-400",
    textLight: "text-green-300/70",
    border: "border-green-400/20",
    shadow: "shadow-green-400/10",
    hoverShadow: "hover:shadow-green-400/20",
    gradientFrom: "from-green-400/20",
  },
  emerald: {
    bg: "bg-emerald-400/20",
    text: "text-emerald-400",
    textLight: "text-emerald-300/70",
    border: "border-emerald-400/20",
    shadow: "shadow-emerald-400/10",
    hoverShadow: "hover:shadow-emerald-400/20",
    gradientFrom: "from-emerald-400/20",
  },
};

const InfoCard = ({ title, value, icon: Icon, color = "green" }) => {
  const colors = colorClasses[color] || colorClasses.green;

  return (
    <div
      className={`bg-black/80 p-6 rounded-xl border ${colors.border} ${colors.shadow} ${colors.hoverShadow} transition-all duration-300 group relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${colors.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className={`text-sm ${colors.textLight}`}>{title}</p>
          <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
        </div>
        <Icon
          className={`w-8 h-8 ${colors.text}/70 group-hover:scale-110 transition-transform duration-300`}
        />
      </div>
    </div>
  );
};

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
  const [pricePrediction, setPricePrediction] = useState({
    state: "",
    city: "",
    grade: "",
    purity: "",
    quantity: 0,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

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

  const getAuthToken = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      console.error("Session error:", error?.message || "No session");
      throw new Error("Authentication error: Please log in again");
    }
    console.log("Token retrieved:", session.access_token);
    return session.access_token;
  };

  const handleDelete = async (productId) => {
    try {
      const token = await getAuthToken();
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to delete product: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== productId)
      );
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to fetch products: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }
      const data = await response.json();
      console.log("Raw API response:", data);
      const supplierListings = data.filter(
        (listing) => listing.supplier_id === user.id
      );
      console.log("Filtered products for supplier:", supplierListings);
      setListings(supplierListings);
      setError(null);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("queries")
        .select(
          "id, buyer_id, supplier_id, message, response, status, created_at"
        )
        .eq("supplier_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch queries: ${error.message}`);
      }

      setMessages(data);
      setError(null);
    } catch (err) {
      console.error("Fetch messages error:", err);
      setError(err.message);
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

    if (!user?.id) {
      setError("User authentication failed. Please log in again.");
      return;
    }

    try {
      const token = await getAuthToken();

      const payload = {
        name: ashListing.name,
        description: ashListing.description,
        price: ashListing.price,
        quantity_available: ashListing.volume,
        location: ashListing.location,
        supplier_id: user.id,
      };

      console.log("Submitting listing with payload:", payload);

      setIsLoading(true);

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to create listing: ${response.status} - ${
            errorData.error || response.statusText
          }`
        );
      }

      const data = await response.json();
      console.log("Listing created:", data);

      setAshListing({
        name: "",
        volume: "",
        location: "",
        price: "",
        description: "",
      });
      fetchListings();
      setError(null);
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        err.message.includes("foreign key")
          ? "Failed to create listing: Invalid supplier ID. Please log out and log in again."
          : err.message
      );
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
      const token = await getAuthToken();
      const response = await fetch(
        "http://localhost:3000/api/supplier/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...settings, user_id: user.id }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to update settings: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }
      setError(null);
    } catch (err) {
      console.error("Update settings error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePricePredictionSubmit = async (e) => {
    e.preventDefault();

    const { state, city, grade, purity, quantity } = pricePrediction;

    if (!state.trim() || !city.trim() || !grade.trim()) {
      setError("State, City, and Grade are required.");
      return;
    }

    if (purity === "" || purity < 0 || purity > 100) {
      setError("Purity must be between 0 and 100.");
      return;
    }

    if (quantity === "" || quantity <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    try {
      setIsLoading(true);
      const token = await getAuthToken();

      console.log({
        State: state,

        City: city,
        Grade: grade,
        Purity: parseFloat(purity),
        Quantity: parseFloat(quantity),
      });

      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          State: state,
          City: city,
          Grade: grade,
          Purity: parseFloat(purity),
          Quantity: parseFloat(quantity),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to predict price: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
      setError(null);
    } catch (err) {
      console.error("Price prediction error:", err);
      setError("Failed to predict price. Please try again later.");
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
      return (
        <div className="text-red-400 p-6 text-center">
          <p>{error}</p>
          {error.includes("listing") && (
            <p className="text-sm text-green-300/70 mt-2">
              Unable to create listing. Ensure all fields are valid and try
              again, or contact support.
            </p>
          )}
          {error.includes("messages") && (
            <p className="text-sm text-green-300/70 mt-2">
              Unable to load messages. This feature may not be available yet.
              Please try again later or contact support.
            </p>
          )}
          {error.includes("predict price") && (
            <p className="text-sm text-green-300/70 mt-2">
              Unable to predict price. Please check your inputs or try again
              later.
            </p>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="Total Listings"
                value={listings.length}
                icon={Factory}
                color="green"
              />
              <InfoCard
                title="Revenue"
                value="₹2.4L"
                icon={DollarSign}
                color="emerald"
              />
              <InfoCard
                title="Delivered"
                value="8"
                icon={Truck}
                color="green"
              />
            </div>
          </div>
        );

      case "add-listing":
        return (
          <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
            <h2 className="text-xl font-bold text-green-400 mb-6">
              Add New Ash Listing
            </h2>
            <form onSubmit={handleSubmitListing} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Listing Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={ashListing.name}
                    onChange={(e) =>
                      setAshListing({ ...ashListing, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter listing name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Ash Volume (tons)
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={ashListing.volume}
                    onChange={(e) =>
                      setAshListing({ ...ashListing, volume: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter volume in tons"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Price per ton (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={ashListing.price}
                    onChange={(e) =>
                      setAshListing({ ...ashListing, price: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter price per ton"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
                    <input
                      type="text"
                      name="location"
                      value={ashListing.location}
                      onChange={(e) =>
                        setAshListing({
                          ...ashListing,
                          location: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={ashListing.description}
                  onChange={(e) =>
                    setAshListing({
                      ...ashListing,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                  placeholder="Describe the ash quality, specifications, etc."
                />
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
                <div className="text-center text-green-300/70">
                  No listings found.
                </div>
              ) : (
                listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-black/80 p-6 rounded-xl border border-green-400/20 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-green-400">
                          {listing.name ||
                            `${listing.quantity_available} tons Fly Ash`}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-green-300/70">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{listing.location || "N/A"}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>₹{listing.price}/ton</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span>
                              {listing.created_at
                                ? new Date(
                                    listing.created_at
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-400/20">
                          Active
                        </span>
                        <button
                          className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-400/20 hover:bg-red-900/50 transition"
                          onClick={() => handleDelete(listing.id)}
                        >
                          Delete
                        </button>
                      </div>
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
              <p className="text-center text-green-300/70 p-6">
                No messages available. Start a conversation with a buyer!
              </p>
            ) : (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className="bg-black/80 p-4 rounded-xl border border-green-400/20"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-green-300">
                          Buyer ID: {message.buyer_id}
                        </p>
                        <p className="text-sm text-green-300/70">
                          {message.message}
                        </p>
                        {message.response && (
                          <p className="text-sm text-green-300/70 mt-2">
                            Response: {message.response}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-green-300/50">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "price-predictor":
        return (
          <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
            <h2 className="text-xl font-bold text-green-400 mb-6">
              Price Predictor
            </h2>
            <form onSubmit={handlePricePredictionSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={pricePrediction.state}
                    onChange={(e) =>
                      setPricePrediction({
                        ...pricePrediction,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={pricePrediction.city}
                    onChange={(e) =>
                      setPricePrediction({
                        ...pricePrediction,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    value={pricePrediction.grade}
                    onChange={(e) =>
                      setPricePrediction({
                        ...pricePrediction,
                        grade: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter grade"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-300/70 mb-2">
                    Purity (%)
                  </label>
                  <input
                    type="number"
                    name="purity"
                    value={pricePrediction.purity}
                    onChange={(e) =>
                      setPricePrediction({
                        ...pricePrediction,
                        purity: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                    placeholder="Enter purity percentage"
                    required
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">
                  Quantity (MT)
                </label>
                <input
                  type="number"
                  name="Quantity_MT"
                  value={pricePrediction.quantity}
                  onChange={(e) =>
                    setPricePrediction({
                      ...pricePrediction,
                      quantity: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                  placeholder="Enter quantity in metric tons"
                  required
                  min="0"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Predict Price</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </form>
            {predictedPrice && (
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-green-400 text-lg font-semibold">
                  Predicted Price: ₹{predictedPrice}/ton
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setPricePrediction({
                      state: "",
                      city: "",
                      grade: "",
                      purity: "",
                      quantity: "",
                    })
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
            <h2 className="text-xl font-bold text-green-400 mb-4">
              My Account
            </h2>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-300/70 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/80 rounded-full shadow-lg shadow-green-400/50`}
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
            className={`absolute border-2 border-green-400/60 rounded-full shadow-lg shadow-green-400/30`}
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
              {
                id: "price-predictor",
                label: "Price Predictor",
                icon: BarChart2,
              },
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
              <p className="text-sm text-green-300/70">
                {profile?.role || "Supplier"}
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
    </div>
  );
};

export default SupplierDashboard;
