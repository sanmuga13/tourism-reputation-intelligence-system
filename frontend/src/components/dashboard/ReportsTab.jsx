import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Calendar,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';

export default function ReportsTab({ entity, reputationData, rootCauses, onDownloadReport }) {
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [includeForecasts, setIncludeForecasts] = useState(true);
  const [includeCompSet, setIncludeCompSet] = useState(true);
  const [includeRootCauses, setIncludeRootCauses] = useState(true);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadReport();
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  const archiveReports = [
    { id: 1, title: "Q3 2026 Executive Reputation Audit", date: "2026-10-01", pages: 12, status: "READY", size: "2.4 MB" },
    { id: 2, title: "Monthly Diagnostic Review — September 2026", date: "2026-09-01", pages: 8, status: "READY", size: "1.8 MB" },
    { id: 3, title: "Quarterly Comp-Set Yield Benchmark — Q2 2026", date: "2026-07-01", pages: 14, status: "READY", size: "3.1 MB" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#E16B42]" />
            <span>Executive Governance & Management Dossiers</span>
          </h2>
          <p className="text-xs text-[#9EA3AE] mt-0.5">
            Compile board-ready executive intelligence dossiers with mathematical KPI auditing, root cause actions, and econometric forecasts.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D7BFA1] bg-[#14171D] border border-[#30343B] px-3 py-1.5 rounded-xl self-start sm:self-auto">
          High-Resolution ReportLab PDF
        </span>
      </div>

      {/* ── ACTIVE REPORT GENERATOR CARD ── */}
      <div className="p-7 rounded-3xl bg-[#14171D] border border-[#30343B] space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#30343B]">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E16B42] font-semibold">
                Boardroom Dossier Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE COMPILATION
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#FAF9F6]">
              Monthly Reputation & Diagnostic Review
            </h3>
            <p className="text-xs text-[#9EA3AE]">
              Property: <strong className="text-[#FAF9F6]">{entity?.name || 'Taj Coromandel Chennai'}</strong> ({entity?.city || 'Chennai'}, India)
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E16B42] to-[#BC674F] hover:from-[#EE7E57] hover:to-[#E16B42] text-white text-xs font-semibold shadow-xl shadow-[#E16B42]/20 transition-all disabled:opacity-50 shrink-0 transform active:scale-95"
          >
            <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
            <span>{downloading ? 'Generating ReportLab Vector PDF...' : 'Download Executive Dossier (PDF)'}</span>
          </button>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] cursor-pointer hover:border-[#30343B]">
            <input 
              type="checkbox" 
              checked={includeRootCauses} 
              onChange={(e) => setIncludeRootCauses(e.target.checked)}
              className="accent-[#E16B42] rounded"
            />
            <span className="text-[#FAF9F6]">Include Root Cause SOPs</span>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] cursor-pointer hover:border-[#30343B]">
            <input 
              type="checkbox" 
              checked={includeForecasts} 
              onChange={(e) => setIncludeForecasts(e.target.checked)}
              className="accent-[#E16B42] rounded"
            />
            <span className="text-[#FAF9F6]">Include 90-Day Forecasts</span>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] cursor-pointer hover:border-[#30343B]">
            <input 
              type="checkbox" 
              checked={includeCompSet} 
              onChange={(e) => setIncludeCompSet(e.target.checked)}
              className="accent-[#E16B42] rounded"
            />
            <span className="text-[#FAF9F6]">Include Comp-Set Gap Audit</span>
          </label>
        </div>

        {/* Report Sections Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 1 & 2</span>
            <h4 className="font-bold text-[#FAF9F6]">Executive Briefing & KPIs</h4>
            <p className="text-[#9EA3AE] leading-relaxed">
              Composite Reputation Index (0–100), weighted 4-factor formula breakdown, and sample velocity tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 3</span>
            <h4 className="font-bold text-[#FAF9F6]">7-Dimension ABSA Audit</h4>
            <p className="text-[#9EA3AE] leading-relaxed">
              Touchpoint ratings for Food, Staff, Cleanliness, Safety, Value, Location, and Amenities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
            <span className="font-mono text-[#D7BFA1] font-semibold uppercase text-[10px]">Section 4 & 5</span>
            <h4 className="font-bold text-[#FAF9F6]">Root Causes & Action Plan</h4>
            <p className="text-[#9EA3AE] leading-relaxed">
              Clustered operational failure modes with frequency counts, severity index, and assigned department remedies.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9EA3AE] font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Format: High-Resolution Vector PDF (ReportLab Engine on Python FastAPI)</span>
          </div>
          <span className="text-emerald-400 font-semibold">Ready for Board Presentation</span>
        </div>
      </div>

      {/* ── REPORT ARCHIVE HISTORY ── */}
      <div className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4 shadow-xl">
        <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Historical Archived Dossiers</h3>

        <div className="space-y-2.5">
          {archiveReports.map((r) => (
            <div key={r.id} className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-[#D7BFA1]" />
                <div>
                  <h4 className="font-semibold text-[#FAF9F6]">{r.title}</h4>
                  <span className="text-[10px] font-mono text-[#9EA3AE]">Compiled on {r.date} · {r.pages} Pages · {r.size}</span>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#14171D] hover:bg-[#1C2028] border border-[#30343B] text-xs font-mono text-[#FAF9F6] self-start sm:self-auto transition"
              >
                <Download className="w-3.5 h-3.5 text-[#E16B42]" />
                <span>Download Again</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
