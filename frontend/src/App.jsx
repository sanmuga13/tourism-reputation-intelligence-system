import React, { useState, useEffect } from 'react';
import { api } from './services/api';

// Landing Page Components
import Navbar from './components/landing/Navbar';
import FeatureSideIndex from './components/landing/FeatureSideIndex';
import CinematicHero from './components/landing/CinematicHero';
import TheProblem from './components/landing/TheProblem';
import SentimentIntelligence from './components/landing/SentimentIntelligence';
import RootCauseSection from './components/landing/RootCauseSection';
import ReputationEngine from './components/landing/ReputationEngine';
import PredictiveSection from './components/landing/PredictiveSection';
import CompetitorSection from './components/landing/CompetitorSection';
import ArchitectureDiagram from './components/landing/ArchitectureDiagram';
import ProductShowcase from './components/landing/ProductShowcase';
import FinalCTA from './components/landing/FinalCTA';

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import OverviewTab from './components/dashboard/OverviewTab';
import AspectsTab from './components/dashboard/AspectsTab';
import RootCausesTab from './components/dashboard/RootCausesTab';
import ForecastingTab from './components/dashboard/ForecastingTab';
import CompetitorsTab from './components/dashboard/CompetitorsTab';
import ReviewsTab from './components/dashboard/ReviewsTab';
import ReportsTab from './components/dashboard/ReportsTab';
import IngestPipelineAnimation from './components/ui/IngestPipelineAnimation';

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [modalTab, setModalTab] = useState('form'); // 'form' | 'pipeline'
  const [ingestStage, setIngestStage] = useState(1);
  
  // Data State
  const [entities, setEntities] = useState([]);
  const [selectedEntityId, setSelectedEntityId] = useState(1);
  const [reputationData, setReputationData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [rootCauses, setRootCauses] = useState([]);
  const [competitorData, setCompetitorData] = useState(null);
  const [recomputing, setRecomputing] = useState(false);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5.0);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadEntities();
  }, []);

  useEffect(() => {
    if (selectedEntityId) {
      loadEntityData(selectedEntityId);
    }
  }, [selectedEntityId]);

  async function loadEntities() {
    const list = await api.getEntities();
    setEntities(list);
    if (list.length > 0) {
      setSelectedEntityId(list[0].id);
    }
  }

  async function loadEntityData(id) {
    try {
      const [rep, revs, fcasts, rcauses, comps] = await Promise.all([
        api.getReputation(id),
        api.getReviews(id),
        api.getForecasts(id),
        api.getRootCauses(id),
        api.compareCompetitors([id, 2, 4])
      ]);
      setReputationData(rep);
      setReviews(revs);
      setForecasts(fcasts);
      setRootCauses(rcauses);
      setCompetitorData(comps);
    } catch (e) {
      console.error("Data load error:", e);
    }
  }

  async function handleRecompute() {
    setRecomputing(true);
    try {
      await api.recomputeReputation(selectedEntityId);
      await loadEntityData(selectedEntityId);
    } catch (e) {
      console.error(e);
    } finally {
      setRecomputing(false);
    }
  }

  async function handleAddReview(e) {
    e.preventDefault();
    if (!newReviewText) return;
    setSubmittingReview(true);
    setIngestStage(1);

    // Staged visual animation
    setTimeout(() => setIngestStage(2), 250);
    setTimeout(() => setIngestStage(3), 500);
    setTimeout(() => setIngestStage(4), 850);
    setTimeout(() => setIngestStage(5), 1150);

    try {
      const res = await api.submitReview({
        entityId: selectedEntityId,
        source: "GOOGLE",
        reviewer: newReviewAuthor || "Guest Reviewer",
        reviewText: newReviewText,
        rating: parseFloat(newReviewRating),
        reviewDate: new Date().toISOString().split("T")[0],
        analyzeNow: true
      });

      if (res?.data) {
        setReviews(prev => [res.data, ...prev]);
      }

      setTimeout(() => {
        setNewReviewText('');
        setNewReviewAuthor('');
        setSubmittingReview(false);
        setShowReviewModal(false);
        setIngestStage(1);
        loadEntityData(selectedEntityId);
      }, 1600);
    } catch (err) {
      console.error(err);
      setSubmittingReview(false);
      setIngestStage(1);
    }
  }

  const selectedEntity = entities.find(e => e.id === selectedEntityId) || { 
    name: "Taj Coromandel Chennai", 
    city: "Chennai", 
    avgRating: 4.7 
  };

  const currentScore = reputationData?.reputationScore || 92.4;

  const handleDownloadReport = () => {
    api.downloadReport({
      entity_name: selectedEntity.name,
      city: selectedEntity.city,
      reputation_score: currentScore,
      avg_rating: selectedEntity.avgRating || 4.7,
      trend: reputationData?.trend || "improving",
      aspects: {
        Food: 0.94,
        Staff: 0.88,
        Cleanliness: 0.92,
        Safety: 0.96,
        Value: 0.85,
        Location: 0.95,
        Amenities: 0.82
      },
      root_causes: rootCauses
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F5F1EA]">
      
      {viewMode === 'landing' ? (
        /* ─── PUBLIC CINEMATIC LANDING EXPERIENCE ─── */
        <div className="relative">
          <Navbar 
            onEnterDashboard={() => setViewMode('dashboard')} 
            activeMode={viewMode}
          />

          <FeatureSideIndex activeSection="sentiment" />

          <CinematicHero 
            onEnterDashboard={() => setViewMode('dashboard')} 
          />

          <TheProblem />

          <SentimentIntelligence />

          <RootCauseSection />

          <ReputationEngine />

          <PredictiveSection />

          <CompetitorSection />

          <ArchitectureDiagram />

          <ProductShowcase 
            onEnterDashboard={() => setViewMode('dashboard')} 
          />

          <FinalCTA 
            onEnterDashboard={() => setViewMode('dashboard')} 
          />
        </div>
      ) : (
        /* ─── ENTERPRISE DASHBOARD WORKSPACE ─── */
        <DashboardLayout
          activeTab={dashboardTab}
          setActiveTab={setDashboardTab}
          entities={entities}
          selectedEntityId={selectedEntityId}
          setSelectedEntityId={setSelectedEntityId}
          onBackToLanding={() => setViewMode('landing')}
          onOpenReviewModal={() => setShowReviewModal(true)}
          onDownloadReport={handleDownloadReport}
        >
          {dashboardTab === 'overview' && (
            <OverviewTab
              entity={selectedEntity}
              reputationData={reputationData}
              reviews={reviews}
              rootCauses={rootCauses}
              onRecompute={handleRecompute}
              recomputing={recomputing}
            />
          )}

          {dashboardTab === 'aspects' && (
            <AspectsTab />
          )}

          {dashboardTab === 'rootcauses' && (
            <RootCausesTab 
              rootCauses={rootCauses} 
            />
          )}

          {dashboardTab === 'forecasting' && (
            <ForecastingTab 
              forecasts={forecasts} 
            />
          )}

          {dashboardTab === 'competitors' && (
            <CompetitorsTab 
              competitorData={competitorData} 
            />
          )}

          {dashboardTab === 'reviews' && (
            <ReviewsTab 
              reviews={reviews} 
              onOpenReviewModal={() => setShowReviewModal(true)} 
            />
          )}

          {dashboardTab === 'reports' && (
            <ReportsTab 
              entity={selectedEntity}
              reputationData={reputationData}
              rootCauses={rootCauses}
              onDownloadReport={handleDownloadReport}
            />
          )}
        </DashboardLayout>
      )}

      {/* Review Ingestion Modal (Accessible from both Landing & Dashboard) */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#14171D] border border-[#30343B] rounded-3xl max-w-2xl w-full p-7 shadow-2xl space-y-5 animate-in fade-in duration-300">
            
            {/* Modal Header & Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#22262E]">
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-lg text-[#FAF9F6]">Live Guest Review Ingestion</h3>
                <p className="text-xs text-[#9EA3AE]">
                  Multi-tier pipeline: Ingestion → Spring Boot → FastAPI NLP → Database → UI
                </p>
              </div>

              <div className="flex space-x-1 bg-[#0B0D12] p-1 rounded-xl border border-[#22262E] self-start sm:self-auto text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setModalTab('form')}
                  className={`px-3 py-1 rounded-lg transition ${
                    modalTab === 'form' ? 'bg-[#E16B42] text-white font-semibold' : 'text-[#9EA3AE] hover:text-white'
                  }`}
                >
                  Submission Form
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('pipeline')}
                  className={`px-3 py-1 rounded-lg transition ${
                    modalTab === 'pipeline' ? 'bg-[#E16B42] text-white font-semibold' : 'text-[#9EA3AE] hover:text-white'
                  }`}
                >
                  Pipeline Flow
                </button>
              </div>
            </div>

            {/* If Ingestion is active, show the animated pipeline progression */}
            {submittingReview ? (
              <div className="space-y-4 py-4">
                <div className="text-center space-y-1">
                  <div className="text-xs font-mono text-[#E16B42] uppercase tracking-widest font-semibold animate-pulse">
                    Processing Review Ingestion Pipeline
                  </div>
                  <p className="text-xs text-[#9EA3AE]">
                    Dispatching to Spring Boot core, executing BERT NLP ABSA, and updating database...
                  </p>
                </div>
                <IngestPipelineAnimation currentStep={ingestStage} />
              </div>
            ) : modalTab === 'pipeline' ? (
              /* Pipeline Flow Explanation View */
              <div className="space-y-4">
                <IngestPipelineAnimation isSimulating={true} />
                
                <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#22262E] space-y-2 text-xs">
                  <h4 className="font-display font-bold text-sm text-[#FAF9F6]">How the Ingestion Pipeline Operates</h4>
                  <ul className="space-y-1.5 text-[#9EA3AE] list-disc list-inside">
                    <li><strong className="text-[#FAF9F6]">Ingestion:</strong> Receives review payload via REST endpoint or automated channel webhook.</li>
                    <li><strong className="text-[#FAF9F6]">Spring Boot Core:</strong> Validates entity ownership and asynchronously dispatches non-blocking HTTP request to FastAPI.</li>
                    <li><strong className="text-[#FAF9F6]">AI / NLP Microservice:</strong> Computes BERT polarity and decomposes text into 7 hospitality aspect scores.</li>
                    <li><strong className="text-[#FAF9F6]">Database:</strong> Writes records to PostgreSQL with ACID integrity and time-decay tracking.</li>
                    <li><strong className="text-[#FAF9F6]">Dashboard:</strong> Recalculates the composite 0–100 index and updates the live review stream.</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#E16B42] hover:bg-[#EE7E57] text-white transition"
                  >
                    Proceed to Ingest Form
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Submission Form */
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#D7BFA1] uppercase tracking-wider mb-1.5">
                      Guest / Reviewer Name
                    </label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Siddharth Verma"
                      className="w-full bg-[#0B0D12] border border-[#30343B] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#D7BFA1] uppercase tracking-wider mb-1.5">
                      Star Rating (1.0 to 5.0)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1.0"
                      max="5.0"
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(e.target.value)}
                      className="w-full bg-[#0B0D12] border border-[#30343B] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#D7BFA1] uppercase tracking-wider mb-1.5">
                    Review Text
                  </label>
                  <textarea
                    rows="3"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Describe culinary experience, front desk service, room hygiene, climate control..."
                    className="w-full bg-[#0B0D12] border border-[#30343B] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
                    required
                  />
                </div>

                {/* Mini pipeline preview below form */}
                <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#22262E] text-[11px] font-mono text-[#9EA3AE] flex items-center justify-between">
                  <span>Automated Multi-Touchpoint ABSA & Semantic Defect Clustering</span>
                  <span className="text-emerald-400 font-semibold">Live Ingestion Active</span>
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t border-[#22262E]">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#9EA3AE] hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#E16B42] hover:bg-[#EE7E57] text-white shadow-lg shadow-[#E16B42]/20 transition"
                  >
                    Submit & Execute Pipeline
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
