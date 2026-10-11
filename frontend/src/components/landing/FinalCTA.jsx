import React from 'react';
import { ArrowRight, LayoutDashboard, Sparkles, Shield, Terminal } from 'lucide-react';
import NoiseBackground from '../ui/NoiseBackground';

export default function FinalCTA({ onEnterDashboard }) {
  return (
    <footer className="bg-[#0B0D12] border-t border-[#30343B]/60 relative overflow-hidden">
      
      {/* Conversion Section */}
      <NoiseBackground className="py-28 px-6 sm:px-12 text-center" glowColor="copper">
        <div className="max-w-4xl mx-auto space-y-8 z-10 relative">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#14171D] border border-[#30343B] text-[11px] font-mono tracking-widest text-[#D7BFA1]">
            <Sparkles className="w-3.5 h-3.5 text-[#E16B42]" />
            <span>HOSPITALITY ASSET INTELLIGENCE</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#FAF9F6] tracking-tight leading-tight">
            From verbatim guest feedback <br />
            <span className="font-serif italic text-[#D7BFA1]">to decisive operational yield.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9EA3AE] font-light max-w-xl mx-auto leading-relaxed">
            Eliminate reactive crisis handling with continuous, audited reputation intelligence calibrated across every operational touchpoint and competitor benchmark.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onEnterDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E16B42] to-[#BC674F] hover:from-[#EE7E57] hover:to-[#E16B42] text-white font-semibold text-sm tracking-wide shadow-xl shadow-[#E16B42]/25 hover:shadow-[#E16B42]/40 transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Enter Enterprise Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      </NoiseBackground>

      {/* Editorial Footer */}
      <div className="border-t border-[#22262E] py-12 px-6 sm:px-12 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#9EA3AE]">
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-md bg-[#E16B42] flex items-center justify-center font-display font-bold text-white text-xs">
              T
            </div>
            <span className="font-display font-semibold text-[#FAF9F6]">TRIP</span>
            <span>— Tourism Reputation Intelligence Platform</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] tracking-wider">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SYSTEMS ONLINE</span>
            </span>
            <span>JAVA 21 + SPRING BOOT 3</span>
            <span>FASTAPI NLP</span>
            <span>REACT 18</span>
          </div>

          <div className="text-[11px] text-[#9EA3AE]">
            &copy; {new Date().getFullYear()} TRIP Systems. MIT License.
          </div>

        </div>
      </div>

    </footer>
  );
}
