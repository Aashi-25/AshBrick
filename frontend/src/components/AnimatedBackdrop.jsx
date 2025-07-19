import React, { useEffect, useRef } from 'react';
import './AnimatedBackdrop.css';

const AnimatedBackdrop = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate floating leaves (subtle)
    const container = containerRef.current;
    if (!container) return;
    // Remove any previously added leaves/nodes/lines
    container.querySelectorAll('.leaf, .connection-line').forEach(el => el.remove());
    // Leaves (fewer, more transparent, less vibrant)
    const leafCount = 16;
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf subtle-leaf';
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDelay = Math.random() * 8 + 's';
      leaf.style.animationDuration = (Math.random() * 4 + 8) + 's';
      const rotation = Math.random() * 360;
      const scale = 0.7 + Math.random() * 0.3;
      leaf.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      container.appendChild(leaf);
    }
    // Connection lines (optional, keep for subtlety)
    const lineCount = 6;
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.className = 'connection-line';
      line.style.left = Math.random() * 80 + '%';
      line.style.top = Math.random() * 80 + '%';
      line.style.width = Math.random() * 200 + 100 + 'px';
      line.style.transform = `rotate(${Math.random() * 360}deg)`;
      line.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(line);
    }
    // Mouse interaction (no longer needed for energy nodes)
    return () => {};
  }, []);

  // Enhanced smoke stacks: more smoke clouds, varied size, opacity, and animation
  const renderSmokeStack = (smokeConfigs = []) => (
    <div className="smoke-stack">
      {smokeConfigs.map((cfg, idx) => (
        <div
          key={idx}
          className="smoke enhanced-smoke"
          style={{
            animationDelay: cfg.delay,
            animationDuration: cfg.duration,
            opacity: cfg.opacity,
            width: cfg.size,
            height: cfg.size,
            left: cfg.left || undefined
          }}
        ></div>
      ))}
    </div>
  );

  // Smoke configs for each stack
  const smokeStacks = [
    [
      { delay: '0s', duration: '4s', opacity: 0.7, size: '44px' },
      { delay: '0.7s', duration: '5s', opacity: 0.5, size: '38px' },
      { delay: '1.5s', duration: '6s', opacity: 0.4, size: '52px' },
      { delay: '2.2s', duration: '4.5s', opacity: 0.3, size: '36px' }
    ],
    [
      { delay: '0.5s', duration: '4.2s', opacity: 0.6, size: '40px' },
      { delay: '1.2s', duration: '5.5s', opacity: 0.4, size: '34px' },
      { delay: '2.1s', duration: '6.2s', opacity: 0.3, size: '48px' }
    ],
    [
      { delay: '1s', duration: '4.8s', opacity: 0.7, size: '46px' },
      { delay: '2.5s', duration: '5.8s', opacity: 0.5, size: '42px' },
      { delay: '3.1s', duration: '6.5s', opacity: 0.3, size: '54px' }
    ],
    [
      { delay: '0.3s', duration: '4.5s', opacity: 0.6, size: '38px' },
      { delay: '1.8s', duration: '5.2s', opacity: 0.4, size: '50px' },
      { delay: '2.7s', duration: '6.1s', opacity: 0.3, size: '44px' }
    ]
  ];

  return (
    <div className="animated-backdrop-container" ref={containerRef}>
      {/* Geometric background */}
      <div className="geometric-bg"></div>
      {/* Hexagonal grid removed for no dots */}
      {/* Enhanced Industrial smoke stacks */}
      {smokeStacks.map((cfgs, i) => renderSmokeStack(cfgs))}
      {/* Brick pattern */}
      <div className="brick-pattern"></div>
    </div>
  );
};

export default AnimatedBackdrop; 