import React, { useState, useEffect } from 'react';
import { Send, Server, Cpu, Database, CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

const STAGES = [
  {
    step: 1,
    title: "1. Data Ingestion",
    tech: "REST / Webhook",
    desc: "Raw review text, star rating & source metadata received.",
    icon: Send,
    color: "#E16B42"
  },
  {
    step: 2,
    title: "2. Spring Boot Core",
    tech: "Java 21 · Port 8080",
    desc: "Entity validated, review saved & async dispatch initiated.",
    icon: Server,
    color: "#D7BFA1"
  },
  {
    step: 3,
    title: "3. AI / NLP Engine",
    tech: "Python FastAPI · Port 8000",
    desc: "BERT sentiment polarity & 7-aspect ABSA extraction.",
    icon: Cpu,
    color: "#60A5FA"
  },
  {
    step: 4,
    title: "4. Database Persistence",
    tech: "PostgreSQL / H2",
    desc: "Sentiment & AspectScore tables written with timestamp.",
    icon: Database,
    color: "#34D399"
  },
  {
    step: 5,
    title: "5. Real-Time Index Update",
    tech: "Reputation Engine",
    desc: "Composite Reputation Index (CRI) recalculated & synchronized with live state.",
    icon: CheckCircle2,
    color: "#22C55E"
  }
];

export default function IngestPipelineAnimation({ currentStep = 1, isSimulating = false }) {
  const [activeStage, setActiveStage] = useState(currentStep);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setActiveStage((prev) => (prev < 5 ? prev + 1 : 1));
      }, 1400);
      return () => clearInterval(interval);
    } else {
      setActiveStage(currentStep);
    }
  }, [currentStep, isSimulating]);

  return (
    <div className="w-full bg-[#0B0D12] border border-[#30343B] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#22262E]">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#E16B42] animate-pulse" />
          <span className="font-display font-bold text-xs uppercase tracking-wider text-[#FAF9F6]">
            Real-Time Ingestion Pipeline Flow
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#D7BFA1] bg-[#14171D] px-2 py-0.5 rounded border border-[#22262E]">
          Stage {activeStage} of 5
        </span>
      </div>

      {/* Pipeline Stages Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
        {STAGES.map((st) => {
          const Icon = st.icon;
          const isPassed = activeStage > st.step;
          const isCurrent = activeStage === st.step;

          return (
            <div
              key={st.step}
              className={`p-3 rounded-xl border transition-all duration-500 relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#1C2028] border-[#E16B42] shadow-lg shadow-[#E16B42]/15 scale-[1.02]'
                  : isPassed
                  ? 'bg-[#14171D] border-emerald-500/40 opacity-90'
                  : 'bg-[#0B0D12] border-[#22262E] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${
                  isCurrent ? 'text-[#E16B42]' : isPassed ? 'text-emerald-400' : 'text-[#9EA3AE]'
                }`}>
                  0{st.step}
                </span>
                <div className={`p-1.5 rounded-lg ${
                  isCurrent ? 'bg-[#E16B42]/20 text-[#E16B42]' : isPassed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#1C2028] text-[#9EA3AE]'
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'animate-bounce' : ''}`} />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-semibold text-[11px] text-[#FAF9F6] leading-tight">
                  {st.title}
                </h4>
                <div className="text-[9px] font-mono text-[#D7BFA1] truncate">
                  {st.tech}
                </div>
                <p className="text-[9px] text-[#9EA3AE] leading-tight pt-1">
                  {st.desc}
                </p>
              </div>

              {/* Status pulse dot */}
              {isCurrent && (
                <div className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E16B42] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E16B42]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
