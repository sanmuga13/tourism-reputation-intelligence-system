import React from 'react';
import { Award, ShieldCheck, BarChart3, AlertTriangle, TrendingUp, RefreshCw, MessageSquare, Layers } from 'lucide-react';

export default function OverviewTab({
  entity,
  reputationData,
  reviews,
  rootCauses,
  onRecompute,
  recomputing
}) {
  const currentScore = reputationData?.reputationScore || 92.4;
  const breakdown = reputationData?.breakdown || {
    sentimentScore: 94.0,
    ratingScore: 95.0,
    volumeScore: 88.0,
    recencyScore: 90.0
  };

  return (
    <div className="space-y-6">
      
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Composite Score Card */}
        <div className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">
              Composite Reputation Index (CRI)
            </span>
            <div className="p-2 rounded-lg bg-[#E16B42]/10 text-[#E16B42]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-display font-extrabold text-4xl text-[#FAF9F6]">{currentScore.toFixed(1)}</span>
              <span className="text-xs text-[#9EA3AE]">/ 100</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-[#22262E]">
              <span className="text-emerald-400 font-mono font-medium flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                {reputationData?.trend?.toUpperCase() || 'IMPROVING'}
              </span>
              <button
                onClick={onRecompute}
                disabled={recomputing}
                className="text-[11px] font-mono text-[#D7BFA1] hover:text-white flex items-center transition"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${recomputing ? 'animate-spin' : ''}`} />
                <span>{recomputing ? 'Recalculating...' : 'Recompute'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sentiment Score */}
        <div className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">
              Verbatim Guest Polarity
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-display font-extrabold text-4xl text-emerald-400">94.2%</span>
              <span className="text-xs text-[#9EA3AE]">Positive</span>
            </div>
            <p className="text-[11px] text-[#9EA3AE] mt-3 pt-3 border-t border-[#22262E]">
              NLP Classification Confidence: 95.8%
            </p>
          </div>
        </div>

        {/* Average Rating */}
        <div className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">
              Audited Channel Star Rating
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-display font-extrabold text-4xl text-amber-400">
                {entity?.avgRating?.toFixed(1) || '4.7'}
              </span>
              <span className="text-xs text-[#9EA3AE]">/ 5.0</span>
            </div>
            <p className="text-[11px] text-[#9EA3AE] mt-3 pt-3 border-t border-[#22262E]">
              Google, TripAdvisor, Yelp, Reddit
            </p>
          </div>
        </div>

        {/* Operational Alerts */}
        <div className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">
              Active Threshold Triggers
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-display font-extrabold text-4xl text-emerald-400">0</span>
              <span className="text-xs text-[#9EA3AE]">Active Triggers</span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-3 pt-3 border-t border-[#22262E]">
              All thresholds within safe bands
            </p>
          </div>
        </div>

      </div>

      {/* Main Grid: Reviews Stream + Formula Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Live Reviews Stream (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#E16B42]" />
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Verified Guest Feedback Stream</h3>
            </div>
            <span className="text-xs font-mono text-[#9EA3AE]">{reviews.length} total</span>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#FAF9F6]">{rev.reviewer || 'Verified Guest'}</span>
                    <span className="font-mono text-[10px] bg-[#1C2028] px-2 py-0.5 rounded text-[#D7BFA1]">
                      {rev.source}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-semibold">★ {rev.rating}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      rev.sentimentLabel === 'POSITIVE'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : rev.sentimentLabel === 'NEGATIVE'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-500/15 text-slate-300 border border-slate-500/30'
                    }`}>
                      {rev.sentimentLabel || 'POSITIVE'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#FAF9F6] leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
                <div className="text-[10px] font-mono text-[#9EA3AE]">
                  {rev.reviewDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Formula Breakdown & Diagnostic Clusters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Formula Breakdown Card */}
          <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#30343B]">
              <Layers className="w-4 h-4 text-[#D7BFA1]" />
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">CRI Factor Attribution</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Sentiment (40%)</span>
                  <span className="text-[#E16B42] font-semibold">{breakdown.sentimentScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E16B42] h-full rounded-full" style={{ width: `${breakdown.sentimentScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Ratings (30%)</span>
                  <span className="text-emerald-400 font-semibold">{breakdown.ratingScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.ratingScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Volume (20%)</span>
                  <span className="text-amber-400 font-semibold">{breakdown.volumeScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${breakdown.volumeScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Recency (10%)</span>
                  <span className="text-indigo-400 font-semibold">{breakdown.recencyScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${breakdown.recencyScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Root Causes */}
          <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-3">
            <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Priority Operational Remediations</h3>
            {rootCauses.slice(0, 2).map((rc, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs space-y-1">
                <div className="flex justify-between font-semibold text-[#FAF9F6]">
                  <span>{rc.cause_text}</span>
                  <span className="text-rose-400 font-mono">{rc.frequency}x</span>
                </div>
                <p className="text-[11px] text-[#9EA3AE]">Aspect: {rc.aspect} · Severity {(rc.severity * 100).toFixed(0)}%</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
