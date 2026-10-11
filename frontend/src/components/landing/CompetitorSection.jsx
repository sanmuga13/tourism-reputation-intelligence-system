import React, { useState } from 'react';
import { Award, ArrowUpRight, ArrowDownRight, Layers, Check } from 'lucide-react';

const COMPETITORS = [
  {
    name: "ITC Grand Chola",
    score: 88.5,
    gap: -3.9,
    advantages: [
      { aspect: "Amenities", gap: "+5%", detail: "Larger pool complex & spa capacity" },
      { aspect: "Cleanliness", gap: "+2%", detail: "Slight edge in public lobby maintenance" }
    ],
    vulnerabilities: [
      { aspect: "Staff", gap: "-8%", detail: "Lower check-in speed and front desk satisfaction" },
      { aspect: "Value", gap: "-6%", detail: "Perception of overpriced in-room dining" }
    ]
  },
  {
    name: "Marina Beach Breeze Resort",
    score: 48.0,
    gap: -44.4,
    advantages: [
      { aspect: "Location", gap: "+3%", detail: "Direct beachfront coastal access" }
    ],
    vulnerabilities: [
      { aspect: "Amenities", gap: "-38%", detail: "Severe HVAC air conditioning maintenance issues" },
      { aspect: "Staff", gap: "-32%", detail: "Unresponsive guest service response times" }
    ]
  }
];

export default function CompetitorSection() {
  const [selectedComp, setSelectedComp] = useState(COMPETITORS[0]);

  return (
    <section id="competitors" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>05 / Competitor Benchmarking</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Benchmark your comp-set. <br />
            <span className="font-serif italic text-[#D7BFA1]">Defend rate premiums.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Guest booking expectations are formed relative to comp-set alternatives. TRIP benchmarks your property dimension-by-dimension against primary competitors to defend Average Daily Rate (ADR) and protect market share.
          </p>
        </div>

        {/* Benchmarking Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Baseline Property Card (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-[#1C2028] to-[#14171D] border border-[#E16B42]/50 p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
                Baseline Property
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">MARKET LEADER</span>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-[#FAF9F6]">Taj Coromandel Chennai</h3>
              <p className="text-xs text-[#9EA3AE] mt-0.5">Luxury 5-Star · Central Chennai</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#30343B] space-y-1">
              <span className="text-[10px] font-mono text-[#D7BFA1] uppercase">Composite Reputation</span>
              <div className="flex items-baseline space-x-2">
                <span className="font-display font-extrabold text-4xl text-[#FAF9F6]">92.4</span>
                <span className="text-xs text-[#9EA3AE]">/ 100</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#9EA3AE]">
              <div className="flex justify-between py-1 border-b border-[#22262E]">
                <span>Food Satisfaction:</span>
                <span className="text-[#FAF9F6] font-semibold">96%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#22262E]">
                <span>Staff Politeness:</span>
                <span className="text-[#FAF9F6] font-semibold">88%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#22262E]">
                <span>Cleanliness:</span>
                <span className="text-[#FAF9F6] font-semibold">92%</span>
              </div>
            </div>
          </div>

          {/* Competitor Gap Intelligence (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6">
            
            {/* Competitor Selector Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-[#30343B]">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">
                Select Competitor Property
              </span>
              <div className="flex space-x-2">
                {COMPETITORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedComp(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      selectedComp.name === c.name
                        ? 'bg-[#E16B42] text-white font-bold'
                        : 'bg-[#0B0D12] text-[#9EA3AE] hover:text-white'
                    }`}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Gap Metric Header */}
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] flex items-center justify-between">
              <div>
                <h4 className="font-display font-semibold text-base text-[#FAF9F6]">{selectedComp.name}</h4>
                <p className="text-xs text-[#9EA3AE]">Score: {selectedComp.score} pts</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  You Lead by +{Math.abs(selectedComp.gap)} pts
                </span>
              </div>
            </div>

            {/* Dimensional Advantages & Vulnerabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Where Competitor Leads */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0B0D12] border border-[#22262E]">
                <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                  Competitor Advantages
                </span>
                {selectedComp.advantages.map((adv, i) => (
                  <div key={i} className="text-xs space-y-0.5 border-b border-[#1C2028] pb-2 last:border-none">
                    <div className="flex justify-between font-semibold text-[#FAF9F6]">
                      <span>{adv.aspect}</span>
                      <span className="text-amber-400 font-mono">{adv.gap}</span>
                    </div>
                    <p className="text-[11px] text-[#9EA3AE]">{adv.detail}</p>
                  </div>
                ))}
              </div>

              {/* Where You Lead */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0B0D12] border border-[#22262E]">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Your Advantages
                </span>
                {selectedComp.vulnerabilities.map((vuln, i) => (
                  <div key={i} className="text-xs space-y-0.5 border-b border-[#1C2028] pb-2 last:border-none">
                    <div className="flex justify-between font-semibold text-[#FAF9F6]">
                      <span>{vuln.aspect}</span>
                      <span className="text-emerald-400 font-mono">You Lead +{Math.abs(parseFloat(vuln.gap))}%</span>
                    </div>
                    <p className="text-[11px] text-[#9EA3AE]">{vuln.detail}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
