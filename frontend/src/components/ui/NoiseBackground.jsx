import React from 'react';

export default function NoiseBackground({ children, className = '', glowColor = 'copper' }) {
  const glowMap = {
    copper: 'rgba(225, 107, 66, 0.08)',
    champagne: 'rgba(215, 191, 161, 0.06)',
    blue: 'rgba(59, 130, 246, 0.06)',
  };

  const selectedGlow = glowMap[glowColor] || glowMap.copper;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${selectedGlow} 0%, transparent 70%)`
        }}
      />
      
      {/* Film Grain Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay film-grain" 
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
