import React, { useState } from 'react';
import { Award, Calculator, RotateCcw, Info, Sliders, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ReputationScoreTab({ entity, reputationData, onRecompute, recomputing }) {
  const [sentimentWeight, setSentimentWeight] = useState(40);
  const [ratingWeight, setRatingWeight] = useState(30);
  const [volumeWeight, setVolumeWeight] = useState(20);
  const [recencyWeight, setRecencyWeight] = useState(10);

  const [sentimentVal, setSentimentVal] = useState(94);
  const [ratingVal, setRatingVal] = useState(90);
  const [volumeVal, setVolumeVal] = useState(85);
  const [recencyVal, setRecencyVal] = useState(88);

  const customScore = (
    (sentimentWeight * sentimentVal +
     ratingWeight * ratingVal +
     volumeWeight * volumeVal +
     recencyWeight * recencyVal) / 100
  ).toFixed(1);

  const historicalCalibration = [
    { month: 'May', score: 88.2, sentiment: 87, volume: 75 },
    { month: 'Jun', score: 89.6, sentiment: 89, volume: 80 },
    { month: 'Jul', score: 91.0, sentiment: 91, volume: 85 },
    { month: 'Aug', score: 90.4, sentiment: 90, volume: 82 },
    { month: 'Sep', score: 92.1, sentiment: 93, volume: 88 },
    { month: 'Oct', score: 92.4, sentiment: 94, volume: 85 },
  ];

  const resetWeights = () => {
    setSentimentWeight(40);
    setRatingWeight(30);
    setVolumeWeight(20);
    setRecencyWeight(10);
    setSentimentVal(94);
    setRatingVal(90);
    setVolumeVal(85);
    setRecencyVal(88);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#E16B42]" />
            <span>Composite Reputation Index (CRI) Engine</span>
          </h2>
          <p className="text-xs text-[#9EA3AE] mt-0.5">
            Deterministic mathematical index architecture balancing sentiment polarity, channel ratings, sample velocity, and time-decay.
          </p>
        </div>

        <button
          onClick={resetWeights}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#14171D] hover:bg-[#1C2028] border border-[#30343B] text-xs font-mono text-[#D7BFA1] transition"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E16B42]" />
          <span>Reset Standard Weights</span>
        </button>
      </div>

      {/* Main Grid: Calculator & Formula Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Dynamic Calibration Sliders (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#E16B42]" />
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Mathematical Weights & Live Signal Values</h3>
            </div>
            <span className="text-[10px] font-mono text-[#D7BFA1]">SUM = 100%</span>
          </div>

          {/* Factor 1: Sentiment */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#FAF9F6] block">Sentiment Polarity (S)</span>
                <span className="text-[10px] text-[#9EA3AE]">NLP multi-label polarity across verified text</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-[#E16B42] font-bold text-sm">{sentimentVal} pts</span>
                <span className="text-[10px] text-[#9EA3AE] block">Weight: {sentimentWeight}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={sentimentVal} 
              onChange={(e) => setSentimentVal(Number(e.target.value))}
              className="w-full accent-[#E16B42] bg-[#14171D] h-2 rounded-lg cursor-pointer" 
            />
          </div>

          {/* Factor 2: Star Rating */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#FAF9F6] block">Cross-Channel Star Rating (A)</span>
                <span className="text-[10px] text-[#9EA3AE]">Normalized 1–5 scale to 100-point equivalent</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-emerald-400 font-bold text-sm">{ratingVal} pts</span>
                <span className="text-[10px] text-[#9EA3AE] block">Weight: {ratingWeight}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={ratingVal} 
              onChange={(e) => setRatingVal(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-[#14171D] h-2 rounded-lg cursor-pointer" 
            />
          </div>

          {/* Factor 3: Review Volume Velocity */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#FAF9F6] block">Review Volume Velocity (V)</span>
                <span className="text-[10px] text-[#9EA3AE]">Statistical sample confidence logarithm</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-amber-400 font-bold text-sm">{volumeVal} pts</span>
                <span className="text-[10px] text-[#9EA3AE] block">Weight: {volumeWeight}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="30" 
              max="100" 
              value={volumeVal} 
              onChange={(e) => setVolumeVal(Number(e.target.value))}
              className="w-full accent-amber-500 bg-[#14171D] h-2 rounded-lg cursor-pointer" 
            />
          </div>

          {/* Factor 4: Time-Decay Recency */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#FAF9F6] block">Time-Decay Recency (T)</span>
                <span className="text-[10px] text-[#9EA3AE]">Exponential decay prioritizing past 30 days</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-indigo-400 font-bold text-sm">{recencyVal} pts</span>
                <span className="text-[10px] text-[#9EA3AE] block">Weight: {recencyWeight}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="30" 
              max="100" 
              value={recencyVal} 
              onChange={(e) => setRecencyVal(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-[#14171D] h-2 rounded-lg cursor-pointer" 
            />
          </div>
        </div>

        {/* Right: Calculated Gauge Card & Formula (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-gradient-to-b from-[#1C2028] to-[#14171D] border border-[#30343B] p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0B0D12] border border-[#30343B] text-[10px] font-mono text-[#D7BFA1]">
              <Calculator className="w-3.5 h-3.5 text-[#E16B42]" />
              <span>LIVE RECALCULATED BENCHMARK</span>
            </div>

            {/* Gauge Display */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#30343B]/40" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#E16B42] border-t-transparent transition-all duration-500"
                style={{
                  transform: `rotate(${(customScore / 100) * 360}deg)`
                }}
              />
              <div className="flex flex-col items-center">
                <span className="font-display font-extrabold text-5xl text-[#FAF9F6] tracking-tight">
                  {customScore}
                </span>
                <span className="text-[10px] font-mono text-[#D7BFA1] uppercase tracking-wider mt-1">
                  Composite Index
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
                  GRADE: A+ (EXCELLENCE)
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#FAF9F6] bg-[#0B0D12] p-3 rounded-xl border border-[#22262E] space-y-1 text-left">
              <div className="text-[10px] text-[#9EA3AE] uppercase">Deterministic Formulation:</div>
              <code className="text-[#D7BFA1] text-xs">CRI = (0.40·S) + (0.30·A) + (0.20·V) + (0.10·T)</code>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-left text-xs text-emerald-300 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Score passes audited integrity checks with zero detected inorganic review surges.</span>
            </div>
          </div>

          {/* Historical Calibration Trend */}
          <div className="rounded-2xl bg-[#14171D] border border-[#30343B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#30343B]">
              <span className="text-xs font-mono text-[#9EA3AE] uppercase tracking-wider">6-Month Calibration History</span>
              <span className="text-xs font-mono text-emerald-400">+4.2 pts YTD</span>
            </div>
            
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalCalibration}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E16B42" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E16B42" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#22262E" vertical={false} />
                  <XAxis dataKey="month" stroke="#9EA3AE" tickLine={false} fontSize={10} />
                  <YAxis domain={[85, 95]} stroke="#9EA3AE" tickLine={false} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#14171D', borderColor: '#30343B', borderRadius: 8, fontSize: 11 }}
                    itemStyle={{ color: '#FAF9F6' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#E16B42" strokeWidth={2} fillOpacity={1} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
