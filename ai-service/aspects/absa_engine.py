"""
Aspect-Based Sentiment Analysis (ABSA) for Tourism.
Evaluates the 7 core dimensions:
Food, Staff, Cleanliness, Safety, Value, Location, Amenities
"""
import re
from typing import Dict, Any

ASPECT_KEYWORDS = {
    "Food": [
        "food", "breakfast", "dinner", "lunch", "meal", "buffet", "taste", "delicious",
        "restaurant", "coffee", "tea", "menu", "dining", "cuisine", "chef", "bar"
    ],
    "Staff": [
        "staff", "service", "reception", "manager", "host", "waiter", "courteous",
        "polite", "friendly", "rude", "check-in", "checkout", "helpful", "hospitality"
    ],
    "Cleanliness": [
        "clean", "cleanliness", "dirty", "hygiene", "tidy", "smell", "bedsheet",
        "towel", "bathroom", "restroom", "stain", "dusty", "spotless", "neat"
    ],
    "Safety": [
        "safe", "safety", "security", "guard", "secure", "lock", "neighborhood",
        "scary", "camera", "danger", "safe environment"
    ],
    "Value": [
        "value", "price", "expensive", "cheap", "affordable", "worth", "money",
        "overpriced", "cost", "bargain", "rate"
    ],
    "Location": [
        "location", "beach", "central", "city", "view", "metro", "airport",
        "distance", "convenient", "accessibility", "walkable", "surroundings"
    ],
    "Amenities": [
        "amenity", "amenities", "pool", "swimming pool", "wifi", "gym", "spa", "ac",
        "air conditioning", "tv", "parking", "elevator", "lift", "shower", "hot water"
    ]
}

def analyze_aspects(text: str) -> Dict[str, float]:
    """
    Returns scores for each aspect in range 0.0 to 1.0.
    Default score for unmentioned aspects is 0.75 (neutral/good baseline).
    """
    if not text:
        return {aspect: 0.75 for aspect in ASPECT_KEYWORDS}

    text_lower = text.lower()
    sentences = re.split(r"[.!?]+", text_lower)
    aspect_scores: Dict[str, float] = {}

    positive_cues = ["good", "great", "excellent", "superb", "fast", "clean", "fresh", "spacious", "polite", "helpful", "loved", "best"]
    negative_cues = ["bad", "poor", "terrible", "slow", "delayed", "dirty", "unfriendly", "rude", "cold", "broken", "leaking", "stain", "worst"]

    for aspect, keywords in ASPECT_KEYWORDS.items():
        matched_sentences = []
        for s in sentences:
            if any(k in s for k in keywords):
                matched_sentences.append(s)

        if not matched_sentences:
            aspect_scores[aspect] = 0.80
            continue

        pos_count = 0
        neg_count = 0
        for s in matched_sentences:
            for p in positive_cues:
                if p in s:
                    pos_count += 1
            for n in negative_cues:
                if n in s:
                    neg_count += 1

        total = pos_count + neg_count
        if total == 0:
            aspect_scores[aspect] = 0.80
        else:
            score = (pos_count + 0.2) / (total + 0.4)
            aspect_scores[aspect] = round(max(0.1, min(0.99, score)), 2)

    return aspect_scores
