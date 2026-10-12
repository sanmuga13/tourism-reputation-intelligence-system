import React, { useState } from 'react';
import { Flame, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

const CLUSTERS = [
  {
    id: 'checkin',
    aspect: 'Staff',
    title: 'Front Desk Peak Check-in Congestion',
    frequency: 14,
    severity: 0.85,
    sampleReviews: [
      "Waited 45 minutes to get room keys on Saturday afternoon.",
      "Front desk was understaffed during check-in rush; no priority line for members.",
      "Check-in staff looked stressed and luggage was delayed 30 minutes."
    ],
    recommendation: "Implement mobile digital key pre-check-in & stagger front desk shifts during 12 PM - 3 PM arrival windows.",
    projectedGain: "+4.2 pts"
  },
  {
    id: 'ac',
    aspect: 'Amenities',
    title: 'HVAC Air Conditioning Condensation Leaks',
    frequency: 8,
    severity: 0.82,
    sampleReviews: [
      "AC in 4th floor sea-facing room was dripping water onto luggage.",
      "Cooling unit was noisy and remote control had dead batteries.",
      "Maintenance took 2 hours to inspect leaking air conditioner."
    ],
    recommendation: "Execute preventative quarterly HVAC cleaning across 4th floor coastal rooms.",
    projectedGain: "+3.8 pts"
  },
  {
    id: 'linen',
    aspect: 'Cleanliness',
    title: 'Linen Quality & Restroom Sanitation',
    frequency: 6,
    severity: 0.76,
    sampleReviews: [
      "Bath towels were frayed and showed faint stains.",
      "Bathroom floor was slippery and drain odor noticed upon arrival."
    ],
    recommendation: "Audit linen inventory and introduce UV inspection checklist for morning housekeeping shifts.",
    projectedGain: "+2.5 pts"
  }
];

export default function RootCauseSection() {
  const [selectedCluster, setSelectedCluster] = useState(CLUSTERS[0]);

  return (
    <section id="rootcauses" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>02 / Root Cause Diagnostics</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Isolate the operational friction <br />
            <span className="font-serif italic text-[#D7BFA1]">behind customer sentiment.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Aggregated star ratings obscure actionable operational defects. TRIP groups verbatim guest feedback into recurring failure modes, isolating specific shifts, departments, and equipment bottlenecks before they impact RevPAR.
          </p>
        </div>

        {/* Semantic Cluster Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Clusters List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider pb-1">
              Active Complaint Clusters
            </div>

            {CLUSTERS.map((cl) => {
              const isSelected = selectedCluster.id === cl.id;
              return (
                <div
                  key={cl.id}
                  onClick={() => setSelectedCluster(cl)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#1C2028] border-[#E16B42] shadow-xl shadow-[#E16B42]/10 translate-x-1'
                      : 'bg-[#14171D] border-[#30343B] hover:border-[#686D76]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0B0D12] text-[#D7BFA1]">
                      {cl.aspect}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-400">
                      {cl.frequency} occurrences
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-sm text-[#FAF9F6]">
                    {cl.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-xs text-[#9EA3AE]">
                    <span>Severity Impact: {(cl.severity * 100).toFixed(0)}%</span>
                    <span className="text-emerald-400 font-mono font-medium">{cl.projectedGain}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Inspection Panel (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#30343B]">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-[#E16B42]" />
                <span className="font-display font-bold text-sm text-[#FAF9F6]">Operational Evidence Breakdown</span>
              </div>
              <span className="text-[11px] font-mono text-[#D7BFA1]">SEMANTIC CLUSTERING</span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Verbatim Guest Records</span>
              {selectedCluster.sampleReviews.map((quote, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs text-[#FAF9F6] italic leading-relaxed">
                  "{quote}"
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#E16B42]/10 border border-[#E16B42]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E16B42] font-semibold">
                  Prescriptive Remediation Action
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  PROJECTED SCORE RECOVERY: {selectedCluster.projectedGain}
                </span>
              </div>
              <p className="text-xs text-[#FAF9F6] leading-relaxed">
                {selectedCluster.recommendation}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
