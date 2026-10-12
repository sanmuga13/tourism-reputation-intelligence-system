import React from 'react';
import { Flame, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RootCausesTab({ rootCauses }) {
  const causes = rootCauses && rootCauses.length > 0 ? rootCauses : [
    { aspect: "Staff", cause_text: "Extended check-in queue and slow front desk response", frequency: 14, severity: 0.85 },
    { aspect: "Amenities", cause_text: "Air conditioning malfunctions and maintenance failures", frequency: 8, severity: 0.82 },
    { aspect: "Cleanliness", cause_text: "Housekeeping hygiene and stained linen/restrooms", frequency: 6, severity: 0.76 },
    { aspect: "Food", cause_text: "Delayed room service and long meal wait times", frequency: 4, severity: 0.65 }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center">
          <Flame className="w-5 h-5 text-[#E16B42] mr-2" />
          Failure Mode Diagnostics & Operational Attribution
        </h2>
        <p className="text-xs text-[#9EA3AE]">
          Isolates recurring operational failure modes and assigns prescriptive Standard Operating Procedure (SOP) remedies.
        </p>
      </div>

      <div className="space-y-4">
        {causes.map((rc, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-[#0B0D12] text-[#D7BFA1] font-semibold">
                  {rc.aspect}
                </span>
                <h3 className="font-display font-bold text-base text-[#FAF9F6]">
                  {rc.cause_text}
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                  {rc.frequency} Incidents Logged
                </span>
                <span className="text-[#9EA3AE]">
                  Severity: {(rc.severity * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#E16B42] font-semibold">
                  Prescriptive Operational Action
                </span>
                <p className="text-[#FAF9F6]">
                  {rc.aspect === 'Staff' 
                    ? 'Deploy 2 additional cross-trained front desk staff during 12 PM - 3 PM arrival rush.'
                    : rc.aspect === 'Amenities'
                    ? 'Conduct immediate preventative HVAC filter and drain inspections on floor 4.'
                    : 'Audit morning housekeeping linens with digital checklist and UV verification.'}
                </p>
              </div>
              <span className="text-emerald-400 font-mono font-bold whitespace-nowrap">
                Est. Impact: +3.5 pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
