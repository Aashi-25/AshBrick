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
    </div>
  </section>
);

export default Hero;