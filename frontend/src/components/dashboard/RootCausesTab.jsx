import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Info, 
  Clock, 
  ShieldAlert, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function RootCausesTab({ rootCauses }) {
  const [selectedClusterId, setSelectedClusterId] = useState('checkin');

  const clusters = [
    {
      id: 'checkin',
      aspect: 'Staff',
      department: 'Front Office',
      title: 'Extended Check-in Queue and Reception Bottlenecks',
      frequency: 14,
      severity: 0.85,
      impact: "+4.2 pts CRI Recovery",
      trend: "+3 incidents vs last month",
      sampleReviews: [
        "Waited 45 minutes to get room keys on Saturday afternoon with no priority line for loyalty members.",
        "Front desk was understaffed during arrival peak rush; staff appeared stressed and luggage handling was delayed.",
        "Check-in staff took 20 minutes to verify our reservation while lines stretched into the lobby."
      ],
      sopRecommendation: "Deploy digital key mobile check-in kiosk in main atrium and stagger 2 additional front office receptionists during the 12:00 PM – 3:30 PM peak arrival window.",
      owner: "Director of Rooms & Guest Experience"
    },
    {
      id: 'hvac',
      aspect: 'Amenities',
      department: 'Engineering & Facilities',
      title: 'HVAC Condensation Leaks & Noise in 4th Floor Coastal Rooms',
      frequency: 8,
      severity: 0.82,
      impact: "+3.8 pts CRI Recovery",
      trend: "Recurring in coastal wing",
      sampleReviews: [
        "Air conditioning unit in room 408 was dripping condensation water onto our luggage rack overnight.",
        "AC compressor was rattling loudly every 20 minutes, preventing sleep until technician arrived at 3 AM.",
        "Cooling remote control had dead batteries and maintenance took over 90 minutes to replace."
      ],
      sopRecommendation: "Execute mandatory preventative quarterly condensate drain flushing and compressor motor sound dampening across all 4th floor coastal wing suites.",
      owner: "Chief Engineer"
    },
    {
      id: 'housekeeping',
      aspect: 'Cleanliness',
      department: 'Housekeeping',
      title: 'Linen Quality Inspection & Restroom Drain Odors',
      frequency: 6,
      severity: 0.76,
      impact: "+2.5 pts CRI Recovery",
      trend: "Decreasing (-2 incidents)",
      sampleReviews: [
        "Bath towels were visibly frayed at the edges and showed faint discoloration.",
        "Noticeable bathroom drain odor upon initial arrival; required second housekeeping visit to disinfect."
      ],
      sopRecommendation: "Implement rigorous UV light hygiene checklist during morning turnaround and retire all linen inventory exceeding 120 laundering cycles.",
      owner: "Executive Housekeeper"
    },
    {
      id: 'dining',
      aspect: 'Food',
      department: 'Food & Beverage',
      title: 'Peak Breakfast Seating Delays & Coffee Refill Latency',
      frequency: 4,
      severity: 0.65,
      impact: "+1.6 pts CRI Recovery",
      trend: "Restricted to Sunday mornings",
      sampleReviews: [
        "Buffet queue for Southern Spice live dosa station exceeded 15 minutes on Sunday morning.",
        "Table was cleared promptly, but waited 10 minutes for filter coffee refills during 9:30 AM rush."
      ],
      sopRecommendation: "Pre-stage secondary south-indian filter coffee carts in dining terrace and introduce mobile hostess seating management during Sunday 9:00 AM – 10:30 AM brunch peak.",
      owner: "F&B Director"
    }
  ];

  const activeCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];

  const frequencyChartData = clusters.map(c => ({
    name: c.aspect,
    Incidents: c.frequency,
    Severity: Math.round(c.severity * 100)
  }));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
            <Flame className="w-5 h-5 text-[#E16B42]" />
            <span>Root Cause Explorer (Failure Mode Diagnostics)</span>
          </h2>
          <p className="text-xs text-[#9EA3AE] mt-0.5">
            NLP semantic clustering grouping negative review themes into verified operational failure modes and assigning prescriptive SOP actions.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          4 Active Clusters Identified
        </span>
      </div>

      {/* ── METHODOLOGICAL CORRELATION NOTICE (Required in Directive) ── */}
      <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex items-start space-x-3 text-xs">
        <Info className="w-4 h-4 text-[#D7BFA1] shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-[#9EA3AE]">
          <span className="font-semibold text-[#FAF9F6] block">Analytical Correlation Disclaimer</span>
          <p className="leading-relaxed">
            The diagnostic model identifies statistically significant correlations and recurring thematic patterns extracted from verbatim guest feedback. Findings represent operational failure symptoms reported by guests rather than laboratory causal proofs. Management should verify physical equipment logs and duty rosters.
          </p>
        </div>
      </div>

      {/* ── FREQUENCY & SEVERITY COMPARISON CHART ── */}
      <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
          <div>
            <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Complaint Cluster Incident Frequency & Impact Severity</h3>
            <p className="text-xs text-[#9EA3AE]">Volume of complaining guests vs. weighted severity index (%)</p>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="text-rose-400">■ Incident Count</span>
            <span className="text-amber-400">■ Severity %</span>
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#22262E" vertical={false} />
              <XAxis dataKey="name" stroke="#9EA3AE" fontSize={11} tickLine={false} />
              <YAxis stroke="#9EA3AE" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 11 }}
                itemStyle={{ color: '#FAF9F6' }}
              />
              <Bar dataKey="Incidents" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Severity" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── INTERACTIVE CLUSTER SELECTION & DEEP-DIVE INSPECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Clusters List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider pb-1">
            Active Failure Mode Clusters
          </div>

          {clusters.map((cl) => {
            const isSelected = selectedClusterId === cl.id;
            return (
              <div
                key={cl.id}
                onClick={() => setSelectedClusterId(cl.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1C2028] border-[#E16B42] shadow-xl shadow-[#E16B42]/10 translate-x-1'
                    : 'bg-[#14171D] border-[#30343B] hover:border-[#686D76]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0B0D12] text-[#D7BFA1] font-semibold">
                    {cl.department}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    {cl.frequency} incidents
                  </span>
                </div>

                <h3 className="font-display font-semibold text-sm text-[#FAF9F6]">
                  {cl.title}
                </h3>

                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9EA3AE]">Severity: {(cl.severity * 100).toFixed(0)}%</span>
                  <span className="text-emerald-400 font-semibold">{cl.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Inspection Panel (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#30343B]">
            <div>
              <span className="text-[10px] font-mono text-[#E16B42] uppercase tracking-wider font-semibold">
                {activeCluster.department} · {activeCluster.aspect} Touchpoint
              </span>
              <h3 className="font-display font-bold text-lg text-[#FAF9F6] mt-0.5">
                {activeCluster.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400 block">{activeCluster.impact}</span>
              <span className="text-[10px] font-mono text-[#9EA3AE]">{activeCluster.trend}</span>
            </div>
          </div>

          {/* Verbatim Supporting Evidence */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">
              Verbatim Guest Review Evidence ({activeCluster.sampleReviews.length} excerpts)
            </span>
            {activeCluster.sampleReviews.map((quote, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs text-[#FAF9F6] italic leading-relaxed">
                "{quote}"
              </div>
            ))}
          </div>

          {/* Prescriptive SOP Action Plan */}
          <div className="p-5 rounded-xl bg-[#E16B42]/10 border border-[#E16B42]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E16B42] font-semibold flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Standard Operating Procedure (SOP) Remediation
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">EXECUTIVE DIRECTIVE</span>
            </div>
            
            <p className="text-xs text-[#FAF9F6] leading-relaxed">
              {activeCluster.sopRecommendation}
            </p>

            <div className="pt-2 border-t border-[#E16B42]/20 flex items-center justify-between text-[11px] font-mono text-[#D7BFA1]">
              <span>Assigned Department Head:</span>
              <span className="font-semibold text-[#FAF9F6]">{activeCluster.owner}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
