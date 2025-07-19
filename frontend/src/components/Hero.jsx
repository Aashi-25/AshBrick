import React from 'react';
import heroVideo from '../assets/background.mp4';

const Hero = () => (
  <section
    className="relative flex items-center justify-center min-h-screen"
    style={{
      height: "90vh",
    }}
  >
    {/* Themed Video Container */}
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {/* Video with card effect */}
      <div
        style={{
          width: '100vw',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          borderRadius: '2.5rem',
          overflow: 'hidden',
          boxShadow: '0 8px 48px 0 rgba(34,197,94,0.18), 0 1.5px 16px 0 rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <video
          className="w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.65) blur(1.5px) saturate(1.1)',
            transition: 'filter 0.5s',
          }}
        />
        {/* Greenish gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(120deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.08) 60%, rgba(0,0,0,0.32) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'multiply',
          }}
        />
        {/* Soft vignette for blending */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.38) 100%)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
      </div>
    </div>
    {/* Hero Content Overlay */}
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