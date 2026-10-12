import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Sparkles } from 'lucide-react';

export default function ReviewsTab({ reviews, onOpenReviewModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState('ALL');

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch = (r.reviewText || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.reviewer || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'ALL' || r.source === selectedSource;
    const matchesSentiment = selectedSentiment === 'ALL' || (r.sentimentLabel || 'POSITIVE') === selectedSentiment;
    return matchesSearch && matchesSource && matchesSentiment;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Ingestion Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#FAF9F6]">Guest Feedback Audit Repository</h2>
          <p className="text-xs text-[#9EA3AE]">
            Multi-channel verified guest reviews with automated sentiment polarity and departmental aspect attribution.
          </p>
        </div>
        <button
          onClick={onOpenReviewModal}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#E16B42] hover:bg-[#EE7E57] text-white text-xs font-semibold shadow-lg shadow-[#E16B42]/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ingest Feedback Record</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#14171D] border border-[#30343B]">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9EA3AE] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords or reviewer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B0D12] border border-[#22262E] rounded-xl pl-9 pr-3 py-2 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
          />
        </div>

        {/* Source Filter */}
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="bg-[#0B0D12] border border-[#22262E] rounded-xl px-3 py-2 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
        >
          <option value="ALL">All Sources</option>
          <option value="GOOGLE">Google Places</option>
          <option value="TRIPADVISOR">TripAdvisor</option>
          <option value="YELP">Yelp</option>
          <option value="REDDIT">Reddit</option>
        </select>

        {/* Sentiment Filter */}
        <select
          value={selectedSentiment}
          onChange={(e) => setSelectedSentiment(e.target.value)}
          className="bg-[#0B0D12] border border-[#22262E] rounded-xl px-3 py-2 text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E16B42]"
        >
          <option value="ALL">All Sentiments</option>
          <option value="POSITIVE">Positive Only</option>
          <option value="NEUTRAL">Neutral Only</option>
          <option value="NEGATIVE">Negative Only</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#9EA3AE] bg-[#14171D] rounded-2xl border border-[#30343B]">
            No reviews match the selected filter criteria.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-[#14171D] border border-[#30343B] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-[#FAF9F6]">{rev.reviewer || 'Verified Guest'}</span>
                  <span className="font-mono text-[10px] bg-[#0B0D12] px-2 py-0.5 rounded text-[#D7BFA1]">
                    {rev.source}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 font-semibold">★ {rev.rating}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    rev.sentimentLabel === 'POSITIVE'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : rev.sentimentLabel === 'NEGATIVE'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-500/15 text-slate-300 border border-slate-500/30'
                  }`}>
                    {rev.sentimentLabel || 'POSITIVE'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#FAF9F6] leading-relaxed italic">
                "{rev.reviewText}"
              </p>

              <div className="text-[10px] font-mono text-[#9EA3AE]">
                Date: {rev.reviewDate}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
