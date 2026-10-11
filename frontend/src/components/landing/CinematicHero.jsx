import React, { useState, useEffect } from 'react';
import { ArrowDown, LayoutDashboard, ChevronDown } from 'lucide-react';
import ShatterHeadline from './ShatterHeadline';
import NoiseBackground from '../ui/NoiseBackground';

export default function CinematicHero({ onEnterDashboard }) {
  const [stage, setStage] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 200);
    const timer2 = setTimeout(() => setStage(3), 600);
    const timer3 = setTimeout(() => setStage(4), 1000);
    const timer4 = setTimeout(() => setStage(5), 1400);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollExplore = () => {
    const el = document.getElementById('the-problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroScale = Math.max(0.88, 1 - scrollY * 0.0003);
  const heroOpacity = Math.max(0, 1 - scrollY * 0.0016);

  return (
    <NoiseBackground 
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-[#0B0D12]"
      glowColor="copper"
    >
      {/* Background Radial Ambiance */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-20 bg-gradient-to-tr from-[#E16B42] via-[#BC674F] to-[#D7BFA1]"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0006})`
        }}
      />

      {/* Main Hero Container */}
      <div 
        className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out z-20"
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroOpacity
        }}
      >
        {/* Professional Category Tagline */}
        <div 
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#14171D]/90 border border-[#30343B] text-[11px] font-mono tracking-widest text-[#D7BFA1] mb-6 shadow-xl transition-all duration-700 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E16B42]" />
          <span>ENTERPRISE REPUTATION INTELLIGENCE PLATFORM</span>
        </div>

        {/* Signature Interactive Headline */}
        <div 
          className={`w-full transition-all duration-1000 ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <ShatterHeadline text="TRIP" subtitle="HOSPITALITY DATA & REPUTATION PLATFORM" />
        </div>

        {/* Professional Statement */}
        <div 
          className={`max-w-2xl mx-auto mt-4 md:mt-6 space-y-3 transition-all duration-700 delay-200 ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-[#FAF9F6] tracking-tight leading-snug">
            Transform guest feedback into <span className="font-serif italic text-[#D7BFA1]">operational clarity.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed max-w-xl mx-auto">
            Consolidate multi-channel reviews into department-level diagnostics, predictive score forecasting, and competitive benchmarking for hospitality leadership.
          </p>
        </div>

        {/* Executive CTAs */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-700 delay-300 ${
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleScrollExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E16B42] to-[#BC674F] hover:from-[#EE7E57] hover:to-[#E16B42] text-white font-medium text-sm tracking-wide shadow-xl shadow-[#E16B42]/20 hover:shadow-[#E16B42]/35 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Platform Overview</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#14171D] hover:bg-[#1C2028] border border-[#30343B] text-[#FAF9F6] font-medium text-sm tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <LayoutDashboard className="w-4 h-4 text-[#D7BFA1]" />
            <span>Launch Executive Dashboard</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#9EA3AE] pt-8 border-t border-[#30343B]/40 z-20">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:text-[#FAF9F6] transition-colors"
          onClick={handleScrollExplore}
        >
          <ChevronDown className="w-4 h-4 text-[#E16B42] animate-bounce" />
          <span className="uppercase tracking-widest text-[11px]">Explore Operational Capabilities</span>
        </div>

        <div className="hidden sm:flex items-center space-x-6 tracking-widest text-[11px]">
          <span>PRODUCTION SUITE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ALL MICROSERVICES OPERATIONAL</span>
        </div>
      </div>
    </NoiseBackground>
  );
}
