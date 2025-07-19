import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Shield, 
  BarChart3, 
  FileText, 
  Users, 
  CreditCard,
  Factory,
  Building,
  Leaf,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react'

const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: CreditCard }
  ]

  const mockUsers = [
    {
      id: 1,
      email: 'supplier@example.com',
      role: 'Supplier',
      status: 'Active',
      joinDate: '2024-01-15',
      listings: 5
    },
    {
      id: 2,
      email: 'buyer@example.com',
      role: 'Buyer',
      status: 'Active',
      joinDate: '2024-01-20',
      orders: 3
    },
    {
      id: 3,
      email: 'inactive@example.com',
      role: 'Buyer',
      status: 'Inactive',
      joinDate: '2024-01-10',
      orders: 0
    }
  ]

  const mockTransactions = [
    {
      id: 'TXN001',
      buyer: 'buyer@example.com',
      supplier: 'supplier@example.com',
      amount: 125000,
      volume: 50,
      status: 'Completed',
      date: '2024-01-25'
    },
    {
      id: 'TXN002',
      buyer: 'buyer2@example.com',
      supplier: 'supplier@example.com',
      amount: 210000,
      volume: 75,
      status: 'Pending',
      date: '2024-01-24'
    }
  ]

  const generateESGReport = () => {
    alert('ESG Report generation started. You will receive an email when ready.')
  }

  const filteredUsers = mockUsers.filter(u => {
    const roleMatch = roleFilter === 'All Roles' || u.role === roleFilter
    const statusMatch = statusFilter === 'All Status' || u.status === statusFilter
    return roleMatch && statusMatch
  })

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <InfoCard
                title="Total Users"
                value="1,247"
                icon={Users}
                color="green"
              />
              <InfoCard
                title="Ash Traded"
                value="15.2k"
                unit="tons"
                icon={Factory}
                color="emerald"
              />
              <InfoCard
                title="CO₂ Saved"
                value="2.3k"
                unit="tons"
                icon={Leaf}
                color="green"
              />
              <InfoCard
                title="Revenue"
                value="₹38L"
                icon={TrendingUp}
                color="emerald"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/80 p-6 rounded-xl border border-green-400/20 shadow-lg shadow-green-400/10">
                <h3 className="text-lg font-semibold text-green-400 mb-4">Monthly Growth</h3>
                <div className="bg-black/50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent animate-pulse-ring" />
                  <div className="text-center relative z-10">
                    <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-green-300/70">Chart Coming Soon</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/80 p-6 rounded-xl border border-green-400/20 shadow-lg shadow-green-400/10">
                <h3 className="text-lg font-semibold text-green-400 mb-4">User Distribution</h3>
                <div className="bg-black/50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent animate-pulse-ring" />
                  <div className="text-center relative z-10">
                    <Users className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-green-300/70">Chart Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-green-400">ESG Reports</h2>
              <button
                onClick={generateESGReport}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Generate ESG Report</span>
                </span>
              </button>
            </div>
            <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Environmental Impact Summary</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-900/30 rounded-xl border border-green-400/20">
                  <Leaf className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-400">2,340</p>
                  <p className="text-sm text-green-300/70">Tons CO₂ Saved</p>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-xl border border-green-400/20">
                  <Factory className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-400">15,200</p>
                  <p className="text-sm text-green-300/70">Tons Ash Recycled</p>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-xl border border-green-400/20">
                  <Building className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-400">850</p>
                  <p className="text-sm text-green-300/70">Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-black/80 rounded-xl border border-green-400/20 p-6 shadow-lg shadow-green-400/10">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-xl border border-green-400/20 group hover:shadow-green-400/20 transition-all duration-300">
                  <div>
                    <p className="font-medium text-green-400">Q4 2024 ESG Report</p>
                    <p className="text-sm text-green-300/70">Generated on Jan 25, 2024</p>
                  </div>
                  <button className="text-green-400 hover:text-green-300">
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-xl border border-green-400/20 group hover:shadow-green-400/20 transition-all duration-300">
                  <div>
                    <p className="font-medium text-green-400">Q3 2024 ESG Report</p>
                    <p className="text-sm text-green-300/70">Generated on Oct 25, 2024</p>
                  </div>
                  <button className="text-green-400 hover:text-green-300">
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-green-400">User Management</h2>
              <div className="flex space-x-3">
                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="px-4 py-2 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                >
                  <option>All Roles</option>
                  <option>Supplier</option>
                  <option>Buyer</option>
                  <option>Admin</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="bg-black/80 rounded-xl border border-green-400/20 overflow-hidden shadow-lg shadow-green-400/10">
              <table className="w-full">
                <thead className="bg-black/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black/80 divide-y divide-green-400/20">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-900/30 rounded-full flex items-center justify-center">
                            {user.role === 'Supplier' ? (
                              <Factory className="w-5 h-5 text-green-400" />
                            ) : (
                              <Building className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-green-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'Supplier' 
                            ? 'bg-green-900/30 text-green-400 border border-green-400/20'
                            : 'bg-blue-900/30 text-blue-400 border border-blue-400/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-900/30 text-green-400 border border-green-400/20'
                            : 'bg-red-900/30 text-red-400 border border-red-400/20'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {user.listings ? `${user.listings} listings` : `${user.orders} orders`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-green-400">Transaction Management</h2>
              <div className="flex space-x-3">
                <select className="px-4 py-2 bg-black/50 border border-green-400/20 rounded-xl focus:ring-2 focus:ring-green-400 text-white hover:bg-green-400/10 transition-all duration-300 outline-none">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
            <div className="bg-black/80 rounded-xl border border-green-400/20 overflow-hidden shadow-lg shadow-green-400/10">
              <table className="w-full">
                <thead className="bg-black/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-300/70 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black/80 divide-y divide-green-400/20">
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {transaction.buyer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {transaction.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {transaction.volume} tons
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.status === 'Completed'
                            ? 'bg-green-900/30 text-green-400 border border-green-400/20'
                            : transaction.status === 'Pending'
                            ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/20'
                            : 'bg-red-900/30 text-red-400 border border-red-400/20'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300/70">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black text-white flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/80 rounded-full animate-float-${i % 6 + 1} shadow-lg shadow-green-400/50`}
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
            className={`absolute border-2 border-green-400/60 rounded-full animate-morphing-wave-${i % 3 + 1} shadow-lg shadow-green-400/30`}
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
      <aside className="w-64 bg-black/95 border-r border-green-400/20 p-6 flex flex-col shadow-lg shadow-green-400/10">
        <div className="flex items-center space-x-3 mb-8 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-green-400/20 group-hover:shadow-green-400/40">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div className="absolute inset-0 w-10 h-10 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 rounded-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-sm text-green-300/70">AshBrick Admin</p>
          </div>
        </div>
        <nav className="flex flex-col space-y-4 flex-1">
          {sidebarItems.map(({ id, label, icon: Icon }, index) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
                activeTab === id
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
                  : 'text-green-300/70 hover:bg-green-400/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className={`w-5 h-5 ${activeTab === id ? 'text-black' : 'text-green-400'} group-hover:scale-110 transition-transform duration-300`} />
              <span>{label}</span>
              {activeTab === id && (
                <div className="ml-auto w-0 h-1 bg-green-400 group-hover:w-6 transition-all duration-300 shadow-sm shadow-green-400/50" />
              )}
            </button>
          ))}
          <button
            onClick={signOut}
            className="mt-auto px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 group relative overflow-hidden shadow-lg shadow-red-500/50 hover:shadow-red-500/70 hover:scale-105"
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
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold capitalize bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-green-300/70 mb-6">
            Welcome back, {user?.email?.split('@')[0]}!
          </p>
          {renderContent()}
        </div>
      </main>

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
          33% { transform: scale(1.0) rotate(90deg); opacity: 0.1; border-radius: 70%; }
          66% { transform: scale(0.7) rotate(180deg); opacity: 0.2; border-radius: 20%; }
          100% { transform: scale(1.3) rotate(270deg); opacity: 0; border-radius: 50%; }
        }
        @keyframes morphing-wave-3 {
          0% { transform: scale(0.6) rotate(0deg); opacity: 0.2; border-radius: 60%; }
          33% { transform: scale(1.4) rotate(150deg); opacity: 0.05; border-radius: 40%; }
          66% { transform: scale(0.9) rotate(300deg); opacity: 0.15; border-radius: 80%; }
          100% { transform: scale(1.6) rotate(450deg); opacity: 0; border-radius: 50%; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(1.5); opacity: 0; }
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
        .animate-pulse-ring { animation: pulse-ring 1s ease-out infinite; }
        .animate-sparkle-logout { animation: sparkle-logout 1s ease-in-out infinite; }
        .animate-sparkle-logout-2 { animation: sparkle-logout-2 1s ease-in-out infinite 0.5s; }
        .animate-pulse-logout { animation: pulse-logout 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

const InfoCard = ({ title, value, unit, icon: Icon, color }) => (
  <div className={`bg-black/80 p-6 rounded-xl border border-${color}-400/20 shadow-lg shadow-${color}-400/10 hover:shadow-${color}-400/20 transition-all duration-300 group relative overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-r from-${color}-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="flex items-center space-x-3 relative z-10">
      <div className={`w-12 h-12 bg-${color}-900/30 rounded-xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-400 group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <div>
        <p className="text-sm text-green-300/70">{title}</p>
        <p className="text-2xl font-bold text-green-400">{value}</p>
        {unit && <p className="text-xs text-green-300/50">{unit}</p>}
      </div>
    </div>
  </div>
)

export default AdminDashboard