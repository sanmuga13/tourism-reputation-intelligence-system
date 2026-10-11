import React, { useState } from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function ForecastingTab({ forecasts }) {
  const [selectedHorizon, setSelectedHorizon] = useState(30);

  const forecastList = forecasts && forecasts.length > 0 ? forecasts : [
    { days_ahead: 30, target_date: "2026-11-09", predicted_score: 93.8, lower_bound: 91.5, upper_bound: 96.0, model_used: "ensemble" },
    { days_ahead: 60, target_date: "2026-12-09", predicted_score: 94.6, lower_bound: 90.8, upper_bound: 97.4, model_used: "ensemble" },
    { days_ahead: 90, target_date: "2027-01-08", predicted_score: 95.4, lower_bound: 90.0, upper_bound: 98.2, model_used: "ensemble" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
          Predictive Horizons (30 / 60 / 90 Days)
        </h2>
        <p className="text-xs text-[#9EA3AE]">
          Multi-horizon econometric projections based on time-series regression and seasonal guest volume models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecastList.map((f) => (
          <div key={f.days_ahead} className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
              <span className="text-xs font-mono font-bold text-[#E16B42]">
                {f.days_ahead} DAYS AHEAD
              </span>
              <span className="text-[10px] font-mono text-[#D7BFA1]">
                Target: {f.target_date}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#9EA3AE] uppercase">Projected CRI Score</span>
              <div className="font-display font-extrabold text-5xl text-[#FAF9F6] mt-1">
                {f.predicted_score}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs space-y-1">
              <div className="flex justify-between text-[#9EA3AE]">
                <span>Lower Bound (95% CI):</span>
                <span className="font-mono text-[#FAF9F6]">{f.lower_bound}</span>
              </div>
              <div className="flex justify-between text-[#9EA3AE]">
                <span>Upper Bound (95% CI):</span>
                <span className="font-mono text-[#FAF9F6]">{f.upper_bound}</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#9EA3AE]">
              Model: <span className="text-indigo-400 font-semibold">{f.model_used.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] text-xs text-[#9EA3AE] space-y-2">
        <h4 className="font-display font-bold text-sm text-[#FAF9F6]">Model Methodology & Horizon Assumptions</h4>
        <p className="leading-relaxed">
          Predictive horizons synthesize exponential decay, seasonal tourist velocity, and moving average sentiment. Horizon uncertainty expands naturally from ±2.25 pts at 30 days to ±4.10 pts at 90 days.
        </p>
      </div>
    </div>
  );
}
