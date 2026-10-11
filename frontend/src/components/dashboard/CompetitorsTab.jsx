import React from 'react';
import { Users, ArrowUpRight, ArrowDownRight, Check } from 'lucide-react';

export default function CompetitorsTab({ competitorData }) {
  const data = competitorData || {
    baseline: "Taj Coromandel Chennai",
    baselineScore: 92.4,
    competitors: [
      {
        entityId: 2,
        name: "ITC Grand Chola",
        reputationScore: 88.5,
        overallGap: -3.9,
        advantages: [
          { aspect: "Amenities", gap: "+5%" },
          { aspect: "Cleanliness", gap: "+2%" }
        ]
      },
      {
        entityId: 4,
        name: "Marina Beach Breeze Resort",
        reputationScore: 48.0,
        overallGap: -44.4,
        advantages: [
          { aspect: "Location", gap: "+3%" }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center">
          <Users className="w-5 h-5 text-[#D7BFA1] mr-2" />
          Comp-Set Benchmarking & Gap Analysis
        </h2>
        <p className="text-xs text-[#9EA3AE]">
          Comparative performance tracking against designated peer set to defend ADR and market share.
        </p>
      </div>

      {/* Baseline Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1C2028] to-[#14171D] border border-[#E16B42]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
            Baseline Property
          </span>
          <h3 className="font-display font-bold text-2xl text-[#FAF9F6] mt-0.5">{data.baseline}</h3>
          <span className="text-xs text-[#9EA3AE]">Primary tracked hospitality asset</span>
        </div>
        <div className="text-right">
          <span className="font-display font-extrabold text-4xl text-[#FAF9F6]">{data.baselineScore}</span>
          <span className="text-xs text-[#9EA3AE] block">CRI Benchmark</span>
        </div>
      </div>

      {/* Competitors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.competitors?.map((comp) => (
          <div key={comp.entityId} className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <h4 className="font-display font-bold text-base text-[#FAF9F6]">{comp.name}</h4>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                comp.overallGap >= 0
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {comp.overallGap >= 0 ? `+${comp.overallGap}` : comp.overallGap} pts gap
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="font-display font-bold text-3xl text-[#FAF9F6]">{comp.reputationScore}</span>
              <span className="text-xs text-[#9EA3AE]">/ 100</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#22262E]">
              <span className="text-[11px] font-mono text-[#9EA3AE] uppercase tracking-wider">
                Competitor Advantages
              </span>
              {comp.advantages?.map((adv, i) => (
                <div key={i} className="flex justify-between text-xs p-2 rounded-lg bg-[#0B0D12] text-[#FAF9F6]">
                  <span>{adv.aspect}</span>
                  <span className="font-mono text-amber-400 font-semibold">{adv.gap}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
