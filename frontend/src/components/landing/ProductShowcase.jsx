import React, { useState } from 'react';
import { LayoutDashboard, ShieldCheck, Flame, TrendingUp, Users, ArrowRight } from 'lucide-react';

const SHOWCASE_TABS = [
  {
    id: 'overview',
    title: 'Command Dashboard',
    icon: LayoutDashboard,
    badge: 'CRI BENCHMARK',
    desc: 'Executive dashboard tracking Composite Reputation Index (CRI), factor attribution, and active operational thresholds.',
    preview: {
      score: "92.4",
      trend: "IMPROVING",
      rating: "4.7 / 5.0",
      sentiment: "94.2% Positive"
    }
  },
  {
    id: 'aspects',
    title: 'Departmental Attribution',
    icon: ShieldCheck,
    badge: 'TOUCHPOINT ABSA',
    desc: 'Aspect-Based Sentiment Analysis mapping guest sentiment across Food & Beverage, Front Office, Housekeeping, and Facilities.',
    preview: {
      score: "96% Food",
      trend: "92% Cleanliness",
      rating: "88% Staff",
      sentiment: "95% Location"
    }
  },
  {
    id: 'diagnostics',
    title: 'Root Cause Diagnostics',
    icon: Flame,
    badge: 'FAILURE MODES',
    desc: 'Identifies recurring operational defects and assigns prescriptive Standard Operating Procedure (SOP) remedies.',
    preview: {
      score: "14x Peak Queue",
      trend: "8x AC Maintenance",
      rating: "6x Linen Audit",
      sentiment: "+4.2 pt Recovery"
    }
  },
  {
    id: 'forecasting',
    title: 'Predictive Horizon',
    icon: TrendingUp,
    badge: 'PROPHET / ARIMA',
    desc: 'Time-series forecasts projecting 30, 60, and 90-day score trajectories with 95% confidence intervals.',
    preview: {
      score: "93.8 (30d)",
      trend: "94.6 (60d)",
      rating: "95.4 (90d)",
      sentiment: "Ensemble Fit"
    }
  }
];

export default function ProductShowcase({ onEnterDashboard }) {
  const [activeTab, setActiveTab] = useState(SHOWCASE_TABS[0]);

  return (
    <section className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>07 / Product Showcase</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Designed for clarity. <br />
            <span className="font-serif italic text-[#D7BFA1]">Built for leadership.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            Every screen combines the visual poise of an editorial publication with the uncompromising density expected from financial intelligence platforms.
          </p>
        </div>

        {/* Tabbed Interactive Showcase Container */}
        <div className="rounded-3xl bg-[#14171D] border border-[#30343B] p-6 sm:p-10 space-y-8 shadow-2xl">
          
          {/* Tabs Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SHOWCASE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#1C2028] border-[#E16B42] shadow-lg shadow-[#E16B42]/10'
                      : 'bg-[#0B0D12] border-[#22262E] hover:border-[#30343B]'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-[#E16B42]' : 'text-[#9EA3AE]'}`} />
                  <div className="font-display font-semibold text-xs sm:text-sm text-[#FAF9F6]">{tab.title}</div>
                  <div className="text-[10px] font-mono text-[#D7BFA1] mt-0.5">{tab.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Preview Surface */}
          <div className="rounded-2xl bg-[#0B0D12] border border-[#22262E] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22262E]">
              <div>
                <h4 className="font-display font-bold text-lg text-[#FAF9F6]">{activeTab.title}</h4>
                <p className="text-xs text-[#9EA3AE] mt-1">{activeTab.desc}</p>
              </div>
              <button
                onClick={onEnterDashboard}
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#E16B42] hover:text-[#EE7E57] font-semibold"
              >
                <span>Launch in Live Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Micro Dashboard Preview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B]">
                <span className="text-[10px] font-mono text-[#9EA3AE] uppercase">Key Indicator</span>
                <div className="font-display font-bold text-lg text-[#FAF9F6] mt-1">{activeTab.preview.score}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B]">
                <span className="text-[10px] font-mono text-[#9EA3AE] uppercase">Momentum</span>
                <div className="font-display font-bold text-lg text-emerald-400 mt-1">{activeTab.preview.trend}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B]">
                <span className="text-[10px] font-mono text-[#9EA3AE] uppercase">Rating / Horizon</span>
                <div className="font-display font-bold text-lg text-amber-400 mt-1">{activeTab.preview.rating}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14171D] border border-[#30343B]">
                <span className="text-[10px] font-mono text-[#9EA3AE] uppercase">Statistical Confidence</span>
                <div className="font-display font-bold text-lg text-[#D7BFA1] mt-1">{activeTab.preview.sentiment}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
