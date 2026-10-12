import React, { useState, useEffect } from 'react';

const INDEX_ITEMS = [
  { id: 'sentiment', number: '01', title: 'SENTIMENT', desc: 'Aspect-Based Natural Language Intelligence' },
  { id: 'rootcauses', number: '02', title: 'ROOT CAUSES', desc: 'Semantic Topic Complaint Clustering' },
  { id: 'reputation', number: '03', title: 'REPUTATION', desc: 'Composite 0–100 Weighted Mathematical Index' },
  { id: 'forecasts', number: '04', title: 'FORECASTS', desc: '30/60/90-Day Predictive Horizon Modeling' },
  { id: 'competitors', number: '05', title: 'COMPETITORS', desc: 'Multi-Property Dimensional Gap Benchmarking' },
];

export default function FeatureSideIndex({ activeSection = 'sentiment' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col space-y-6 select-none"
      aria-label="Chapter Index"
    >
      <div className="text-[10px] font-mono text-[#9EA3AE] tracking-widest pl-4 uppercase border-l border-[#30343B]">
        Chapter Index
      </div>

      <nav className="flex flex-col space-y-4">
        {INDEX_ITEMS.map((item, idx) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === item.id;

          return (
            <div 
              key={item.id}
              className="relative flex items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollToSection(item.id)}
            >
              {/* Popover Description on Hover */}
              {isHovered && (
                <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-[#14171D] border border-[#30343B] px-3.5 py-2 rounded-lg text-right w-52 shadow-2xl backdrop-blur-md pointer-events-none transition-all duration-300">
                  <div className="text-[10px] font-mono text-[#E16B42] font-semibold">{item.number} / {item.title}</div>
                  <div className="text-xs text-[#FAF9F6] font-medium leading-tight mt-0.5">{item.desc}</div>
                </div>
              )}

              {/* Indicator Line & Label */}
              <div className="flex items-center space-x-3">
                <span className={`text-[11px] font-mono tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-[#E16B42] font-bold' : 'text-[#9EA3AE] group-hover:text-[#FAF9F6]'
                }`}>
                  {item.number}
                </span>

                <span className={`text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'text-[#FAF9F6] font-semibold translate-x-1' 
                    : 'text-[#9EA3AE] group-hover:text-[#FAF9F6]'
                }`}>
                  {item.title}
                </span>

                <div className={`h-[1px] transition-all duration-300 ${
                  isActive ? 'w-8 bg-[#E16B42]' : 'w-3 bg-[#30343B] group-hover:w-5 group-hover:bg-[#9EA3AE]'
                }`} />
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
