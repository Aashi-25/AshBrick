import React from 'react';
import heroVideo from '../assets/background.mp4';

const Hero = () => (
  <section
    className="relative flex items-center justify-center"
    style={{
      height: "500px",
      overflow: "hidden",
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
    <div
      className="relative z-10 text-center w-full"
      style={{ color: "white" }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Turning Toxic Waste into Green Construction Gold
      </h1>
      <p className="text-2xl font-bold">
        Solve environmental liability while cutting construction costs by <span style={{color: "#22d3ee"}}>40%</span>
      </p>
    </div>
  </section>
);

export default Hero;