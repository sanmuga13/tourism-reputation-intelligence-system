import React, { useState } from 'react';
import { Settings, ShieldCheck, Bell, Server, Database, Save, CheckCircle2, Sliders } from 'lucide-react';

export default function SettingsTab({ entity }) {
  const [thresholdAlert, setThresholdAlert] = useState(15);
  const [minRatingAlert, setMinRatingAlert] = useState(3.5);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00/B00/TRIP_ALERTS');
  const [autoRecompute, setAutoRecompute] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="font-display font-bold text-xl text-[#FAF9F6] flex items-center space-x-2">
          <Settings className="w-5 h-5 text-[#E16B42]" />
          <span>Platform & Operational Governance Settings</span>
        </h2>
        <p className="text-xs text-[#9EA3AE] mt-0.5">
          Configure real-time crisis trigger thresholds, microservice connectivity, and executive notification channels.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Property Metadata */}
        <div className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#30343B]">
            <ShieldCheck className="w-4 h-4 text-[#D7BFA1]" />
            <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Monitored Property Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[10px] text-[#9EA3AE] uppercase mb-1">Property Name</label>
              <input 
                type="text" 
                value={entity?.name || 'Taj Hotel Chennai'} 
                readOnly
                className="w-full bg-[#0B0D12] border border-[#22262E] rounded-xl px-3 py-2 text-[#FAF9F6] cursor-not-allowed" 
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#9EA3AE] uppercase mb-1">Destination Market</label>
              <input 
                type="text" 
                value={`${entity?.city || 'Chennai'}, India`} 
                readOnly
                className="w-full bg-[#0B0D12] border border-[#22262E] rounded-xl px-3 py-2 text-[#FAF9F6] cursor-not-allowed" 
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#9EA3AE] uppercase mb-1">Category Classification</label>
              <input 
                type="text" 
                value="Luxury 5-Star Hotel & Resort" 
                readOnly
                className="w-full bg-[#0B0D12] border border-[#22262E] rounded-xl px-3 py-2 text-[#FAF9F6] cursor-not-allowed" 
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operational Crisis Threshold Triggers */}
        <div className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30343B]">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#E16B42]" />
              <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Crisis Trigger Thresholds</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">ACTIVE PROTECTION</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-[#FAF9F6]">Negative Sentiment Alert Level</span>
                <span className="font-mono text-[#E16B42] font-bold">&gt; {thresholdAlert}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={thresholdAlert} 
                onChange={(e) => setThresholdAlert(Number(e.target.value))}
                className="w-full accent-[#E16B42] bg-[#0B0D12] h-2 rounded-lg cursor-pointer" 
              />
              <p className="text-[10px] text-[#9EA3AE]">
                Dispatches high-priority notification to General Manager when negative sentiment exceeds this ratio within a 48-hour rolling window.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-[#FAF9F6]">Star Rating Breach Floor</span>
                <span className="font-mono text-amber-400 font-bold">&lt; {minRatingAlert} ★</span>
              </div>
              <input 
                type="range" 
                min="2.5" 
                max="4.5" 
                step="0.1"
                value={minRatingAlert} 
                onChange={(e) => setMinRatingAlert(Number(e.target.value))}
                className="w-full accent-amber-500 bg-[#0B0D12] h-2 rounded-lg cursor-pointer" 
              />
              <p className="text-[10px] text-[#9EA3AE]">
                Triggers an automated diagnostic audit if weekly cross-channel rating drops below this value.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <label className="block font-mono text-[10px] text-[#9EA3AE] uppercase mb-1">
              Automated Incident Webhook URL (Slack / Teams / Webhook)
            </label>
            <input 
              type="url" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#0B0D12] border border-[#22262E] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF9F6] font-mono focus:outline-none focus:border-[#E16B42]" 
            />
          </div>
        </div>

        {/* Section 3: Microservice Infrastructure Status */}
        <div className="p-6 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#30343B]">
            <Server className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-sm text-[#FAF9F6]">Microservice Endpoints & Database</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-1">
              <span className="text-[10px] text-[#9EA3AE]">Spring Boot Core:</span>
              <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>http://localhost:8080 (OK)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-1">
              <span className="text-[10px] text-[#9EA3AE]">FastAPI AI ABSA:</span>
              <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>http://localhost:8000 (OK)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-1">
              <span className="text-[10px] text-[#9EA3AE]">Database Storage:</span>
              <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>In-Memory H2 / PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Platform settings updated successfully.</span>
            </span>
          )}
          {!saved && <div />}

          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#E16B42] hover:bg-[#EE7E57] text-white text-xs font-semibold shadow-lg shadow-[#E16B42]/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
}
