import React from 'react';
import { ShieldCheck, TrendingUp, Info } from 'lucide-react';

export default function AspectsTab() {
  const dimensions = [
    { aspect: "Food", score: 96, positive: 94, negative: 4, neutral: 2, quote: "South Indian breakfast buffet at Southern Spice was extraordinary." },
    { aspect: "Staff", score: 88, positive: 82, negative: 12, neutral: 6, quote: "Concierge was brilliant, but front desk had a delay during weekend rush." },
    { aspect: "Cleanliness", score: 92, positive: 90, negative: 6, neutral: 4, quote: "Spotless bathrooms and crisp bedsheets in the luxury ocean suite." },
    { aspect: "Safety", score: 96, positive: 96, negative: 2, neutral: 2, quote: "24/7 security and safe surrounding neighborhood." },
    { aspect: "Value", score: 85, positive: 80, negative: 10, neutral: 10, quote: "Fair rates for 5-star amenities, in-room dining slightly premium." },
    { aspect: "Location", score: 95, positive: 94, negative: 3, neutral: 3, quote: "Central heart of Chennai, convenient to business district." },
    { aspect: "Amenities", score: 82, positive: 78, negative: 16, neutral: 6, quote: "Beautiful swimming pool, but AC in room 402 needed servicing." },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-[#FAF9F6]">Departmental Touchpoint Attribution (ABSA)</h2>
        <p className="text-xs text-[#9EA3AE]">
          Multi-label aspect extraction mapping verified guest commentary to operational hotel divisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensions.map((d) => (
          <div key={d.aspect} className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#FAF9F6]">{d.aspect}</h3>
                <span className="text-[11px] font-mono text-[#D7BFA1]">Department Satisfaction Index: {d.score}%</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                d.score >= 90 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                d.score >= 80 ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}>
                {d.score >= 90 ? 'EXCELLENT' : d.score >= 80 ? 'STABLE' : 'ACTION REQ.'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0B0D12] h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: `${d.positive}%` }} title={`Positive: ${d.positive}%`} />
              <div className="bg-slate-500 h-full" style={{ width: `${d.neutral}%` }} title={`Neutral: ${d.neutral}%`} />
              <div className="bg-rose-500 h-full" style={{ width: `${d.negative}%` }} title={`Negative: ${d.negative}%`} />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-[#9EA3AE]">
              <span className="text-emerald-400">{d.positive}% Pos</span>
              <span>{d.neutral}% Neu</span>
              <span className="text-rose-400">{d.negative}% Neg</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs text-[#FAF9F6] italic">
              "{d.quote}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
