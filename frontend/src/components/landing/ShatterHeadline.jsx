import React, { useState, useRef, useEffect } from 'react';

/**
 * ShatterHeadline
 * An original glass-fracture display text interaction.
 * Letters react with subtle fractures on hover/pointer movement, shatter on click,
 * and reassemble smoothly while preserving full accessible semantic text.
 */
export default function ShatterHeadline({ text = "TRIP", subtitle = "THE REPUTATION UNIVERSE" }) {
  const [isShattered, setIsShattered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const letters = text.split("");

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleTriggerShatter = () => {
    setIsShattered(true);
    setTimeout(() => {
      setIsShattered(false);
    }, 2400);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleTriggerShatter}
      className="relative cursor-pointer select-none py-4 text-center group"
      aria-label={`${text} - ${subtitle}`}
      title="Click to fracture and reassemble"
    >
      {/* Hidden Accessible Semantic Text */}
      <h1 className="sr-only">{text} — {subtitle}</h1>

      {/* Primary Shatter Typography */}
      <div className="flex items-center justify-center space-x-2 md:space-x-6 tracking-tighter" aria-hidden="true">
        {letters.map((char, index) => {
          // Dynamic transforms based on pointer proximity and shatter state
          const angle = (index - letters.length / 2) * 12;
          const distance = isShattered ? (index % 2 === 0 ? 90 : -90) : mousePos.x * 16;
          const rotateZ = isShattered ? (index % 2 === 0 ? 35 : -40) : mousePos.y * 12;
          const opacity = isShattered ? 0.35 : 1;
          const scale = isShattered ? 0.8 : 1;

          return (
            <span
              key={index}
              style={{
                transform: `translate3d(${distance}px, ${isShattered ? (index * 25 - 40) : (mousePos.y * 10)}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
                transition: isShattered 
                  ? 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
                  : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease',
                opacity: opacity
              }}
              className="inline-block font-display font-black text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FAF9F6] via-[#F5F1EA] to-[#9EA3AE] drop-shadow-2xl"
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Subtle Fracture Hairlines */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      >
        <div 
          className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#E16B42]/50 to-transparent transform"
          style={{
            transform: `rotate(${mousePos.x * 25}deg)`
          }}
        />
      </div>

      {/* Subtitle Annotation */}
      <div className="mt-2 md:mt-4 flex items-center justify-center space-x-3 text-xs md:text-sm font-mono tracking-widest text-[#9EA3AE]">
        <span className="w-6 md:w-10 h-[1px] bg-[#30343B]" />
        <span className="text-[#D7BFA1] uppercase tracking-[0.25em]">{subtitle}</span>
        <span className="w-6 md:w-10 h-[1px] bg-[#30343B]" />
      </div>
    </div>
  );
}
