import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Flame, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  FileText, 
  Building2, 
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Download,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout({
  activeTab,
  setActiveTab,
  entities,
  selectedEntityId,
  setSelectedEntityId,
  onBackToLanding,
  onOpenReviewModal,
  onDownloadReport,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [
        { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
        { id: "reviews", label: "Verified Reviews", icon: MessageSquare },
      ]
    },
    {
      group: "DEPARTMENTAL ANALYTICS",
      items: [
        { id: "aspects", label: "Touchpoint Attribution", icon: ShieldCheck },
        { id: "rootcauses", label: "Failure Mode Diagnostics", icon: Flame, badge: "DIAGNOSTIC" },
        { id: "forecasting", label: "Predictive Horizons", icon: TrendingUp },
      ]
    },
    {
      group: "MARKET INTELLIGENCE",
      items: [
        { id: "competitors", label: "Comp-Set Benchmarking", icon: Users },
      ]
    },
    {
      group: "GOVERNANCE",
      items: [
        { id: "reports", label: "Executive Dossiers", icon: FileText },
      ]
    }
  ];

  const selectedEntity = entities.find(e => e.id === selectedEntityId) || { name: "Taj Coromandel Chennai", city: "Chennai" };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F5F1EA] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#14171D] border-r border-[#30343B] flex flex-col justify-between
        transform transition-transform duration-300 md:static md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#30343B]/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#E16B42] flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-[#E16B42]/20">
              T
            </div>
            <div>
              <div className="font-display font-bold text-base text-[#FAF9F6]">TRIP</div>
              <div className="text-[10px] font-mono text-[#9EA3AE]">Enterprise Dashboard</div>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-[#9EA3AE] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1.5">
              <div className="px-3 text-[10px] font-mono tracking-widest text-[#9EA3AE] uppercase">
                {grp.group}
              </div>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#E16B42] text-white font-semibold shadow-lg shadow-[#E16B42]/20'
                        : 'text-[#9EA3AE] hover:bg-[#1C2028] hover:text-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isActive ? 'bg-white text-[#E16B42]' : 'bg-[#E16B42]/20 text-[#E16B42]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#30343B]/80 space-y-2">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-[#0B0D12] hover:bg-[#1C2028] border border-[#30343B] text-xs font-mono text-[#D7BFA1] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Platform Overview</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Operational Bar */}
        <header className="h-16 bg-[#14171D]/90 backdrop-blur border-b border-[#30343B] px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#9EA3AE] hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Property Selector */}
            <div className="flex items-center space-x-2 bg-[#0B0D12] border border-[#30343B] rounded-lg px-3 py-1.5 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5 text-[#E16B42]" />
              <select
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(Number(e.target.value))}
                className="bg-transparent text-[#FAF9F6] focus:outline-none cursor-pointer pr-2 font-medium"
              >
                {entities.map(e => (
                  <option key={e.id} value={e.id} className="bg-[#14171D] text-[#FAF9F6]">
                    {e.name} ({e.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenReviewModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#E16B42] hover:bg-[#EE7E57] text-white text-xs font-semibold shadow-md shadow-[#E16B42]/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ingest Review</span>
            </button>

            <button
              onClick={onDownloadReport}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1C2028] hover:bg-[#30343B] border border-[#30343B] text-[#FAF9F6] text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5 text-[#D7BFA1]" />
              <span>Export PDF</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

      </div>

    </div>
  );
}
