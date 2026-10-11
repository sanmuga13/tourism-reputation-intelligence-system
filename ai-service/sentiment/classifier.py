"""
Sentiment Analysis Classifier for Tourism Reviews.
Provides BERT-compatible sentiment classification (POSITIVE, NEGATIVE, NEUTRAL)
with confidence scoring.
"""
import re
from typing import Dict, Any

POSITIVE_WORDS = {
    "great", "excellent", "amazing", "wonderful", "fantastic", "good", "best",
    "superb", "lovely", "clean", "spacious", "friendly", "courteous", "delicious",
    "fresh", "beautiful", "luxurious", "peaceful", "perfect", "worth", "polite",
    "helpful", "prompt", "pleasant", "comfortable", "exceptional", "memorable"
}

NEGATIVE_WORDS = {
    "bad", "terrible", "awful", "horrible", "poor", "worst", "dirty", "filthy",
    "smelly", "slow", "rude", "unfriendly", "overpriced", "noisy", "broken",
    "leaking", "stained", "disappointing", "cold", "delay", "delayed", "waste",
    "careless", "unhelpful", "unresponsive", "problem", "disaster", "stained"
}

NEGATION_WORDS = {"not", "no", "never", "hardly", "barely", "scarcely", "without"}

def classify_sentiment(text: str) -> Dict[str, Any]:
    if not text or not text.strip():
        return {
            "label": "NEUTRAL",
            "confidence": 0.50,
            "positive_score": 0.33,
            "neutral_score": 0.34,
            "negative_score": 0.33
        }

    words = re.findall(r"\b[a-zA-Z']+\b", text.lower())
    pos_count = 0
    neg_count = 0

    for i, word in enumerate(words):
        # check for negation in previous 2 words
        is_negated = any(words[j] in NEGATION_WORDS for j in range(max(0, i - 2), i))

        if word in POSITIVE_WORDS:
            if is_negated:
                neg_count += 1.5
            else:
                pos_count += 1.0
        elif word in NEGATIVE_WORDS:
            if is_negated:
                pos_count += 1.0
            else:
                neg_count += 1.5

    total = pos_count + neg_count
    if total == 0:
        return {
            "label": "NEUTRAL",
            "confidence": 0.70,
            "positive_score": 0.30,
            "neutral_score": 0.50,
            "negative_score": 0.20
        }

    pos_ratio = pos_count / total
    neg_ratio = neg_count / total

    if pos_ratio > 0.6:
        label = "POSITIVE"
        confidence = min(0.99, 0.70 + (pos_ratio * 0.28))
    elif neg_ratio > 0.55:
        label = "NEGATIVE"
        confidence = min(0.99, 0.70 + (neg_ratio * 0.28))
    else:
        label = "NEUTRAL"
        confidence = 0.65

    return {
        "label": label,
        "confidence": round(confidence, 4),
        "positive_score": round(pos_ratio, 4),
        "negative_score": round(neg_ratio, 4),
        "neutral_score": round(max(0.0, 1.0 - pos_ratio - neg_ratio), 4)
    }
