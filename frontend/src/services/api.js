/**
 * API client for TRIP Backend and AI Service.
 * Provides fallback mock data if services are offline or in demonstration mode.
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
const AI_URL = import.meta.env.VITE_AI_URL || "http://localhost:8000";

export const api = {
  // ── Entities ─────────────────────────────────────────────────────────────
  async getEntities() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/entities`);
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      return data.data || [];
    } catch {
      return [
        { id: 1, name: "Taj Coromandel Chennai", type: "HOTEL", city: "Chennai", avgRating: 4.7, reviewCount: 42 },
        { id: 2, name: "ITC Grand Chola", type: "HOTEL", city: "Chennai", avgRating: 4.8, reviewCount: 56 },
        { id: 3, name: "Saravana Bhavan", type: "RESTAURANT", city: "Chennai", avgRating: 4.3, reviewCount: 89 },
        { id: 4, name: "Marina Beach Breeze Resort", type: "HOTEL", city: "Chennai", avgRating: 3.8, reviewCount: 23 },
        { id: 5, name: "The Leela Palace", type: "HOTEL", city: "Bengaluru", avgRating: 4.9, reviewCount: 65 }
      ];
    }
  },

  // ── Reputation ───────────────────────────────────────────────────────────
  async getReputation(entityId) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/reputation/${entityId}`);
      if (!res.ok) throw new Error("Reputation fetch failed");
      const data = await res.json();
      return data.data;
    } catch {
      return {
        entityId,
        entityName: "Taj Coromandel Chennai",
        reputationScore: 92.4,
        trend: "improving",
        scoreDate: new Date().toISOString().split("T")[0],
        breakdown: {
          sentimentScore: 94.0,
          ratingScore: 95.0,
          volumeScore: 88.0,
          recencyScore: 90.0
        }
      };
    }
  },

  async recomputeReputation(entityId) {
    const res = await fetch(`${BACKEND_URL}/api/v1/reputation/${entityId}/recompute`, {
      method: "POST"
    });
    return res.json();
  },

  // ── Reviews ──────────────────────────────────────────────────────────────
  async getReviews(entityId) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/reviews/entity/${entityId}`);
      if (!res.ok) throw new Error("Reviews fetch failed");
      const data = await res.json();
      return data.data?.content || [];
    } catch {
      return [
        {
          id: 1,
          reviewer: "Aarav Sharma",
          source: "GOOGLE",
          rating: 5.0,
          reviewText: "Exceptional south Indian buffet breakfast and very polite staff! Room was sparkling clean.",
          sentimentLabel: "POSITIVE",
          reviewDate: "2026-10-09"
        },
        {
          id: 2,
          reviewer: "Priya Raman",
          source: "TRIPADVISOR",
          rating: 4.0,
          reviewText: "Rooms were clean and spacious. Check-in was delayed by 20 minutes but staff apologized graciously.",
          sentimentLabel: "POSITIVE",
          reviewDate: "2026-10-08"
        },
        {
          id: 3,
          reviewer: "David Miller",
          source: "YELP",
          rating: 4.5,
          reviewText: "Great central location in Chennai. Safe environment and courteous housekeeping.",
          sentimentLabel: "POSITIVE",
          reviewDate: "2026-10-05"
        }
      ];
    }
  },

  async submitReview(reviewData) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });
      if (!res.ok) throw new Error(`Backend returned status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Direct backend review submission failed, falling back to local simulated response:", err);
      return {
        success: true,
        data: {
          id: Date.now(),
          entityId: reviewData.entityId,
          reviewer: reviewData.reviewer,
          source: reviewData.source || "GOOGLE",
          reviewText: reviewData.reviewText,
          rating: reviewData.rating,
          reviewDate: reviewData.reviewDate || new Date().toISOString().split("T")[0],
          sentimentLabel: reviewData.rating >= 4.0 ? "POSITIVE" : reviewData.rating <= 2.5 ? "NEGATIVE" : "NEUTRAL"
        }
      };
    }
  },

  // ── Competitors ──────────────────────────────────────────────────────────
  async compareCompetitors(entityIds) {
    try {
      const query = entityIds.join(",");
      const res = await fetch(`${BACKEND_URL}/api/v1/competitors/compare?entities=${query}`);
      if (!res.ok) throw new Error("Competitor fetch failed");
      const data = await res.json();
      return data.data;
    } catch {
      return {
        baseline: "Taj Coromandel Chennai",
        baselineScore: 92.4,
        competitors: [
          {
            entityId: 2,
            name: "ITC Grand Chola",
            reputationScore: 88.5,
            overallGap: -3.9,
            advantages: [
              { aspect: "Cleanliness", gap: "+2%" },
              { aspect: "Amenities", gap: "+5%" }
            ]
          },
          {
            entityId: 4,
            name: "Marina Beach Breeze Resort",
            reputationScore: 48.0,
            overallGap: -44.4,
            advantages: [
              { aspect: "Location", gap: "+3%" }
            ]
          }
        ]
      };
    }
  },

  // ── Forecasts & Root Causes (AI Service) ─────────────────────────────────
  async getForecasts(entityId, currentScore = 90.0, trend = "improving") {
    try {
      const res = await fetch(`${AI_URL}/api/v1/forecast/${entityId}?current_score=${currentScore}&trend=${trend}`);
      if (!res.ok) throw new Error("AI forecast offline");
      const data = await res.json();
      return data.forecasts || [];
    } catch {
      return [
        { days_ahead: 30, target_date: "2026-11-09", predicted_score: 93.8, lower_bound: 91.5, upper_bound: 96.0, model_used: "ensemble" },
        { days_ahead: 60, target_date: "2026-12-09", predicted_score: 94.6, lower_bound: 90.8, upper_bound: 97.4, model_used: "ensemble" },
        { days_ahead: 90, target_date: "2027-01-08", predicted_score: 95.4, lower_bound: 90.0, upper_bound: 98.2, model_used: "ensemble" }
      ];
    }
  },

  async getRootCauses(entityId) {
    try {
      const res = await fetch(`${AI_URL}/api/v1/analyze/root-causes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity_id: entityId,
          reviews: [
            { text: "Check-in took over 45 minutes on weekend. Staff seemed overwhelmed.", rating: 2.5 },
            { text: "AC was leaking water and room service response took 2 hours.", rating: 2.0 },
            { text: "Stained towels in the bathroom and dusty curtains.", rating: 2.5 }
          ]
        })
      });
      if (!res.ok) throw new Error("AI offline");
      const data = await res.json();
      return data.root_causes || [];
    } catch {
      return [
        { aspect: "Staff", cause_text: "Extended check-in queue and slow front desk response", frequency: 8, severity: 0.78 },
        { aspect: "Amenities", cause_text: "Air conditioning malfunctions and maintenance failures", frequency: 6, severity: 0.85 },
        { aspect: "Cleanliness", cause_text: "Housekeeping hygiene and stained linen/restrooms", frequency: 5, severity: 0.82 }
      ];
    }
  },

  async downloadReport(reportData) {
    const res = await fetch(`${AI_URL}/api/v1/reports/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData)
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TRIP_Executive_Report_${reportData.entity_name.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};
