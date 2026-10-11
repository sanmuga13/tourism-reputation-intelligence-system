"""
Unit and API Integration Tests for TRIP AI Service.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_analyze_contract():
    payload = {
        "review_id": 101,
        "text": "The food and buffet breakfast was extraordinary! Very friendly staff and sparkling clean rooms."
    }
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["review_id"] == 101
    assert data["sentiment_label"] == "POSITIVE"
    assert data["confidence"] > 0.7
    assert "Food" in data["aspects"]
    assert "Staff" in data["aspects"]
    assert "Cleanliness" in data["aspects"]

def test_sentiment_negative():
    payload = {
        "text": "Terrible service and extremely dirty towels. AC was leaking water all night."
    }
    response = client.post("/api/v1/analyze/sentiment", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["label"] == "NEGATIVE"
    assert data["confidence"] > 0.7

def test_root_causes_clustering():
    payload = {
        "entity_id": 1,
        "reviews": [
            {"text": "Very slow check-in queue at the front desk, waited 45 minutes.", "rating": 2.0},
            {"text": "Delay at front desk, check-in took forever.", "rating": 2.5},
            {"text": "AC was leaking water on the carpet and broken remote.", "rating": 1.5}
        ]
    }
    response = client.post("/api/v1/analyze/root-causes", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["root_causes"]) >= 2
    causes = [rc["aspect"] for rc in data["root_causes"]]
    assert "Staff" in causes or "Amenities" in causes

def test_forecast():
    response = client.get("/api/v1/forecast/1?current_score=88.5&trend=improving")
    assert response.status_code == 200
    data = response.json()
    assert len(data["forecasts"]) == 3
    assert data["forecasts"][0]["days_ahead"] == 30
    assert data["forecasts"][1]["days_ahead"] == 60
    assert data["forecasts"][2]["days_ahead"] == 90
