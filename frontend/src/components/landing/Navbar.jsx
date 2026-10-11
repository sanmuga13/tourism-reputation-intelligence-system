import React, { useState, useEffect } from 'react';
import { ArrowRight, LayoutDashboard, Sparkles, Compass } from 'lucide-react';

export default function Navbar({ onEnterDashboard, activeMode = 'landing' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Intelligence', href: '#sentiment' },
    { label: 'Root Causes', href: '#rootcauses' },
    { label: 'Reputation', href: '#reputation' },
    { label: 'Forecasting', href: '#forecasts' },
    { label: 'Benchmarking', href: '#competitors' },
    { label: 'Architecture', href: '#architecture' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3.5 bg-[#0B0D12]/85 backdrop-blur-md border-b border-[#30343B]/60 shadow-2xl' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E16B42] to-[#D7BFA1] flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-[#E16B42]/20">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-[#FAF9F6] flex items-center space-x-1.5">
              <span>TRIP</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E16B42] animate-pulse" />
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-wider text-[#9EA3AE]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#FAF9F6] transition-colors uppercase py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E16B42] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onEnterDashboard}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E16B42] to-[#BC674F] hover:from-[#EE7E57] hover:to-[#E16B42] text-[#FAF9F6] text-xs font-semibold tracking-wide shadow-lg shadow-[#E16B42]/25 hover:shadow-[#E16B42]/40 transition-all duration-300 transform active:scale-95"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Enter Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </button>
        </div>

      </div>
    </header>
  );
}
