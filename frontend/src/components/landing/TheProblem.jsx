import React from 'react';
import { Star, CheckCircle2, XCircle } from 'lucide-react';

export default function TheProblem() {
  return (
    <section id="the-problem" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>01 / The Limitation of Aggregate Ratings</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            A 4.2-star average obscures <br />
            <span className="font-serif italic text-[#D7BFA1]">critical operational drift.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Standard online travel agency ratings aggregate hundreds of disparate customer touchpoints into an unweighted static number. By the time an overall score drops, guest dissatisfaction has already impacted forward bookings for months.
          </p>
        </div>

        {/* Visual Transformation Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: The Legacy Blindspot */}
          <div className="rounded-2xl bg-[#14171D]/80 border border-[#30343B] p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500/10 border-b border-l border-rose-500/30 text-[10px] font-mono text-rose-400 font-semibold uppercase tracking-wider rounded-bl-xl">
              Conventional OTA Metrics
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Unweighted Channel Average</span>
              <div className="flex items-baseline space-x-3">
                <span className="text-6xl font-display font-extrabold text-rose-400">3.8</span>
                <div className="flex text-amber-400 text-lg">
                  {'★'.repeat(3)}{'☆'.repeat(2)}
                </div>
              </div>
              <p className="text-xs text-[#9EA3AE]">
                Trailing 30-day cross-platform average decreased by 0.4 stars.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#30343B]/60 text-xs text-[#9EA3AE]">
              <div className="flex items-center space-x-2 text-rose-400">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                <span>Zero departmental attribution between housekeeping, front desk, and dining</span>
              </div>
              <div className="flex items-center space-x-2 text-rose-400">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                <span>No lead-time warning before forward reservation volumes decrease</span>
              </div>
              <div className="flex items-center space-x-2 text-rose-400">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                <span>Requires hours of manual, subjective review audits by property managers</span>
              </div>
            </div>

            <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-[11px] text-rose-300">
              Operational Deficit: Broad dissatisfaction without verifiable departmental accountability.
            </div>
          </div>

          {/* Right: The TRIP Intelligence Layer */}
          <div className="rounded-2xl bg-gradient-to-b from-[#1C2028] to-[#14171D] border border-[#E16B42]/40 p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#E16B42]/10 border-b border-l border-[#E16B42]/40 text-[10px] font-mono text-[#E16B42] font-semibold uppercase tracking-wider rounded-bl-xl">
              TRIP Operational Diagnostics
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D7BFA1] uppercase tracking-wider">Identified Failure Mode</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">95.8% CONFIDENCE</span>
              </div>

              {/* Pinpointed Operational Diagnostic */}
              <div className="p-4 bg-[#0B0D12]/90 border border-[#30343B] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-400 font-semibold font-mono">FRONT DESK ARRIVAL BOTTLENECK</span>
                  <span className="text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">14 Reports</span>
                </div>
                <p className="text-xs text-[#FAF9F6]">
                  Average 45-minute check-in queue concentrated between 12:00 PM and 3:00 PM on peak arrival days.
                </p>
                <div className="text-[11px] text-[#9EA3AE] pt-1">
                  Root Cause: Unstaggered shift changeover coinciding with corporate weekend check-in surge.
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#30343B]/60 text-xs text-[#FAF9F6]">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Isolates specific department, time window, and root operational failure</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Forecasted score recovery: +4.2 composite index points within 30 days</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Food & Cleanliness performance independently verified at 94% excellence</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#E16B42]/10 border border-[#E16B42]/30 rounded-xl text-[11px] text-[#FAF9F6] flex items-center justify-between">
              <span>Remedy: Re-roster 2 front office agents to peak 12:00–15:00 arrival windows.</span>
              <span className="text-[#E16B42] font-semibold">Action Plan</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
