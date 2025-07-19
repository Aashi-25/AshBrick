
import React, { Component } from 'react';
import heroVideo from '../assets/background.mp4';
import { Sparkles, ArrowRight } from 'lucide-react';

// Error Boundary Component
class HeroErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in Hero component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative flex items-center justify-center min-h-screen bg-black/90">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold text-green-400 mb-4">
              Something went wrong
            </h1>
            <p className="text-green-300/70">
              Please try refreshing the page or contact support.
            </p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

const Hero = () => {
  const [videoError, setVideoError] = React.useState(false);

  return (
    <HeroErrorBoundary>
      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
        style={{ height: '90vh' }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-green-400/50 rounded-full animate-float-${i % 2 + 1} shadow-sm shadow-green-400/20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Themed Video Container */}
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{ zIndex: 2, pointerEvents: 'none' }}
        >
          {/* Video with card effect */}
          <div
            className="relative animate-glow-pulse"
            style={{
              width: '100vw',
              height: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              borderRadius: '2rem',
              overflow: 'hidden',
              boxShadow: '0 8px 48px 0 rgba(34,197,94,0.2), 0 2px 16px 0 rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            {videoError ? (
              <div
                className="w-full h-full bg-black/90 flex items-center justify-center"
                style={{ borderRadius: '2rem' }}
              >
                <p className="text-green-400 text-lg">Video failed to load</p>
              </div>
            ) : (
              <video
                className="w-full h-full object-cover"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.85) blur(0.5px) saturate(1.2)',
                  transition: 'filter 0.5s, transform 10s ease-in-out',
                  transform: 'scale(1.02)',
                }}
              />
            )}
            {/* Greenish gradient overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(120deg, rgba(34,197,94,0.3) 0%, rgba(16,185,129,0.2) 60%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
                zIndex: 3,
                mixBlendMode: 'overlay',
              }}
            />
            {/* Soft vignette */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            />
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-8 py-12 animate-fade-in-up">
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-6"
            style={{
              background: 'linear-gradient(to right, #22c55e, #10b981)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow:
                '0 6px 32px rgba(0,0,0,0.8), 0 2px 8px rgba(34,197,94,0.3)',
              letterSpacing: '-0.03em',
              fallback: { color: '#22c55e' }, // Fallback for unsupported browsers
            }}
          >
            Turning Toxic Waste into Green Construction Gold
          </h1>
          <p
            className="text-xl md:text-2xl font-bold mb-8"
            style={{
              color: '#fff',
              textShadow:
                '0 2px 12px rgba(0,0,0,0.8), 0 1px 0 rgba(34,197,94,0.2)',
            }}
          >
            Solve environmental liability while cutting costs by{' '}
            <span
              className="animate-pulse inline-block"
              style={{
                background: 'linear-gradient(to right, #22d3ee, #22c55e)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow:
                  '0 2px 8px rgba(34,197,94,0.4), 0 1px 0 rgba(0,0,0,0.5)',
                fallback: { color: '#22d3ee' }, // Fallback for unsupported browsers
              }}
            >
              40%
            </span>
          </p>
          <button
            className="relative bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 px-8 rounded-lg font-semibold transition-all duration-300 group shadow-md shadow-green-400/20 hover:shadow-green-400/30 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-black animate-sparkle-hero" />
            </div>
            <span className="relative z-10 flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        <style jsx>{`
          @keyframes float-1 {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-10px) translateX(5px);
              opacity: 0.6;
            }
          }
          @keyframes float-2 {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-8px) translateX(-4px);
              opacity: 0.5;
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes glow-pulse {
            0% {
              box-shadow: 0 8px 48px 0 rgba(34, 197, 94, 0.2),
                0 2px 16px 0 rgba(0, 0, 0, 0.3);
            }
            50% {
              box-shadow: 0 8px 48px 0 rgba(34, 197, 94, 0.3),
                0 2px 16px 0 rgba(0, 0, 0, 0.4);
            }
            100% {
              box-shadow: 0 8px 48px 0 rgba(34, 197, 94, 0.2),
                0 2px 16px 0 rgba(0, 0, 0, 0.3);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes sparkle-hero {
            0%,
            100% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
          }

          .animate-float-1 {
            animation: float-1 5s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float-2 6s ease-in-out infinite;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
          .animate-glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          .animate-pulse {
            animation: pulse 1.5s ease-in-out infinite;
          }
          .animate-sparkle-hero {
            animation: sparkle-hero 1.5s ease-in-out infinite;
          }
        `}</style>
      </section>
    </HeroErrorBoundary>
  );
};

export default Hero;