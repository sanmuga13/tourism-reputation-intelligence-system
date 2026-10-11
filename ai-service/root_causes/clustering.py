"""
Root Cause Diagnostics & NLP Topic Clustering.
Extracts underlying issues behind negative sentiments and clusters them by frequency and severity.
"""
from typing import List, Dict, Any
import re

COMMON_ISSUE_PATTERNS = [
    (r"(delay|wait|slow|hour|queue).*(check-in|reception|front desk)", "Staff", "Extended check-in queue and slow front desk response", 0.75),
    (r"(rude|unfriendly|arrogant|unhelpful).*(staff|waiter|manager|reception)", "Staff", "Staff discourtesy and unhelpful front desk behavior", 0.85),
    (r"(dirty|stain|smell|cockroach|hair|toilet|restroom).*(bed|sheet|towel|bathroom|room)", "Cleanliness", "Housekeeping hygiene and stained linen/restrooms", 0.88),
    (r"(leak|broken|not working|ac|air condition|remote).*(cooling|room)", "Amenities", "Air conditioning malfunctions and maintenance failures", 0.80),
    (r"(cold|tasteless|spoiled|undercooked|raw|hair in).*(food|breakfast|meal)", "Food", "Food temperature and culinary preparation quality", 0.78),
    (r"(slow|cold|order delay).*(room service|kitchen|restaurant)", "Food", "Delayed room service and long meal wait times", 0.70),
    (r"(noisy|loud|construction|traffic|thin walls)", "Amenities", "Excessive ambient noise and inadequate soundproofing", 0.65),
    (r"(wifi|internet|network).*(slow|disconnect|not working)", "Amenities", "Unreliable Wi-Fi connectivity and network drops", 0.60),
    (r"(expensive|overpriced|rip-off|not worth).*(price|bill|rate)", "Value", "Unfavorable value perception and overpriced amenities", 0.65),
]

def extract_root_causes(reviews: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Analyzes list of reviews and returns clustered root causes with frequency and severity.
    Review dict format: {"text": str, "rating": float}
    """
    cluster_counts = {}

    for rev in reviews:
        text = rev.get("text", "")
        rating = float(rev.get("rating", 3.0))

        # Only inspect negative/mixed reviews (rating <= 3.5 or negative words present)
        if rating > 3.5 and not any(w in text.lower() for w in ["bad", "poor", "slow", "dirty", "leak", "rude"]):
            continue

        text_lower = text.lower()
        matched = False
        for pattern, aspect, issue_label, base_severity in COMMON_ISSUE_PATTERNS:
            if re.search(pattern, text_lower):
                matched = True
                if issue_label not in cluster_counts:
                    cluster_counts[issue_label] = {
                        "aspect": aspect,
                        "cause_text": issue_label,
                        "frequency": 0,
                        "severity": base_severity
                    }
                cluster_counts[issue_label]["frequency"] += 1

        # Fallback keyword extraction if not matched by specific regex
        if not matched and rating <= 2.5:
            generic_label = "General dissatisfaction with facility service quality"
            if generic_label not in cluster_counts:
                cluster_counts[generic_label] = {
                    "aspect": "Staff",
                    "cause_text": generic_label,
                    "frequency": 0,
                    "severity": 0.60
                }
            cluster_counts[generic_label]["frequency"] += 1

    results = list(cluster_counts.values())
    # Sort descending by frequency and severity
    results.sort(key=lambda x: (x["frequency"], x["severity"]), reverse=True)
    return results
