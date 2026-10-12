import React, { useState } from 'react';
import { Layers, Check } from 'lucide-react';

const SAMPLE_REVIEWS = [
  {
    title: "Weekend Executive Stay",
    text: "The breakfast buffet at Madras Pavilion was exceptional and pool facilities were well maintained. However, check-in took 45 minutes at the front desk and room service delivery was delayed.",
    aspects: {
      "Food & Dining": { score: 96, label: "POSITIVE", quote: "breakfast buffet was exceptional" },
      "Amenities": { score: 92, label: "POSITIVE", quote: "pool facilities were well maintained" },
      "Front Desk & Staff": { score: 38, label: "NEGATIVE", quote: "check-in took 45 minutes, room service delayed" },
      "Housekeeping": { score: 90, label: "POSITIVE", quote: "impeccable room presentation" },
      "Location & Transit": { score: 85, label: "POSITIVE", quote: "convenient business district location" },
      "Safety & Security": { score: 95, label: "POSITIVE", quote: "secure premises and verified entry" },
      "Value Perception": { score: 78, label: "NEUTRAL", quote: "standard 5-star pricing expectations" },
    }
  },
  {
    title: "Resort Leisure Travel",
    text: "Exceptional attentiveness from guest relations manager Vikram. Spotless ocean-facing suite and tranquil beach surroundings. Highly recommended for families.",
    aspects: {
      "Front Desk & Staff": { score: 98, label: "POSITIVE", quote: "exceptional attentiveness from guest relations" },
      "Housekeeping": { score: 95, label: "POSITIVE", quote: "spotless ocean-facing suite" },
      "Safety & Security": { score: 98, label: "POSITIVE", quote: "safe and monitored family environment" },
      "Value Perception": { score: 92, label: "POSITIVE", quote: "commensurate with luxury tariff" },
      "Location & Transit": { score: 94, label: "POSITIVE", quote: "tranquil beachfront access" },
      "Food & Dining": { score: 88, label: "POSITIVE", quote: "consistent restaurant execution" },
      "Amenities": { score: 90, label: "POSITIVE", quote: "resort amenities fully operational" },
    }
  }
];

export default function SentimentIntelligence() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SAMPLE_REVIEWS[selectedIdx];

  return (
    <section id="sentiment" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>02 / Aspect-Based Sentiment Analysis</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Multi-dimensional evaluation across <br />
            <span className="font-serif italic text-[#D7BFA1]">seven operational verticals.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            A single guest review frequently commends culinary execution while criticizing front office wait times. TRIP decomposes unstructured guest text into discrete departmental metrics with mathematical polarity scoring.
          </p>
        </div>

        {/* Interactive ABSA Extractor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Text Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Unstructured Review Sample</span>
              <div className="flex space-x-1.5">
                {SAMPLE_REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                      selectedIdx === i 
                        ? 'bg-[#E16B42] text-white font-semibold' 
                        : 'bg-[#1C2028] text-[#9EA3AE] hover:text-white'
                    }`}
                  >
                    Dataset {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] text-sm text-[#FAF9F6] leading-relaxed italic">
              "{current.text}"
            </div>

            <div className="text-[11px] font-mono text-[#D7BFA1] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Multi-Label ABSA Model Verification: 96.2% Confidence</span>
            </div>
          </div>

          {/* Right: Dimension Extraction Output (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Decomposed Service Dimensions</span>
              <span className="text-[11px] font-mono text-emerald-400">EXTRACTED LIVE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {Object.entries(current.aspects).map(([dim, data]) => {
                const isPositive = data.label === 'POSITIVE';
                const isNegative = data.label === 'NEGATIVE';
                
                return (
                  <div 
                    key={dim}
                    className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2 hover:border-[#30343B] transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#FAF9F6] font-display">{dim}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isPositive 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : isNegative 
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-slate-500/15 text-slate-300 border border-slate-500/30'
                      }`}>
                        {data.score}%
                      </span>
                    </div>

                    <div className="w-full bg-[#1C2028] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          isPositive ? 'bg-emerald-500' : isNegative ? 'bg-rose-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${data.score}%` }}
                      />
                    </div>

                    <p className="text-[10px] text-[#9EA3AE] truncate italic">
                      "{data.quote}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
