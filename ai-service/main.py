"""
Tourism Reputation Intelligence Platform (TRIP)
AI & NLP Microservice
FastAPI implementation for Sentiment Analysis, ABSA, Root Causes, Forecasting & Executive Reports.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

from sentiment.classifier import classify_sentiment
from aspects.absa_engine import analyze_aspects
from root_causes.clustering import extract_root_causes
from forecasting.predictor import generate_forecasts
from reports.pdf_generator import generate_pdf_report

app = FastAPI(
    title="TRIP - AI Reputation Intelligence Service",
    description="NLP Sentiment, ABSA, Root Cause Diagnostics, Predictive Forecasting and Board Reports",
    version="1.0.0"
)

# Enable CORS for frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic Request/Response Models ─────────────────────────────────────────

class AnalyzeRequest(BaseModel):
    review_id: Optional[int] = None
    text: str = Field(..., description="Review text to analyze")

class ReviewItem(BaseModel):
    text: str
    rating: Optional[float] = 3.0
    source: Optional[str] = "GOOGLE"

class RootCausesRequest(BaseModel):
    entity_id: Optional[int] = None
    reviews: List[ReviewItem]

class ReportRequest(BaseModel):
    entity_name: str
    city: Optional[str] = "Chennai"
    reputation_score: float = 85.0
    avg_rating: Optional[float] = 4.5
    trend: Optional[str] = "stable"
    breakdown: Optional[Dict[str, float]] = None
    aspects: Optional[Dict[str, float]] = None
    root_causes: Optional[List[Dict[str, Any]]] = None

# ── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "TRIP AI Intelligence Service",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/analyze")
def analyze_review_for_backend(req: AnalyzeRequest):
    """
    Direct contract used by Spring Boot AiClientService.
    Returns sentiment_label, confidence, and ABSA aspects map.
    """
    sentiment_res = classify_sentiment(req.text)
    aspects_res = analyze_aspects(req.text)

    return {
        "review_id": req.review_id,
        "sentiment_label": sentiment_res["label"],
        "confidence": sentiment_res["confidence"],
        "aspects": aspects_res
    }

@app.post("/api/v1/analyze/sentiment")
def analyze_sentiment_endpoint(req: AnalyzeRequest):
    return classify_sentiment(req.text)

@app.post("/api/v1/analyze/aspects")
def analyze_aspects_endpoint(req: AnalyzeRequest):
    return {
        "aspects": analyze_aspects(req.text)
    }

@app.post("/api/v1/analyze/root-causes")
def analyze_root_causes_endpoint(req: RootCausesRequest):
    reviews_dicts = [r.model_dump() for r in req.reviews]
    clusters = extract_root_causes(reviews_dicts)
    return {
        "entity_id": req.entity_id,
        "total_analyzed": len(reviews_dicts),
        "root_causes": clusters
    }

@app.get("/api/v1/forecast/{entity_id}")
def get_forecast_endpoint(
    entity_id: int,
    current_score: float = 85.0,
    trend: str = "stable"
):
    forecasts = generate_forecasts(
        entity_id=entity_id,
        current_score=current_score,
        recent_trend=trend
    )
    return {
        "entity_id": entity_id,
        "current_score": current_score,
        "forecasts": forecasts
    }

@app.get("/api/v1/recommendations/{entity_id}")
def get_recommendations_endpoint(entity_id: int):
    return {
        "entity_id": entity_id,
        "recommendations": [
            {
                "priority": "HIGH",
                "aspect": "Staff",
                "action": "Deploy additional front desk personnel during 12 PM - 3 PM peak check-in windows.",
                "projected_reputation_impact": "+4.2 pts"
            },
            {
                "priority": "HIGH",
                "aspect": "Amenities",
                "action": "Execute quarterly HVAC preventative servicing on 4th floor sea-facing rooms.",
                "projected_reputation_impact": "+3.8 pts"
            },
            {
                "priority": "MEDIUM",
                "aspect": "Cleanliness",
                "action": "Implement UV inspection protocol for linens and bath towels during morning housekeeping.",
                "projected_reputation_impact": "+2.5 pts"
            }
        ]
    }

@app.post("/api/v1/reports/pdf")
def export_pdf_report(req: ReportRequest):
    pdf_buffer = generate_pdf_report(req.model_dump())
    filename = f"reputation_report_{req.entity_name.replace(' ', '_').lower()}.pdf"
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
