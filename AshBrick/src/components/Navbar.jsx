import React, { useState, useEffect } from 'react';
import { Factory, Menu, X, Leaf, Zap, Globe, Sparkles, ArrowRight } from "lucide-react";

// Mock auth context for demo
const useAuth = () => ({
  user: null,
  signOut: () => console.log('Sign out')
});

const Navbar = ({ isMenuOpen, setIsMenuOpen, onAuthClick }) => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { href: '#features', label: 'Features', icon: Zap },
    { href: '#ai-powered', label: 'AI Platform', icon: Globe },
    { href: '#impact', label: 'Impact', icon: Leaf },
    { href: '#pricing', label: 'Pricing', icon: Factory }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-green-400/20' 
        : 'bg-black/80 backdrop-blur-sm'
    }`}>
      {/* Dynamic mouse-following spotlight */}
      <div 
        className="absolute pointer-events-none opacity-60 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.1) 30%, transparent 70%)`,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}
      />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/80 rounded-full animate-float-${i % 6 + 1} shadow-lg shadow-green-400/50`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Matrix-style digital rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-green-400 via-green-500 to-transparent animate-matrix-rain shadow-sm shadow-green-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${30 + Math.random() * 60}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced neural network pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <div className={`absolute w-2 h-2 bg-green-400 rounded-full animate-neural-node-${i % 4 + 1} shadow-lg shadow-green-400/60`} />
            <div className={`absolute h-0.5 bg-gradient-to-r from-green-400/80 to-transparent animate-neural-connection-${i % 4 + 1} shadow-sm shadow-green-400/40`} />
          </div>
        ))}
      </div>

      {/* Morphing energy waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute border-2 border-green-400/60 rounded-full animate-morphing-wave-${i % 3 + 1} shadow-lg shadow-green-400/30`}
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Animated border with traveling light */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400/80 to-transparent shadow-sm shadow-green-400/50">
        <div className="absolute w-40 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-border-light shadow-lg shadow-green-400/80" />
      </div>

      <div className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-green-400/20 group-hover:shadow-green-400/40 rounded-lg group-hover:rounded-xl">
                <Factory className="w-7 h-7 text-black transform group-hover:rotate-12 transition-transform duration-500" />
              </div>
              
              {/* Multi-layered glow effect */}
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-80 blur-lg transition-all duration-500 rounded-lg" />
              <div className="absolute inset-0 w-12 h-12 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 rounded-lg" />
              
              {/* Sparkle effect */}
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-green-300 animate-sparkle" />
              </div>
            </div>
            
            <div className="relative">
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-400 transition-all duration-500">
                AshBrick
              </span>
              
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-500 group-hover:w-full transition-all duration-700" />
              
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 text-3xl font-bold text-green-300 opacity-0 group-hover:opacity-60 transition-all duration-200 animate-glitch">
                AshBrick
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="relative group px-5 py-3 text-gray-300 hover:text-white transition-all duration-300 rounded-lg overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-2 relative z-10">
                  <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-green-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="relative font-medium">
                    {item.label}
                  </span>
                </div>
                
                {/* Morphing hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-green-400/20 to-green-400/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-lg origin-left" />
                
                {/* Sliding border animation */}
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-green-400 to-green-500 group-hover:w-4/5 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-400 shadow-sm shadow-green-400/50" />
                
                {/* Particle burst effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full animate-particle-burst shadow-lg shadow-green-400/60"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 10}%`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              </a>
            ))}

            {/* Enhanced CTA Button */}
            <div className="ml-8">
              {!user ? (
                <button
                  onClick={onAuthClick}
                  className="relative px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold overflow-hidden group transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 hover:shadow-green-400/40 rounded-lg"
                >
                  {/* Animated background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-40 animate-pulse-ring rounded-lg" />
                  
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  
                  {/* Sparkle effects */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-white rounded-full animate-sparkle-1 shadow-lg shadow-white/50" />
                  </div>
                  <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-white rounded-full animate-sparkle-2 shadow-lg shadow-white/50" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={signOut}
                  className="relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold overflow-hidden group transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25 rounded-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Mobile Menu Toggle */}
          <button
            className="md:hidden relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
              <X className={`absolute w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} />
            </div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-green-400/40 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        </div>

        {/* Enhanced Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 border-t border-white/10 transition-all duration-500 ${
            isMenuOpen
              ? "opacity-100 translate-y-0 max-h-96"
              : "opacity-0 -translate-y-4 pointer-events-none max-h-0"
          }`}
          style={{ 
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:translate-x-1 hover:scale-105 rounded-lg group"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.3s ease ${index * 100}ms`
                }}
              >
                <item.icon className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">{item.label}</span>
                
                {/* Sliding accent */}
                <div className="ml-auto w-0 h-1 bg-green-400 group-hover:w-6 transition-all duration-300 shadow-sm shadow-green-400/50" />
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 mt-4">
              {!user ? (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 px-6 py-3 text-black font-semibold hover:from-green-300 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-400/25 rounded-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative z-10">Get Started</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-white font-semibold hover:from-red-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
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
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
        
        @keyframes neural-node-1 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          33% { transform: scale(2.2) rotate(120deg); opacity: 1; }
          66% { transform: scale(1.2) rotate(240deg); opacity: 0.8; }
        }
        @keyframes neural-node-2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          33% { transform: scale(1.8) rotate(90deg); opacity: 0.9; }
          66% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
        }
        @keyframes neural-node-3 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          33% { transform: scale(1.6) rotate(150deg); opacity: 1; }
          66% { transform: scale(1.1) rotate(300deg); opacity: 0.6; }
        }
        @keyframes neural-node-4 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          33% { transform: scale(2.0) rotate(60deg); opacity: 0.8; }
          66% { transform: scale(1.3) rotate(270deg); opacity: 1; }
        }
        
        @keyframes neural-connection-1 {
          0% { width: 0; opacity: 0; }
          50% { width: 50px; opacity: 1; }
          100% { width: 0; opacity: 0; }
        }
        @keyframes neural-connection-2 {
          0% { width: 0; opacity: 0; }
          50% { width: 40px; opacity: 1; }
          100% { width: 0; opacity: 0; }
        }
        @keyframes neural-connection-3 {
          0% { width: 0; opacity: 0; }
          50% { width: 60px; opacity: 1; }
          100% { width: 0; opacity: 0; }
        }
        @keyframes neural-connection-4 {
          0% { width: 0; opacity: 0; }
          50% { width: 45px; opacity: 1; }
          100% { width: 0; opacity: 0; }
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
        
        @keyframes border-light {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
        
        @keyframes particle-burst {
          0% { transform: scale(0) translate(0, 0); opacity: 1; }
          50% { transform: scale(1) translate(10px, -5px); opacity: 0.8; }
          100% { transform: scale(0) translate(20px, -10px); opacity: 0; }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(-180deg); opacity: 1; }
        }
        
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 9s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 6s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 11s ease-in-out infinite; }
        
        .animate-matrix-rain { animation: matrix-rain 4s linear infinite; }
        
        .animate-neural-node-1 { animation: neural-node-1 5s ease-in-out infinite; }
        .animate-neural-node-2 { animation: neural-node-2 4s ease-in-out infinite 0.5s; }
        .animate-neural-node-3 { animation: neural-node-3 6s ease-in-out infinite 1s; }
        .animate-neural-node-4 { animation: neural-node-4 4.5s ease-in-out infinite 1.5s; }
        
        .animate-neural-connection-1 { animation: neural-connection-1 3s ease-in-out infinite; }
        .animate-neural-connection-2 { animation: neural-connection-2 2.5s ease-in-out infinite 0.5s; }
        .animate-neural-connection-3 { animation: neural-connection-3 4s ease-in-out infinite 1s; }
        .animate-neural-connection-4 { animation: neural-connection-4 3.5s ease-in-out infinite 1.5s; }
        
        .animate-morphing-wave-1 { animation: morphing-wave-1 6s ease-out infinite; }
        .animate-morphing-wave-2 { animation: morphing-wave-2 5s ease-out infinite 1s; }
        .animate-morphing-wave-3 { animation: morphing-wave-3 7s ease-out infinite 2s; }
        
        .animate-border-light { animation: border-light 10s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.3s ease-in-out infinite; }
        .animate-particle-burst { animation: particle-burst 0.6s ease-out forwards; }
        .animate-pulse-ring { animation: pulse-ring 1s ease-out infinite; }
        .animate-sparkle-1 { animation: sparkle-1 1s ease-in-out infinite; }
        .animate-sparkle-2 { animation: sparkle-2 1s ease-in-out infinite 0.5s; }
      `}</style>
    </nav>
  );
};

export default Navbar;
