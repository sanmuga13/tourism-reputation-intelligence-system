import React, { useState, useEffect } from 'react';
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
  X,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Settings,
  PanelLeftClose,
  PanelLeft,
  User,
  CheckCircle2,
  AlertTriangle,
  Award
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [
        { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
        { id: "reviews", label: "Review Intelligence", icon: MessageSquare },
      ]
    },
    {
      group: "DEPARTMENTAL ANALYTICS",
      items: [
        { id: "aspects", label: "Aspect Analysis", icon: ShieldCheck },
        { id: "rootcauses", label: "Root Cause Explorer", icon: Flame, badge: "AI FLAGSHIP" },
        { id: "reputation", label: "Reputation Score", icon: Award },
        { id: "forecasting", label: "Forecasting Horizons", icon: TrendingUp },
      ]
    },
    {
      group: "MARKET INTELLIGENCE",
      items: [
        { id: "competitors", label: "Competitor Intelligence", icon: Users },
      ]
    },
    {
      group: "GOVERNANCE",
      items: [
        { id: "reports", label: "Executive Reports", icon: FileText },
        { id: "settings", label: "Platform Settings", icon: Settings },
      ]
    }
  ];

  const selectedEntity = entities.find(e => e.id === selectedEntityId) || { 
    name: "Taj Hotel Chennai", 
    city: "Chennai" 
  };

  const notificationList = [
    { id: 1, title: "HVAC Condensation Alert", time: "2h ago", unread: true, aspect: "Amenities" },
    { id: 2, title: "Saturday Check-in Rush Logged", time: "5h ago", unread: true, aspect: "Staff" },
    { id: 3, title: "Monthly PDF Dossier Generated", time: "1d ago", unread: false, aspect: "Governance" }
  ];

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F5F1EA] flex flex-col md:flex-row font-sans">
      
      {/* ── SIDEBAR NAVIGATION (shadcn sidebar-07 style) ─────────────────── */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-[#14171D] border-r border-[#30343B] flex flex-col justify-between
          transform transition-all duration-300 md:static md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
          ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#30343B]/80 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E16B42] to-[#D7BFA1] flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-[#E16B42]/20 shrink-0">
              T
            </div>
            {!sidebarCollapsed && (
              <div className="truncate">
                <div className="font-display font-bold text-base text-[#FAF9F6]">TRIP</div>
                <div className="text-[10px] font-mono text-[#9EA3AE]">Enterprise Intelligence</div>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button (Desktop) */}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-[#9EA3AE] hover:text-white hover:bg-[#1C2028] transition"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <PanelLeft className="w-4 h-4 text-[#D7BFA1]" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Close Button (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-[#9EA3AE] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 text-[9px] font-mono tracking-widest text-[#9EA3AE] uppercase mb-1">
                  {grp.group}
                </div>
              )}
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
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#E16B42] text-white font-semibold shadow-lg shadow-[#E16B42]/20'
                        : 'text-[#9EA3AE] hover:bg-[#1C2028] hover:text-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#D7BFA1]'}`} />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.badge && (
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold ${
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
        <div className="p-3 border-t border-[#30343B]/80 space-y-2">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-[#0B0D12] hover:bg-[#1C2028] border border-[#30343B] text-xs font-mono text-[#D7BFA1] transition"
            title="Return to Landing Overview"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>Return to Overview</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT WORKSPACE ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Command Bar */}
        <header className="h-16 bg-[#14171D]/90 backdrop-blur-md border-b border-[#30343B] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 gap-4">
          
          {/* Left: Mobile Toggle & Property Switcher */}
          <div className="flex items-center space-x-3 shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#9EA3AE] hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Property Selector */}
            <div className="flex items-center space-x-2 bg-[#0B0D12] border border-[#30343B] rounded-xl px-3 py-1.5 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5 text-[#E16B42]" />
              <select
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(Number(e.target.value))}
                className="bg-transparent text-[#FAF9F6] focus:outline-none cursor-pointer pr-1 font-medium text-xs"
              >
                {entities.map(e => (
                  <option key={e.id} value={e.id} className="bg-[#14171D] text-[#FAF9F6]">
                    {e.name} ({e.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Selector */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-[#0B0D12] border border-[#30343B] rounded-xl px-2.5 py-1.5 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#D7BFA1]" />
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="bg-transparent text-[#9EA3AE] focus:outline-none cursor-pointer text-xs"
              >
                <option value="30d" className="bg-[#14171D] text-[#FAF9F6]">Past 30 Days</option>
                <option value="60d" className="bg-[#14171D] text-[#FAF9F6]">Past 60 Days</option>
                <option value="90d" className="bg-[#14171D] text-[#FAF9F6]">Past 90 Days</option>
                <option value="ytd" className="bg-[#14171D] text-[#FAF9F6]">Year to Date</option>
              </select>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-2">
            <Search className="w-3.5 h-3.5 text-[#9EA3AE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search reviews, failure modes, touchpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0D12] border border-[#22262E] focus:border-[#E16B42] rounded-xl pl-9 pr-14 py-1.5 text-xs text-[#FAF9F6] focus:outline-none transition"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#9EA3AE] bg-[#14171D] px-1.5 py-0.5 rounded border border-[#22262E]">
              ⌘K
            </span>
          </div>

          {/* Right: Notifications, Actions, and GM Profile */}
          <div className="flex items-center space-x-2.5 shrink-0">
            
            {/* Functional Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-[#0B0D12] border border-[#30343B] text-[#9EA3AE] hover:text-[#FAF9F6] relative transition"
                title="Active Operational Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-[#E16B42] absolute top-1.5 right-1.5" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#14171D] border border-[#30343B] shadow-2xl p-4 space-y-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#22262E]">
                    <span className="font-display font-bold text-xs text-[#FAF9F6]">Threshold Alerts</span>
                    <span className="text-[10px] font-mono text-[#E16B42]">2 New</span>
                  </div>
                  <div className="space-y-2">
                    {notificationList.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-[#0B0D12] border border-[#22262E] text-xs space-y-0.5">
                        <div className="flex justify-between font-semibold text-[#FAF9F6]">
                          <span>{n.title}</span>
                          <span className="text-[10px] font-mono text-[#9EA3AE]">{n.time}</span>
                        </div>
                        <span className="text-[10px] text-[#D7BFA1] font-mono block">Division: {n.aspect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ingest Review Action */}
            <button
              onClick={onOpenReviewModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#E16B42] hover:bg-[#EE7E57] text-white text-xs font-semibold shadow-md shadow-[#E16B42]/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ingest Review</span>
            </button>

            {/* Export PDF Dossier */}
            <button
              onClick={onDownloadReport}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1C2028] hover:bg-[#30343B] border border-[#30343B] text-[#FAF9F6] text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5 text-[#D7BFA1]" />
              <span>Export PDF</span>
            </button>

            {/* Manager Avatar */}
            <div className="hidden xl:flex items-center space-x-2 pl-2 border-l border-[#30343B]">
              <div className="w-7 h-7 rounded-lg bg-[#E16B42]/20 border border-[#E16B42]/40 flex items-center justify-center text-xs font-bold text-[#E16B42]">
                GM
              </div>
              <div className="text-[11px] font-mono leading-tight">
                <span className="text-[#FAF9F6] font-semibold block">General Manager</span>
                <span className="text-emerald-400 text-[10px]">Active Session</span>
              </div>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

      </div>

    </div>
  );
}
