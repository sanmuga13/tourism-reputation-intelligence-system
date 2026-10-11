import React, { useState } from 'react';
import { Award, Calculator, Info, RotateCcw } from 'lucide-react';

export default function ReputationEngine() {
  const [sentiment, setSentiment] = useState(94);
  const [rating, setRating] = useState(92);
  const [volume, setVolume] = useState(85);
  const [recency, setRecency] = useState(90);

  // Formula: R = 0.40S + 0.30A + 0.20V + 0.10T
  const calculatedScore = (
    0.40 * sentiment +
    0.30 * rating +
    0.20 * volume +
    0.10 * recency
  ).toFixed(1);

  const resetWeights = () => {
    setSentiment(94);
    setRating(92);
    setVolume(85);
    setRecency(90);
  };

  return (
    <section id="reputation" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>03 / Mathematical Index Architecture</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            The composite index. <br />
            <span className="font-serif italic text-[#D7BFA1]">Deterministic asset benchmarking.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Public star ratings fluctuate with review velocity and seasonal shifts. TRIP synthesizes four audited statistical dimensions into a balanced, fraud-resistant composite score from 0 to 100.
          </p>
        </div>

        {/* Interactive Formula Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Sliders (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Weight Contribution Parameters</span>
              <button 
                onClick={resetWeights}
                className="text-[11px] font-mono text-[#E16B42] flex items-center space-x-1 hover:text-[#EE7E57] transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Slider 1: Sentiment (40%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#FAF9F6]">Sentiment Polarity (S · 40% Weight)</span>
                <span className="font-mono text-[#E16B42] font-bold">{sentiment} pts</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={sentiment}
                onChange={(e) => setSentiment(Number(e.target.value))}
                className="w-full accent-[#E16B42] bg-[#0B0D12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-[#9EA3AE]">Normalized NLP polarity score across verified guest text.</p>
            </div>

            {/* Slider 2: Star Ratings (30%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#FAF9F6]">Aggregated Star Rating (A · 30% Weight)</span>
                <span className="font-mono text-emerald-400 font-bold">{rating} pts</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0B0D12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-[#9EA3AE]">Cross-channel star average normalized to 100-point scale.</p>
            </div>

            {/* Slider 3: Volume (20%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#FAF9F6]">Review Volume Velocity (V · 20% Weight)</span>
                <span className="font-mono text-amber-400 font-bold">{volume} pts</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-amber-500 bg-[#0B0D12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-[#9EA3AE]">Statistical sample size confidence index.</p>
            </div>

            {/* Slider 4: Recency (10%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#FAF9F6]">Time-Decay Recency (T · 10% Weight)</span>
                <span className="font-mono text-indigo-400 font-bold">{recency} pts</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={recency}
                onChange={(e) => setRecency(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-[#0B0D12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-[#9EA3AE]">Exponential time-decay curve prioritizing feedback from past 30 days.</p>
            </div>
          </div>

          {/* Right: Calculated Gauge Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#1C2028] to-[#14171D] border border-[#30343B] p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0B0D12] border border-[#30343B] text-[10px] font-mono text-[#D7BFA1]">
              <Calculator className="w-3 h-3 text-[#E16B42]" />
              <span>LIVE COMPUTED COMPOSITE</span>
            </div>

            {/* Gauge Display */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#30343B]/40" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#E16B42] border-t-transparent transition-all duration-500"
                style={{
                  transform: `rotate(${(calculatedScore / 100) * 360}deg)`
                }}
              />
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-5xl text-[#FAF9F6] tracking-tight">
                  {calculatedScore}
                </span>
                <span className="text-[11px] font-mono text-[#D7BFA1] uppercase tracking-wider mt-1">
                  Composite Reputation Index (CRI)
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#9EA3AE] bg-[#0B0D12] p-3 rounded-xl border border-[#22262E]">
              <code>R = 0.40S + 0.30A + 0.20V + 0.10T</code>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
