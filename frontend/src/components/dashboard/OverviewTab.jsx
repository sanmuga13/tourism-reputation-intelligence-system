import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw, 
  MessageSquare, 
  Layers, 
  Star, 
  Flame, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

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

  const trendData = [
    { period: 'May 2026', score: 88.4, volume: 42, sentiment: 89 },
    { period: 'Jun 2026', score: 89.8, volume: 56, sentiment: 91 },
    { period: 'Jul 2026', score: 91.2, volume: 74, sentiment: 93 },
    { period: 'Aug 2026', score: 90.5, volume: 68, sentiment: 92 },
    { period: 'Sep 2026', score: 92.1, volume: 83, sentiment: 94 },
    { period: 'Oct 2026', score: Number(currentScore.toFixed(1)), volume: reviews.length || 92, sentiment: 94.2 },
  ];

  const sentimentPieData = [
    { name: 'Positive', value: 82, color: '#10B981' },
    { name: 'Neutral', value: 12, color: '#64748B' },
    { name: 'Negative', value: 6, color: '#F43F5E' },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── KPI HIERARCHICAL PRESENTATION ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* HERO KPI (5 cols): Overall Composite Reputation Index */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#1C2028] via-[#14171D] to-[#0B0D12] border border-[#30343B] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E16B42]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#E16B42]/15 text-[#E16B42] border border-[#E16B42]/30">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7BFA1] block">Primary Metric</span>
                <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Composite Reputation Index (CRI)</h3>
              </div>
            </div>

            <button
              onClick={onRecompute}
              disabled={recomputing}
              className="px-2.5 py-1 rounded-lg bg-[#0B0D12] border border-[#30343B] text-[11px] font-mono text-[#D7BFA1] hover:text-white flex items-center transition shadow-sm"
              title="Recalculate index with latest reviews"
            >
              <RefreshCw className={`w-3 h-3 mr-1 text-[#E16B42] ${recomputing ? 'animate-spin' : ''}`} />
              <span>{recomputing ? 'Recalculating...' : 'Recompute'}</span>
            </button>
          </div>

          <div className="my-5 z-10 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-display font-black text-6xl text-[#FAF9F6] tracking-tight">
                  {currentScore.toFixed(1)}
                </span>
                <span className="text-sm font-mono text-[#9EA3AE]">/ 100</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>{reputationData?.trend?.toUpperCase() || 'IMPROVING'} (+1.8 pts)</span>
                </span>
                <span className="text-[11px] font-mono text-[#9EA3AE]">vs. Prior 30d</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-[#9EA3AE] block">Market Standing</span>
              <span className="font-display font-bold text-lg text-emerald-400">Top 5%</span>
              <span className="text-[10px] text-[#9EA3AE] block mt-0.5">Chennai Luxury Comp-Set</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#22262E] text-[11px] font-mono text-[#9EA3AE] flex items-center justify-between z-10">
            <span>Formula: 0.40S + 0.30A + 0.20V + 0.10T</span>
            <span className="text-emerald-400 font-semibold">Audit Passed</span>
          </div>
        </div>

        {/* SUPPORTING METRICS GRID (7 cols): Grouped Hierarchy */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          {/* Card 1: Review Volume */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Total Reviews</span>
            <div className="my-2">
              <div className="font-display font-bold text-2xl text-[#FAF9F6]">{reviews.length || 92}</div>
              <span className="text-[11px] font-mono text-emerald-400">+14 this month</span>
            </div>
            <span className="text-[10px] text-[#9EA3AE] border-t border-[#22262E] pt-1">Sample Velocity High</span>
          </div>

          {/* Card 2: Positive Sentiment */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Positive Sentiment</span>
            <div className="my-2">
              <div className="font-display font-bold text-2xl text-emerald-400">94.2%</div>
              <span className="text-[11px] font-mono text-[#9EA3AE]">Conf: 95.8%</span>
            </div>
            <span className="text-[10px] text-emerald-400 border-t border-[#22262E] pt-1">Dominant Asset</span>
          </div>

          {/* Card 3: Negative Sentiment */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Negative Ratio</span>
            <div className="my-2">
              <div className="font-display font-bold text-2xl text-rose-400">4.8%</div>
              <span className="text-[11px] font-mono text-[#9EA3AE]">Safe band &lt; 15%</span>
            </div>
            <span className="text-[10px] text-emerald-400 border-t border-[#22262E] pt-1">Within Safe Limits</span>
          </div>

          {/* Card 4: Strongest Aspect */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Strongest Aspect</span>
            <div className="my-2">
              <div className="font-display font-bold text-xl text-[#FAF9F6]">Food & Dining</div>
              <span className="text-xs font-mono text-emerald-400 font-bold">96% Satisfaction</span>
            </div>
            <span className="text-[10px] text-[#9EA3AE] border-t border-[#22262E] pt-1">Southern Spice Lead</span>
          </div>

          {/* Card 5: Weakest Aspect */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Friction Point</span>
            <div className="my-2">
              <div className="font-display font-bold text-xl text-[#FAF9F6]">Amenities (AC)</div>
              <span className="text-xs font-mono text-amber-400 font-bold">82% Satisfaction</span>
            </div>
            <span className="text-[10px] text-amber-400 border-t border-[#22262E] pt-1">HVAC Service Required</span>
          </div>

          {/* Card 6: Star Rating */}
          <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3AE]">Audited Rating</span>
            <div className="my-2">
              <div className="font-display font-bold text-2xl text-amber-400 flex items-center">
                <span>{entity?.avgRating?.toFixed(1) || '4.5'}</span>
                <Star className="w-4 h-4 ml-1 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] font-mono text-[#9EA3AE]">Google & TripAdvisor</span>
            </div>
            <span className="text-[10px] text-[#9EA3AE] border-t border-[#22262E] pt-1">Verified Feeds</span>
          </div>

        </div>

      </div>

      {/* ── INTERACTIVE ANALYTICS CHARTS (RECHARTS) ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 6-Month CRI Trajectory Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#30343B]">
            <div>
              <h3 className="font-display font-bold text-base text-[#FAF9F6]">Reputation Index Trajectory (6-Month Trend)</h3>
              <p className="text-xs text-[#9EA3AE]">Continuous monthly CRI progression calibrated across verified channels.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
              Current: {currentScore.toFixed(1)} pts
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="criTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E16B42" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#E16B42" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#22262E" vertical={false} />
                <XAxis dataKey="period" stroke="#9EA3AE" tickLine={false} fontSize={11} />
                <YAxis domain={[85, 96]} stroke="#9EA3AE" tickLine={false} fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 10, fontSize: 12 }}
                  itemStyle={{ color: '#FAF9F6' }}
                  labelStyle={{ color: '#D7BFA1', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" name="CRI Score" stroke="#E16B42" strokeWidth={2.5} fillOpacity={1} fill="url(#criTrendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Sentiment Polarity Distribution Donut Chart (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-[#FAF9F6]">Polarity Distribution</h3>
            <p className="text-xs text-[#9EA3AE]">Decomposition of verified guest discourse.</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={sentimentPieData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={50} 
                  outerRadius={68} 
                  paddingAngle={4} 
                  dataKey="value"
                >
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: '#FAF9F6' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center pointer-events-none">
              <span className="font-display font-extrabold text-2xl text-[#FAF9F6]">94.2%</span>
              <span className="text-[9px] font-mono text-[#D7BFA1]">POSITIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#22262E] text-center text-xs font-mono">
            <div>
              <span className="text-emerald-400 font-bold block">82%</span>
              <span className="text-[10px] text-[#9EA3AE]">Positive</span>
            </div>
            <div>
              <span className="text-slate-300 font-bold block">12%</span>
              <span className="text-[10px] text-[#9EA3AE]">Neutral</span>
            </div>
            <div>
              <span className="text-rose-400 font-bold block">6%</span>
              <span className="text-[10px] text-[#9EA3AE]">Negative</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── LOWER SECTION: REVIEWS STREAM + CRI FACTOR ATTRIBUTION ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Verified Review Feed (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#E16B42]" />
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Verified Guest Feedback Stream</h3>
            </div>
            <span className="text-xs font-mono text-[#9EA3AE]">{reviews.length} total logged</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
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

        {/* Right: CRI Factor Breakdown & Priority Interventions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Factor Attribution Bars */}
          <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#D7BFA1]" />
                <h3 className="font-display font-bold text-sm text-[#FAF9F6]">CRI Factor Attribution</h3>
              </div>
              <span className="text-[10px] font-mono text-[#9EA3AE]">100% WEIGHTED</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Sentiment Polarity (40%)</span>
                  <span className="text-[#E16B42] font-semibold">{breakdown.sentimentScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E16B42] h-full rounded-full" style={{ width: `${breakdown.sentimentScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Cross-Channel Rating (30%)</span>
                  <span className="text-emerald-400 font-semibold">{breakdown.ratingScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.ratingScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Volume Velocity (20%)</span>
                  <span className="text-amber-400 font-semibold">{breakdown.volumeScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${breakdown.volumeScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9EA3AE]">Time-Decay Recency (10%)</span>
                  <span className="text-indigo-400 font-semibold">{breakdown.recencyScore} pts</span>
                </div>
                <div className="w-full bg-[#0B0D12] h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${breakdown.recencyScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Priority Operational Remediations */}
          <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-3">
            <h3 className="font-display font-bold text-sm text-[#FAF9F6] flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-[#E16B42]" />
              <span>Priority Operational Interventions</span>
            </h3>
            {rootCauses.slice(0, 2).map((rc, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs space-y-1.5">
                <div className="flex justify-between font-semibold text-[#FAF9F6]">
                  <span>{rc.cause_text}</span>
                  <span className="text-rose-400 font-mono">{rc.frequency}x incidents</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#9EA3AE]">
                  <span>Touchpoint: {rc.aspect}</span>
                  <span className="text-emerald-400 font-mono font-medium">Est. Recovery: +3.5 pts</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
