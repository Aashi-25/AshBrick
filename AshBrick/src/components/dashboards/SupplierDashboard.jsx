import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Factory, 
  Plus, 
  List, 
  MessageSquare, 
  Settings, 
  BarChart3,
  MapPin,
  Upload,
  DollarSign,
  Truck,
  Calendar,
  LogOut
} from 'lucide-react'

const SupplierDashboard = () => {
  const { user, profile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [ashListing, setAshListing] = useState({
    volume: '',
    location: '',
    price: '',
    description: ''
  })

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'add-listing', label: 'Add Ash Listing', icon: Plus },
    { id: 'my-listings', label: 'My Listings', icon: List },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const mockListings = [
    {
      id: 1,
      volume: 500,
      location: 'Mumbai, Maharashtra',
      price: 2500,
      status: 'Active',
      created: '2024-01-15'
    },
    {
      id: 2,
      volume: 750,
      location: 'Pune, Maharashtra',
      price: 2800,
      status: 'Pending',
      created: '2024-01-10'
    }
  ]

  const handleInputChange = (e) => {
    setAshListing({
      ...ashListing,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitListing = (e) => {
    e.preventDefault()
    console.log('New listing:', ashListing)
    alert('Listing created successfully!')
    setAshListing({
      volume: '',
      location: '',
      price: '',
      description: ''
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
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Factory className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Listings</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹2.4L</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'add-listing':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Ash Listing</h2>
            <form onSubmit={handleSubmitListing} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ash Volume (tons)
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={ashListing.volume}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                    placeholder="Enter volume in tons"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per ton (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={ashListing.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                    placeholder="Enter price per ton"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={ashListing.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={ashListing.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none"
                  placeholder="Describe the ash quality, specifications, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Lab Report
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF files only (Max 10MB)</p>
                  <input type="file" className="hidden" accept=".pdf" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Create Listing
              </button>
            </form>
          </div>
        )

      case 'my-listings':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
              <button
                onClick={() => setActiveTab('add-listing')}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
            </div>
            <div className="grid gap-4">
              {mockListings.map((listing) => (
                <div key={listing.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">
                        {listing.volume} tons Fly Ash
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>₹{listing.price}/ton</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{listing.created}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
              ))}
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
              <p className="text-sm text-gray-600">Supplier Portal</p>
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
              <Factory className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <p className="text-sm text-gray-600">{profile?.role}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
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

export default SupplierDashboard