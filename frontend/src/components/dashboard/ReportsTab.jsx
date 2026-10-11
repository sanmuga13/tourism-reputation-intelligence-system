import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function ReportsTab({ entity, reputationData, rootCauses, onDownloadReport }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadReport();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center">
          <FileText className="w-5 h-5 text-[#E16B42] mr-2" />
          Executive Governance Dossiers
        </h2>
        <p className="text-xs text-[#9EA3AE]">
          Compile audited management dossiers containing Composite Reputation Index (CRI) breakdowns, departmental aspect ratings, and prescriptive remediation agendas.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#14171D] border border-[#30343B] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#30343B]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E16B42] font-semibold">
              Available Executive Dossier
            </span>
            <h3 className="font-display font-bold text-xl text-[#FAF9F6] mt-1">
              Monthly Reputation & Diagnostic Review
            </h3>
            <p className="text-xs text-[#9EA3AE]">
              Property: {entity?.name || 'Taj Coromandel'} ({entity?.city || 'Chennai'})
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E16B42] to-[#BC674F] hover:from-[#EE7E57] hover:to-[#E16B42] text-white text-xs font-semibold shadow-xl shadow-[#E16B42]/20 transition-all disabled:opacity-50"
          >
            <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
            <span>{downloading ? 'Generating PDF...' : 'Download Executive Dossier (PDF)'}</span>
          </button>
        </div>

        {/* Report Sections Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 1 & 2</span>
            <h4 className="font-bold text-[#FAF9F6]">Executive Briefing & KPIs</h4>
            <p className="text-[#9EA3AE]">
              Composite score (0–100), weighted formula breakdown, and volume velocity tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 3</span>
            <h4 className="font-bold text-[#FAF9F6]">7-Dimension ABSA Audit</h4>
            <p className="text-[#9EA3AE]">
              Tabular ratings for Food, Staff, Cleanliness, Safety, Value, Location, and Amenities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 4 & 5</span>
            <h4 className="font-bold text-[#FAF9F6]">Root Causes & Action Plan</h4>
            <p className="text-[#9EA3AE]">
              Clustered operational failure points with frequency counts, severity, and assigned remedies.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] flex items-center justify-between text-xs text-[#9EA3AE] font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Format: High-Resolution Vector PDF (ReportLab Engine)</span>
          </div>
          <span>Confidential Board Document</span>
        </div>
      </div>
    </div>
  );
}
