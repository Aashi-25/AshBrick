<<<<<<< HEAD
import { Play } from 'lucide-react';

const Hero = ({ onAuthClick }) => (
  <section className="relative z-10 px-6 py-20">
    <div className="max-w-7xl mx-auto text-center">
      <div className="mb-8 animate-fade-in">
        <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          🚀 AI-Powered Green Construction
        </span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent animate-slide-up">
        Turning Toxic Waste into<br />
        <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Green Construction Gold
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto animate-slide-up delay-200">
        The world's first AI-powered B2B marketplace transforming fly ash waste into sustainable building materials.
        Solve environmental liability while cutting construction costs by 40%.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400">
        <button 
          onClick={onAuthClick}
          className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center space-x-2"
        >
          <Play className="w-5 h-5" />
          <span>Get Started</span>
        </button>
        <button 
          onClick={onAuthClick}
          className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
        >
          Join Now
        </button>
      </div>
=======
import React from 'react';
import heroVideo from '../assets/background.mp4';

const Hero = () => (
  <section
    className="relative flex items-center justify-center min-h-screen"
    style={{
      height: "90vh",
      // Removed overflow: hidden
    }}
  >
    {/* Background Video */}
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
    {/* Overlay for better text visibility */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        zIndex: 2,
      }}
    />
    {/* Hero Content */}
    <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-8 py-10">
      <h1
        className="text-5xl md:text-7xl font-extrabold mb-6"
        style={{
          color: '#fff',
          textShadow: '0 6px 32px rgba(0,0,0,0.95), 0 2px 8px #000, 0 1px 0 #222',
          letterSpacing: '-0.03em',
        }}
      >
        Turning Toxic Waste into Green Construction Gold
      </h1>
      <p
        className="text-2xl font-bold"
        style={{
          color: '#fff',
          textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 1px 0 #222',
        }}
      >
        Solve environmental liability while cutting construction costs by <span style={{color: "#22d3ee", textShadow: "0 2px 8px #22d3ee, 0 1px 0 #222"}}>40%</span>
      </p>
>>>>>>> upstream/main
    </div>
  </section>
);

export default Hero;