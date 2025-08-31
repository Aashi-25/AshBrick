import React, { useState } from "react";
import { MapPin, Calendar, DollarSign, FileText, Package, ArrowRight } from "lucide-react";

const BuyerReq = () => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    deliveryLocation: "",
    deliveryDate: "",
    budget: "",
    notes: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/buyer/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions); 
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-black/80 p-8 rounded-xl border border-green-400/20 text-white shadow-lg shadow-green-400/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Post Your Requirement
          </h2>
          <p className="text-green-300/70 mt-2">
            Let suppliers know what you're looking for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Product Name</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white placeholder-green-400/50 hover:bg-green-400/10 transition-all duration-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Quantity (tons)</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity in tons"
              className="w-full px-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white placeholder-green-400/50 hover:bg-green-400/10 transition-all duration-300 outline-none"
              required
            />
          </div>

          {/* Delivery Location */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Delivery Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
              <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="Enter delivery location"
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white placeholder-green-400/50 hover:bg-green-400/10 transition-all duration-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Expected Delivery Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Budget (Optional)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400/70" />
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="₹ Enter your budget"
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white placeholder-green-400/50 hover:bg-green-400/10 transition-all duration-300 outline-none"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm text-green-300/70 mb-2">Additional Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-green-400/70" />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any specific requirements or notes"
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white placeholder-green-400/50 hover:bg-green-400/10 transition-all duration-300 outline-none resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-green-400/40 flex items-center justify-center space-x-2"
          >
            <span>Submit Requirement</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* AI Supplier Suggestions */}
        {loading && <p className="mt-6 text-green-300">Finding matches...</p>}
        {suggestions.length > 0 && (
          <div className="mt-6 bg-black/50 border border-green-400/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">AI Suggested Suppliers:</h3>
            <ul className="list-disc list-inside space-y-1 text-green-300">
              {suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerReq;
