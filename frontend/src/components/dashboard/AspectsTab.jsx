import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Info, Sparkles, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

export default function AspectsTab() {
  const [selectedAspect, setSelectedAspect] = useState('Food');

  const dimensions = [
    { 
      aspect: "Food", 
      score: 96, 
      benchmark: 90,
      positive: 94, 
      neutral: 2, 
      negative: 4, 
      department: "Food & Beverage",
      status: "MARKET LEADER",
      quote: "South Indian breakfast buffet at Southern Spice was extraordinary; filter coffee and live dosa station are world-class.",
      action: "Maintain culinary leadership; showcase Southern Spice heritage awards in pre-arrival concierge emails."
    },
    { 
      aspect: "Location", 
      score: 95, 
      benchmark: 92,
      positive: 94, 
      neutral: 3, 
      negative: 3, 
      department: "Concierge & Logistics",
      status: "PRIME ASSET",
      quote: "Central heart of Nungambakkam business district, convenient for both corporate meetings and cultural landmarks.",
      action: "Leverage central proximity in luxury business traveler marketing."
    },
    { 
      aspect: "Safety", 
      score: 96, 
      benchmark: 94,
      positive: 96, 
      neutral: 2, 
      negative: 2, 
      department: "Security & Risk Control",
      status: "EXCELLENT",
      quote: "24/7 attentive security, safe surrounding diplomatic enclave, and strict sanitization.",
      action: "Standardize safety protocol audits across night shifts."
    },
    { 
      aspect: "Cleanliness", 
      score: 92, 
      benchmark: 89,
      positive: 90, 
      neutral: 4, 
      negative: 6, 
      department: "Housekeeping",
      status: "EXCELLENT",
      quote: "Spotless bathrooms and crisp Egyptian cotton bedsheets in the luxury ocean suite.",
      action: "Enforce UV light verification checklists during morning room turnaround."
    },
    { 
      aspect: "Staff", 
      score: 88, 
      benchmark: 86,
      positive: 82, 
      neutral: 6, 
      negative: 12, 
      department: "Front Office",
      status: "STABLE",
      quote: "Concierge was brilliant, but front desk had a delay during weekend Saturday check-in rush.",
      action: "Implement digital pre-check-in keys and add 2 staggered receptionists during 12 PM - 3 PM arrival peak."
    },
    { 
      aspect: "Value", 
      score: 85, 
      benchmark: 84,
      positive: 80, 
      neutral: 10, 
      negative: 10, 
      department: "Revenue Management",
      status: "COMPETITIVE",
      quote: "Fair rates for 5-star amenities, though in-room dining carries a heavy surcharge.",
      action: "Bundle complimentary high-speed Wi-Fi and breakfast credits for direct-booked corporate guests."
    },
    { 
      aspect: "Amenities", 
      score: 82, 
      benchmark: 87,
      positive: 78, 
      neutral: 6, 
      negative: 16, 
      department: "Engineering & Facilities",
      status: "ACTION REQ.",
      quote: "Beautiful swimming pool and spa, but AC in 4th floor sea-facing room was dripping water onto luggage.",
      action: "Deploy immediate preventative quarterly HVAC maintenance across 4th floor guest corridors."
    },
  ];

  const radarData = dimensions.map(d => ({
    aspect: d.aspect,
    Property: d.score,
    Benchmark: d.benchmark
  }));

  const stackedBarData = dimensions.map(d => ({
    aspect: d.aspect,
    Positive: d.positive,
    Neutral: d.neutral,
    Negative: d.negative
  }));

  const currentDetail = dimensions.find(d => d.aspect === selectedAspect) || dimensions[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#E16B42]" />
            <span>Departmental Touchpoint Attribution (ABSA)</span>
          </h2>
          <p className="text-xs text-[#9EA3AE] mt-0.5">
            Multi-label sentiment decomposition mapping verified guest discourse across 7 operational hotel divisions.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D7BFA1] bg-[#14171D] border border-[#30343B] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          7 Touchpoints Tracked
        </span>
      </div>

      {/* ── CHARTS ROW: RADAR CHART (6 cols) + STACKED DISTRIBUTION BAR (6 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Comparison Chart (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div>
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">7-Dimensional Radar Comparison</h3>
              <p className="text-xs text-[#9EA3AE]">Property score vs. Luxury Comp-Set Benchmark</p>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="flex items-center text-[#E16B42]"><span className="w-2 h-2 rounded-full bg-[#E16B42] mr-1" />Taj</span>
              <span className="flex items-center text-[#9EA3AE]"><span className="w-2 h-2 rounded-full bg-[#9EA3AE] mr-1" />Comp-Set</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#22262E" />
                <PolarAngleAxis dataKey="aspect" stroke="#9EA3AE" fontSize={11} />
                <PolarRadiusAxis domain={[70, 100]} stroke="#22262E" fontSize={9} />
                <Radar name="Property" dataKey="Property" stroke="#E16B42" fill="#E16B42" fillOpacity={0.4} />
                <Radar name="Benchmark" dataKey="Benchmark" stroke="#9EA3AE" fill="#9EA3AE" fillOpacity={0.15} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: '#FAF9F6' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stacked Sentiment Polarity Bar Chart (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div>
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Sentiment Polarity by Division</h3>
              <p className="text-xs text-[#9EA3AE]">Positive, Neutral, and Negative composition (%)</p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono">
              <span className="text-emerald-400">■ Pos</span>
              <span className="text-slate-400">■ Neu</span>
              <span className="text-rose-400">■ Neg</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stackedBarData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22262E" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#9EA3AE" fontSize={10} />
                <YAxis dataKey="aspect" type="category" stroke="#9EA3AE" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: '#FAF9F6' }}
                />
                <Bar dataKey="Positive" stackId="a" fill="#10B981" />
                <Bar dataKey="Neutral" stackId="a" fill="#64748B" />
                <Bar dataKey="Negative" stackId="a" fill="#F43F5E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ── INTERACTIVE TOUCHPOINT DRILL-DOWN SELECTOR & DETAIL INSPECTOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Department List Selector (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#14171D] border border-[#30343B] p-5 space-y-2.5 shadow-xl">
          <div className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider pb-1 border-b border-[#22262E]">
            Select Department Touchpoint
          </div>

          <div className="space-y-1.5 pt-1">
            {dimensions.map((d) => {
              const isSelected = selectedAspect === d.aspect;
              return (
                <div
                  key={d.aspect}
                  onClick={() => setSelectedAspect(d.aspect)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1C2028] border-[#E16B42] shadow-md shadow-[#E16B42]/10 translate-x-1'
                      : 'bg-[#0B0D12] border-[#22262E] hover:border-[#30343B]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-display font-bold text-sm text-[#FAF9F6]">{d.aspect}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        d.score >= 90 ? 'bg-emerald-500/15 text-emerald-400' :
                        d.score >= 85 ? 'bg-blue-500/15 text-blue-400' : 'bg-amber-500/15 text-amber-400'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#9EA3AE] block">{d.department}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-display font-extrabold text-base text-[#FAF9F6]">{d.score}%</span>
                    <span className="text-[10px] font-mono text-emerald-400 block">{d.positive}% pos</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Touchpoint Inspector Panel (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#30343B]">
            <div>
              <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
                {currentDetail.department}
              </span>
              <h3 className="font-display font-bold text-xl text-[#FAF9F6] mt-0.5">{currentDetail.aspect} Touchpoint Deep-Dive</h3>
            </div>
            <div className="text-right">
              <span className="font-display font-extrabold text-3xl text-[#FAF9F6]">{currentDetail.score}%</span>
              <span className="text-[10px] font-mono text-[#D7BFA1] block">Satisfaction Index</span>
            </div>
          </div>

          {/* Evidence Quote */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">Representative Guest Verbatim</span>
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs text-[#FAF9F6] italic leading-relaxed">
              "{currentDetail.quote}"
            </div>
          </div>

          {/* Operational Action Plan */}
          <div className="p-4 rounded-xl bg-[#E16B42]/10 border border-[#E16B42]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E16B42] font-semibold flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Operational Remediation SOP
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">HIGH PRIORITY</span>
            </div>
            <p className="text-xs text-[#FAF9F6] leading-relaxed">
              {currentDetail.action}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono pt-1">
            <div className="p-2.5 rounded-lg bg-[#0B0D12] border border-[#22262E]">
              <span className="text-[#9EA3AE] text-[10px] block">Comp-Set Benchmark</span>
              <span className="text-[#FAF9F6] font-bold text-sm">{currentDetail.benchmark}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B0D12] border border-[#22262E]">
              <span className="text-[#9EA3AE] text-[10px] block">Relative Lead</span>
              <span className="text-emerald-400 font-bold text-sm">+{currentDetail.score - currentDetail.benchmark}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B0D12] border border-[#22262E]">
              <span className="text-[#9EA3AE] text-[10px] block">Classification Sample</span>
              <span className="text-[#D7BFA1] font-bold text-sm">Verified</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
