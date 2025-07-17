import { Factory, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
<<<<<<< HEAD
=======
import heroVideo from '../assets/background.mp4';
>>>>>>> upstream/main

const Navbar = ({ isMenuOpen, setIsMenuOpen, onAuthClick }) => {
  const { user, signOut } = useAuth();

  return (
<<<<<<< HEAD
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <Factory className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AshBrick
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="hover:text-green-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#ai-powered"
            className="hover:text-green-400 transition-colors"
          >
            AI Platform
          </a>
          <a href="#impact" className="hover:text-green-400 transition-colors">
            Impact
          </a>
          <a href="#pricing" className="hover:text-green-400 transition-colors">
            Pricing
          </a>

          {!user ? (
            <button
              onClick={onAuthClick}
              className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={signOut}
              className="bg-red-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
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

          {!user ? (
            <button
              onClick={() => {
                onAuthClick();
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="bg-red-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Logout
            </button>
          )}
=======
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 shadow-lg" style={{minHeight: '72px', background: '#181f2a', borderRadius: 0}}>
      {/* Video Background removed for solid color */}
      <div className="relative" style={{zIndex: 3}}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center" style={{borderRadius: 0}}>
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AshBrick
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="hover:text-green-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#ai-powered"
              className="hover:text-green-400 transition-colors"
            >
              AI Platform
            </a>
            <a href="#impact" className="hover:text-green-400 transition-colors">
              Impact
            </a>
            <a href="#pricing" className="hover:text-green-400 transition-colors">
              Pricing
            </a>

            {!user ? (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 font-semibold hover:scale-105 transition-transform"
                style={{borderRadius: 0}}
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={signOut}
                className="bg-red-500 px-6 py-2 font-semibold hover:scale-105 transition-transform"
                style={{borderRadius: 0}}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{borderRadius: 0}}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 border-t border-white/10 transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          style={{zIndex: 4, background: '#181f2a', borderRadius: 0}}
        >
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

            {!user ? (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 font-semibold hover:scale-105 transition-transform"
                style={{borderRadius: 0}}
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 px-6 py-2 font-semibold hover:scale-105 transition-transform"
                style={{borderRadius: 0}}
              >
                Logout
              </button>
            )}
          </div>
>>>>>>> upstream/main
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
