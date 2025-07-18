import React, { useState, useEffect } from 'react';
import { 
  Factory, 
  Leaf, 
  Zap, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  Sparkles,
  Heart,
  ExternalLink,
  ChevronUp,
  Users,
  Award,
  Target,
  Shield
} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#features', label: 'Features', icon: Zap },
    { href: '#ai-powered', label: 'AI Platform', icon: Globe },
    { href: '#impact', label: 'Impact', icon: Leaf },
    { href: '#pricing', label: 'Pricing', icon: Factory }
  ];

  const company = [
    { href: '#about', label: 'About Us', icon: Users },
    { href: '#careers', label: 'Careers', icon: Target },
    { href: '#awards', label: 'Awards', icon: Award },
    { href: '#security', label: 'Security', icon: Shield }
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { href: '#', icon: Github, label: 'GitHub', color: 'hover:text-gray-400' },
    { href: '#', icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' }
  ];

  return (
    <footer 
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Subtle static gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-emerald-500/5 opacity-40"
      />
      
      {/* Gentle animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ top: '10%', left: '10%', animationDuration: '8s' }} />
        <div className="absolute w-72 h-72 bg-gradient-to-r from-emerald-400/15 to-green-500/15 rounded-full blur-3xl animate-pulse" 
             style={{ top: '60%', right: '20%', animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" 
             style={{ bottom: '20%', left: '30%', animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Minimal connection lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <div 
              className="absolute w-2 h-2 bg-green-400/50 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: '4s'
              }}
            />
            <div 
              className="absolute h-px bg-gradient-to-r from-green-400/30 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: '6s'
              }}
            />
          </div>
        ))}
      </div>

      {/* Subtle energy waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-green-400/20 rounded-full animate-ping"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent">
        <div className="absolute w-32 h-px bg-gradient-to-r from-transparent via-green-400/80 to-transparent animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center rounded-lg group-hover:scale-110 transition-all duration-300 shadow-lg shadow-green-400/30">
                    <Factory className="w-7 h-7 text-black" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-300 rounded-lg" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  AshBrick
                </span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming industrial waste into sustainable construction materials through AI-powered innovation. Building a greener tomorrow, one brick at a time.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group">
                  <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Delhi, India</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>+91 99999 99999</span>
                </div>
                <div 
                  className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-300 group cursor-pointer"
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">
                    hello@ashbrick.com
                    {emailHovered && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-400 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all duration-300 group hover:translate-x-1"
                    >
                      <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-400 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all duration-300 group hover:translate-x-1"
                    >
                      <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-400 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-6">
                Get the latest updates on sustainable construction and AI innovations.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-green-400/30 rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-white placeholder-gray-500"
                  />
                  <div className="absolute inset-0 bg-green-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                </div>
                <button className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold py-3 px-6 rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-400/25 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Links & Bottom */}
          <div className="pt-8 border-t border-green-400/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              
              {/* Social Links */}
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 mr-2">Follow us:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <div className="relative">
                      <social.icon className="w-6 h-6" />
                      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-20 blur-lg transition-all duration-300" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span>© 2025 AshBrick. Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for a sustainable future</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 text-black rounded-full shadow-lg shadow-green-400/30 hover:shadow-green-400/50 transition-all duration-300 transform hover:scale-110 z-50 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-6 h-6 mx-auto" />
        <div className="absolute inset-0 bg-green-400 opacity-0 hover:opacity-40 blur-xl transition-all duration-300 rounded-full" />
      </button>
    </footer>
  );
};

export default Footer;
