import React, { useState } from 'react';
import { TrendingUp, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

const FORECAST_HORIZONS = {
  30: {
    days: 30,
    target: "November 2026",
    predicted: 93.8,
    lower: 91.5,
    upper: 96.0,
    status: "Positive Momentum",
    insight: "Staff shift adjustments will yield +1.4 pt score improvement."
  },
  60: {
    days: 60,
    target: "December 2026",
    predicted: 94.6,
    lower: 90.8,
    upper: 97.4,
    status: "Seasonal Holiday Peak",
    insight: "Dining volume expected to rise 35%; Food score remains dominant asset."
  },
  90: {
    days: 90,
    target: "January 2027",
    predicted: 95.4,
    lower: 90.0,
    upper: 98.2,
    status: "Market Leadership Horizon",
    insight: "Sustained reputation leader over Chennai luxury hotel comp-set."
  }
};

export default function PredictiveSection() {
  const [horizon, setHorizon] = useState(30);
  const data = FORECAST_HORIZONS[horizon];

  return (
    <section id="forecasts" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>04 / Predictive Forecasting</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Anticipate shifts <br />
            <span className="font-serif italic text-[#D7BFA1]">before occupancy declines.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Guest booking volumes lag reputation shifts by 45 to 60 days. TRIP leverages empirical time-series models (Prophet and ARIMA ensembles) to project future score trajectories, enabling hotel leadership to remediate operational bottlenecks before ADR is impacted.
          </p>
        </div>

        {/* Interactive Horizon Card */}
        <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-8 space-y-8">
          
          {/* Horizon Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#30343B]">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-[#E16B42]" />
              <span className="text-xs font-mono text-[#FAF9F6] uppercase tracking-wider font-semibold">
                Predictive Horizon Selection
              </span>
            </div>

            <div className="flex rounded-xl bg-[#0B0D12] p-1 border border-[#22262E]">
              {[30, 60, 90].map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                    horizon === h
                      ? 'bg-[#E16B42] text-white font-bold shadow-lg shadow-[#E16B42]/20'
                      : 'text-[#9EA3AE] hover:text-white'
                  }`}
                >
                  {h} Days Ahead
                </button>
              ))}
            </div>
          </div>

          {/* Metric Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Projected Score */}
            <div className="p-6 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
              <span className="text-[11px] font-mono text-[#D7BFA1] uppercase tracking-wider">
                Predicted Composite Score
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-display font-extrabold text-5xl text-[#FAF9F6]">
                  {data.predicted}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  +1.4 pts
                </span>
              </div>
              <p className="text-[11px] text-[#9EA3AE]">Target: {data.target}</p>
            </div>

            {/* Uncertainty Interval */}
            <div className="p-6 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
              <span className="text-[11px] font-mono text-[#D7BFA1] uppercase tracking-wider">
                Confidence Band (95%)
              </span>
              <div className="font-display font-extrabold text-3xl text-indigo-300 pt-1">
                {data.lower} — {data.upper}
              </div>
              <p className="text-[11px] text-[#9EA3AE]">Model Ensemble: Prophet + ARIMA</p>
            </div>

            {/* Operational Status */}
            <div className="p-6 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
              <span className="text-[11px] font-mono text-[#D7BFA1] uppercase tracking-wider">
                Operational Trajectory
              </span>
              <div className="font-display font-bold text-lg text-emerald-400 pt-1 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>{data.status}</span>
              </div>
              <p className="text-[11px] text-[#9EA3AE] leading-relaxed">{data.insight}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
