import React from 'react';
import { Database, Server, Cpu, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ArchitectureDiagram() {
  const steps = [
    {
      step: "01",
      icon: Globe,
      title: "Data Sources",
      tech: "Multi-Source Ingestion",
      desc: "Google Places, Yelp API, Reddit, TripAdvisor & Kaggle CSV review feeds."
    },
    {
      step: "02",
      icon: Server,
      title: "Core Backend",
      tech: "Spring Boot 3 · Java 21",
      desc: "Enterprise REST APIs, relational ORM, reputation scoring & scheduled jobs."
    },
    {
      step: "03",
      icon: Cpu,
      title: "AI / NLP Microservice",
      tech: "Python 3.11 · FastAPI",
      desc: "BERT sentiment classifier, 7-aspect ABSA, topic clustering & Prophet forecasting."
    },
    {
      step: "04",
      icon: Database,
      title: "Persistence Layer",
      tech: "PostgreSQL 15+",
      desc: "Relational integrity, historical score tracking, time-series intervals & alerts."
    },
    {
      step: "05",
      icon: ShieldCheck,
      title: "Executive Interface",
      tech: "React 18 · Vite · Tailwind",
      desc: "Cinematic digital intelligence platform & enterprise dashboard."
    }
  ];

  return (
    <section id="architecture" className="py-28 px-6 sm:px-12 bg-[#0B0D12] border-t border-[#30343B]/40 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#E16B42] uppercase">
            <span>06 / Technical Architecture</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] tracking-tight leading-tight">
            Engineered for <br />
            <span className="font-serif italic text-[#D7BFA1]">enterprise scale & precision.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3AE] font-light leading-relaxed">
            An enterprise multi-tier architecture decoupling high-throughput ingestion from NLP inferencing, ensuring sub-second response times, transactional persistence, and automated index recalculation.
          </p>
        </div>

        {/* Architecture Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.step} 
                className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] flex flex-col justify-between space-y-4 hover:border-[#E16B42]/50 transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9EA3AE]">
                    <span className="text-[#E16B42] font-semibold">{st.step}</span>
                    <Icon className="w-5 h-5 text-[#FAF9F6] group-hover:text-[#E16B42] transition" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#FAF9F6]">{st.title}</h3>
                  <div className="text-[11px] font-mono text-[#D7BFA1] bg-[#0B0D12] px-2 py-1 rounded inline-block">
                    {st.tech}
                  </div>
                </div>

                <p className="text-xs text-[#9EA3AE] leading-relaxed pt-3 border-t border-[#22262E]">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
