import { Factory, Menu, X } from 'lucide-react';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="relative z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
          <Factory className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AshBrick
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
        <a href="#ai-powered" className="hover:text-green-400 transition-colors">AI Platform</a>
        <a href="#impact" className="hover:text-green-400 transition-colors">Impact</a>
        <a href="#pricing" className="hover:text-green-400 transition-colors">Pricing</a>
        <button className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
    
    {/* Mobile Menu Dropdown */}
    <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 transition-all duration-300 ${
      isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      <div className="px-6 py-4 space-y-4">
        <a 
          href="#features" 
          className="block py-2 hover:text-green-400 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#ai-powered" 
          className="block py-2 hover:text-green-400 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          AI Platform
        </a>
        <a 
          href="#impact" 
          className="block py-2 hover:text-green-400 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Impact
        </a>
        <a 
          href="#pricing" 
          className="block py-2 hover:text-green-400 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Pricing
        </a>
        <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;