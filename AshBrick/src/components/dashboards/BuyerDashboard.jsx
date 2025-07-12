import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
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
  Filter
} from 'lucide-react'

const BuyerDashboard = () => {
  const { user, profile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [calculatorData, setCalculatorData] = useState({
    bricks: '',
    co2Savings: 0,
    waterSavings: 0
  })

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'suppliers', label: 'Find Suppliers', icon: Map },
    { id: 'calculator', label: 'CO₂ Calculator', icon: Calculator },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const mockSuppliers = [
    {
      id: 1,
      name: 'Green Ash Industries',
      location: 'Mumbai, Maharashtra',
      distance: '12 km',
      volume: 500,
      price: 2500,
      rating: 4.8
    },
    {
      id: 2,
      name: 'EcoFly Materials',
      location: 'Pune, Maharashtra',
      distance: '25 km',
      volume: 750,
      price: 2800,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Sustainable Ash Co.',
      location: 'Nashik, Maharashtra',
      distance: '45 km',
      volume: 300,
      price: 2300,
      rating: 4.9
    }
  ]

  const calculateSavings = (bricks) => {
    const co2PerBrick = 0.15 // kg CO2 saved per brick
    const waterPerBrick = 0.6 // liters water saved per brick
    
    return {
      co2Savings: (bricks * co2PerBrick).toFixed(2),
      waterSavings: (bricks * waterPerBrick).toFixed(1)
    }
  }

  const handleCalculatorChange = (e) => {
    const bricks = parseInt(e.target.value) || 0
    const savings = calculateSavings(bricks)
    
    setCalculatorData({
      bricks: e.target.value,
      co2Savings: savings.co2Savings,
      waterSavings: savings.waterSavings
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Saved</p>
                    <p className="text-2xl font-bold text-gray-900">2.4t</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Water Saved</p>
                    <p className="text-2xl font-bold text-gray-900">1.2kL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Suppliers</h2>
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500">View suppliers on map with real-time locations</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'suppliers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Find Suppliers</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {mockSuppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{supplier.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{supplier.location}</span>
                          </div>
                          <span>•</span>
                          <span>{supplier.distance} away</span>
                          <span>•</span>
                          <span>⭐ {supplier.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div>
                          <span className="text-gray-600">Available: </span>
                          <span className="font-medium">{supplier.volume} tons</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Price: </span>
                          <span className="font-medium">₹{supplier.price}/ton</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center space-x-2">
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'calculator':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">CO₂ & Water Savings Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Bricks
                  </label>
                  <input
                    type="number"
                    value={calculatorData.bricks}
                    onChange={handleCalculatorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-lg"
                    placeholder="Enter number of bricks"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">How it works:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Traditional brick: 0.18 kg CO₂ per brick</li>
                    <li>• Fly ash brick: 0.03 kg CO₂ per brick</li>
                    <li>• Water savings: 0.6L per brick</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Leaf className="w-8 h-8 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">CO₂ Savings</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {calculatorData.co2Savings} kg
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Equivalent to planting {Math.round(calculatorData.co2Savings / 22)} trees
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Droplets className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Water Savings</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">
                    {calculatorData.waterSavings} L
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Enough for {Math.round(calculatorData.waterSavings / 150)} people per day
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{activeTab}</h2>
            <p className="text-gray-600">This section is coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AshBrick
              </h1>
              <p className="text-sm text-gray-600">Buyer Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <p className="text-sm text-gray-600">{profile?.role}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.email?.split('@')[0]}!
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard