import React, { useState } from 'react';
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Check, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

export default function CompetitorsTab({ competitorData }) {
  const [selectedCompName, setSelectedCompName] = useState('ITC Grand Chola');

  // Multi-entity comp-set data
  const competitors = [
    {
      name: "ITC Grand Chola",
      score: 88.5,
      overallGap: "+3.9 pts",
      category: "Luxury 5-Star (Guindy)",
      advantages: [
        { aspect: "Amenities", gap: "+5%", detail: "Larger pool complex, extensive conference halls, and spa capacity" },
        { aspect: "Cleanliness", gap: "+2%", detail: "Slight edge in public lobby maintenance and marble polishing" }
      ],
      vulnerabilities: [
        { aspect: "Staff", gap: "-8%", detail: "Lower check-in speed and reception responsiveness during high-volume conventions" },
        { aspect: "Value", gap: "-6%", detail: "Guest perception of overpriced in-room dining and mini-bar items" },
        { aspect: "Food", gap: "-4%", detail: "Buffet dining perceived as less authentic than Southern Spice" }
      ]
    },
    {
      name: "Marina Beach Resort",
      score: 48.0,
      overallGap: "+44.4 pts",
      category: "Midscale Coastal Resort (Marina Beach)",
      advantages: [
        { aspect: "Location", gap: "+3%", detail: "Direct beachfront coastal access along Marina promenade" }
      ],
      vulnerabilities: [
        { aspect: "Amenities", gap: "-38%", detail: "Severe HVAC air conditioning maintenance issues and leaking units" },
        { aspect: "Staff", gap: "-32%", detail: "Unresponsive guest service response times and check-in delays" },
        { aspect: "Cleanliness", gap: "-28%", detail: "Restroom hygiene complaints and delayed housekeeping visits" }
      ]
    }
  ];

  // Grouped Bar Chart comparing Taj Coromandel vs ITC Grand Chola vs Marina Beach across 7 aspects
  const comparisonBarData = [
    { aspect: "Food", Taj: 96, ITC: 92, Marina: 55 },
    { aspect: "Location", Taj: 95, ITC: 90, Marina: 98 },
    { aspect: "Safety", Taj: 96, ITC: 94, Marina: 70 },
    { aspect: "Cleanliness", Taj: 92, ITC: 94, Marina: 64 },
    { aspect: "Staff", Taj: 88, ITC: 80, Marina: 56 },
    { aspect: "Value", Taj: 85, ITC: 79, Marina: 58 },
    { aspect: "Amenities", Taj: 82, ITC: 87, Marina: 44 },
  ];

  const activeComp = competitors.find(c => c.name === selectedCompName) || competitors[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#D7BFA1]" />
            <span>Comp-Set Benchmarking & Market Gap Analysis</span>
          </h2>
          <p className="text-xs text-[#9EA3AE] mt-0.5">
            Comparative performance auditing against primary competitor properties to defend Average Daily Rate (ADR) and protect market share.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D7BFA1] bg-[#14171D] border border-[#30343B] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          2 Comp-Set Peers Tracked
        </span>
      </div>

      {/* ── BASELINE CARD & LEADERSHIP SUMMARY ── */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1C2028] via-[#14171D] to-[#0B0D12] border border-[#E16B42]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
              Baseline Property
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              MARKET LEADER
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl text-[#FAF9F6]">Taj Coromandel Chennai</h3>
          <span className="text-xs text-[#9EA3AE] block">Central Chennai Luxury 5-Star · Primary Tracked Hospitality Asset</span>
        </div>

        <div className="text-right sm:border-l sm:border-[#30343B] sm:pl-8">
          <div className="flex items-baseline space-x-2 justify-end">
            <span className="font-display font-black text-5xl text-[#FAF9F6]">92.4</span>
            <span className="text-xs font-mono text-[#9EA3AE]">/ 100</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold block mt-1">
            +3.9 pts Lead over Primary Peer
          </span>
        </div>
      </div>

      {/* ── GROUPED BAR CHART: DIMENSIONAL COMP-SET COMPARISON ── */}
      <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#30343B]">
          <div>
            <h3 className="font-display font-bold text-base text-[#FAF9F6]">
              7-Dimensional Comp-Set Comparison
            </h3>
            <p className="text-xs text-[#9EA3AE]">Multi-property satisfaction index (%) across all operational departments.</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-[#E16B42]">■ Taj Coromandel</span>
            <span className="text-[#D7BFA1]">■ ITC Grand Chola</span>
            <span className="text-[#64748B]">■ Marina Beach Resort</span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#22262E" vertical={false} />
              <XAxis dataKey="aspect" stroke="#9EA3AE" fontSize={11} tickLine={false} />
              <YAxis domain={[30, 100]} stroke="#9EA3AE" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#FAF9F6' }}
              />
              <Bar dataKey="Taj" fill="#E16B42" name="Taj Coromandel" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ITC" fill="#D7BFA1" name="ITC Grand Chola" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Marina" fill="#64748B" name="Marina Beach Resort" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── PEER GAP INTELLIGENCE & VULNERABILITY INSPECTOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Competitor Peer Selector (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#14171D] border border-[#30343B] p-5 space-y-3 shadow-xl">
          <div className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider pb-1 border-b border-[#22262E]">
            Select Competitor Peer
          </div>

          <div className="space-y-2 pt-1">
            {competitors.map((c) => {
              const isSelected = selectedCompName === c.name;
              return (
                <div
                  key={c.name}
                  onClick={() => setSelectedCompName(c.name)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1C2028] border-[#E16B42] shadow-lg shadow-[#E16B42]/10 translate-x-1'
                      : 'bg-[#0B0D12] border-[#22262E] hover:border-[#30343B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-sm text-[#FAF9F6]">{c.name}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-400">You Lead</span>
                  </div>
                  <span className="text-[11px] text-[#9EA3AE] block mt-0.5">{c.category}</span>
                  
                  <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-[#22262E]/60 text-xs font-mono">
                    <span className="text-[#9EA3AE]">Score: {c.score} pts</span>
                    <span className="text-emerald-400 font-semibold">{c.overallGap} Lead</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Gap Analysis Matrix (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#30343B]">
            <div>
              <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
                Direct Comp-Set Audit
              </span>
              <h3 className="font-display font-bold text-xl text-[#FAF9F6] mt-0.5">
                {activeComp.name} Gap Breakdown
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                You Lead by {activeComp.overallGap}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Where Competitor Leads */}
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
              <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                Competitor Advantages ({activeComp.advantages.length})
              </span>
              {activeComp.advantages.map((adv, i) => (
                <div key={i} className="text-xs space-y-1 border-b border-[#1C2028] pb-2.5 last:border-none">
                  <div className="flex justify-between font-semibold text-[#FAF9F6]">
                    <span>{adv.aspect}</span>
                    <span className="text-amber-400 font-mono">{adv.gap}</span>
                  </div>
                  <p className="text-[11px] text-[#9EA3AE] leading-relaxed">{adv.detail}</p>
                </div>
              ))}
            </div>

            {/* Where You Lead */}
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" />
                Your Competitive Lead ({activeComp.vulnerabilities.length})
              </span>
              {activeComp.vulnerabilities.map((vuln, i) => (
                <div key={i} className="text-xs space-y-1 border-b border-[#1C2028] pb-2.5 last:border-none">
                  <div className="flex justify-between font-semibold text-[#FAF9F6]">
                    <span>{vuln.aspect}</span>
                    <span className="text-emerald-400 font-mono">You Lead +{Math.abs(parseFloat(vuln.gap))}%</span>
                  </div>
                  <p className="text-[11px] text-[#9EA3AE] leading-relaxed">{vuln.detail}</p>
                </div>
              ))}
            </div>

          </div>

          <div className="p-4 rounded-xl bg-[#14171D] border border-[#22262E] text-xs text-[#9EA3AE] space-y-1">
            <strong className="text-[#FAF9F6] block">Strategic Revenue Guidance:</strong>
            <p className="leading-relaxed">
              Maintain current 12–15% ADR premium over {activeComp.name} driven by Food & Beverage and Staff politeness superiority. Remediate HVAC operational maintenance to safeguard amenities advantage.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
