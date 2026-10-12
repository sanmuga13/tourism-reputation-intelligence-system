-- ============================================================
--  TRIP - Tourism Reputation Intelligence Platform
--  Comprehensive Seed Data for Testing & Demonstration
-- ============================================================

-- 1. Entities
INSERT INTO entities (id, name, type, city, country, address, avg_rating) VALUES
    (1, 'Taj Coromandel Chennai', 'HOTEL', 'Chennai', 'India', '37, Mahatma Gandhi Rd, Nungambakkam', 4.7),
    (2, 'ITC Grand Chola', 'HOTEL', 'Chennai', 'India', '63, Mount Rd, Guindy', 4.8),
    (3, 'Saravana Bhavan', 'RESTAURANT', 'Chennai', 'India', 'Kennet Lane, Egmore', 4.3),
    (4, 'Marina Beach Breeze Resort', 'HOTEL', 'Chennai', 'India', 'East Coast Road, Kovalam', 3.8),
    (5, 'The Leela Palace', 'HOTEL', 'Bengaluru', 'India', '23, HAL Old Airport Rd, Kodihalli', 4.9);

-- Reset sequence for entities
ALTER SEQUENCE entities_id_seq RESTART WITH 6;

-- 2. Reviews
INSERT INTO reviews (id, entity_id, source, reviewer, review_text, rating, review_date, created_at) VALUES
    (1, 1, 'GOOGLE', 'Aarav Sharma', 'Exceptional service and mouth-watering south Indian breakfast. The staff made us feel like royalty. Will certainly return!', 5.0, '2026-09-15', NOW() - INTERVAL '25 days'),
    (2, 1, 'TRIPADVISOR', 'Priya Raman', 'Rooms were clean and spacious. The pool view is relaxing. Check-in was a bit delayed but staff apologized graciously.', 4.0, '2026-09-20', NOW() - INTERVAL '20 days'),
    (3, 1, 'YELP', 'David Miller', 'Great central location in Chennai. Safe environment and courteous housekeeping. Food at Southern Spice restaurant was memorable.', 4.5, '2026-09-28', NOW() - INTERVAL '12 days'),
    (4, 2, 'GOOGLE', 'Ananya Patel', 'Magnificent architecture! Truly grand. Buffet spread at Madras Pavilion had infinite variety. Unmatched luxury.', 5.0, '2026-09-22', NOW() - INTERVAL '18 days'),
    (5, 2, 'TRIPADVISOR', 'Rohan Gupta', 'Check-in took over 45 minutes on a crowded weekend. Staff seemed overwhelmed. Room cleanliness and dining were top tier though.', 3.5, '2026-10-01', NOW() - INTERVAL '9 days'),
    (6, 3, 'GOOGLE', 'Karthik Raja', 'Authentic ghee roast dosa and filter coffee! Service is fast during lunch peak. High value for money.', 4.5, '2026-10-02', NOW() - INTERVAL '8 days'),
    (7, 3, 'REDDIT', 'FoodieTraveler', 'Food taste is classic, but restrooms need urgent hygiene improvement. Tables were a bit oily.', 3.0, '2026-10-05', NOW() - INTERVAL '5 days'),
    (8, 4, 'GOOGLE', 'Vikram Singh', 'Disappointing maintenance. AC in sea-facing room was leaking water and staff took 3 hours to respond. Slow room service.', 2.0, '2026-10-06', NOW() - INTERVAL '4 days'),
    (9, 4, 'TRIPADVISOR', 'Sneha Iyer', 'Beach location is nice, but property needs major renovation. Stained towels and poor breakfast quality.', 2.5, '2026-10-07', NOW() - INTERVAL '3 days');

ALTER SEQUENCE reviews_id_seq RESTART WITH 10;

-- 3. Sentiments
INSERT INTO sentiments (id, review_id, label, confidence_score, analyzed_at) VALUES
    (1, 1, 'POSITIVE', 0.9850, NOW() - INTERVAL '25 days'),
    (2, 2, 'POSITIVE', 0.8200, NOW() - INTERVAL '20 days'),
    (3, 3, 'POSITIVE', 0.9400, NOW() - INTERVAL '12 days'),
    (4, 4, 'POSITIVE', 0.9920, NOW() - INTERVAL '18 days'),
    (5, 5, 'NEUTRAL',  0.6400, NOW() - INTERVAL '9 days'),
    (6, 6, 'POSITIVE', 0.9650, NOW() - INTERVAL '8 days'),
    (7, 7, 'NEGATIVE', 0.8800, NOW() - INTERVAL '5 days'),
    (8, 8, 'NEGATIVE', 0.9750, NOW() - INTERVAL '4 days'),
    (9, 9, 'NEGATIVE', 0.9450, NOW() - INTERVAL '3 days');

ALTER SEQUENCE sentiments_id_seq RESTART WITH 10;

-- 4. Aspect Scores (ABSA 7 Dimensions)
INSERT INTO aspect_scores (id, review_id, aspect, score, label) VALUES
    -- Review 1 (Taj)
    (1, 1, 'Food', 0.96, 'POSITIVE'),
    (2, 1, 'Staff', 0.98, 'POSITIVE'),
    (3, 1, 'Cleanliness', 0.92, 'POSITIVE'),
    (4, 1, 'Value', 0.88, 'POSITIVE'),
    -- Review 2 (Taj)
    (5, 2, 'Cleanliness', 0.94, 'POSITIVE'),
    (6, 2, 'Amenities', 0.90, 'POSITIVE'),
    (7, 2, 'Staff', 0.70, 'NEUTRAL'),
    -- Review 3 (Taj)
    (8, 3, 'Location', 0.95, 'POSITIVE'),
    (9, 3, 'Safety', 0.96, 'POSITIVE'),
    (10, 3, 'Food', 0.94, 'POSITIVE'),
    -- Review 5 (ITC)
    (11, 5, 'Staff', 0.40, 'NEGATIVE'),
    (12, 5, 'Cleanliness', 0.95, 'POSITIVE'),
    (13, 5, 'Food', 0.92, 'POSITIVE'),
    -- Review 7 (Saravana)
    (14, 7, 'Food', 0.85, 'POSITIVE'),
    (15, 7, 'Cleanliness', 0.25, 'NEGATIVE'),
    -- Review 8 (Marina Beach Resort)
    (16, 8, 'Amenities', 0.20, 'NEGATIVE'),
    (17, 8, 'Staff', 0.30, 'NEGATIVE'),
    (18, 8, 'Cleanliness', 0.35, 'NEGATIVE');

ALTER SEQUENCE aspect_scores_id_seq RESTART WITH 19;

-- 5. Root Causes
INSERT INTO root_causes (id, entity_id, aspect, cause_text, frequency, severity, created_at) VALUES
    (1, 4, 'Amenities', 'AC water leakage in guest rooms', 6, 0.85, NOW() - INTERVAL '4 days'),
    (2, 4, 'Staff', 'Unresponsive room service response time', 8, 0.78, NOW() - INTERVAL '4 days'),
    (3, 4, 'Cleanliness', 'Stained bed linen and bath towels', 5, 0.82, NOW() - INTERVAL '3 days'),
    (4, 2, 'Staff', 'Extended check-in queue during peak weekends', 4, 0.65, NOW() - INTERVAL '9 days'),
    (5, 3, 'Cleanliness', 'Restroom sanitation and oily dining tables', 7, 0.70, NOW() - INTERVAL '5 days');

ALTER SEQUENCE root_causes_id_seq RESTART WITH 6;

-- 6. Reputation Scores (Daily History)
INSERT INTO reputation_scores (id, entity_id, score, sentiment_score, rating_score, volume_score, recency_score, trend, score_date) VALUES
    (1, 1, 92.4, 94.0, 95.0, 88.0, 90.0, 'improving', CURRENT_DATE - INTERVAL '2 days'),
    (2, 1, 93.1, 95.0, 96.0, 89.0, 91.0, 'improving', CURRENT_DATE - INTERVAL '1 day'),
    (3, 1, 93.8, 96.0, 96.0, 90.0, 92.0, 'improving', CURRENT_DATE),
    (4, 2, 88.5, 87.0, 94.0, 92.0, 80.0, 'stable',    CURRENT_DATE),
    (5, 3, 76.2, 75.0, 82.0, 85.0, 68.0, 'declining', CURRENT_DATE),
    (6, 4, 48.0, 42.0, 52.0, 60.0, 45.0, 'declining', CURRENT_DATE),
    (7, 5, 96.2, 98.0, 98.0, 94.0, 95.0, 'improving', CURRENT_DATE);

ALTER SEQUENCE reputation_scores_id_seq RESTART WITH 8;

-- 7. Alerts
INSERT INTO alerts (id, entity_id, message, severity, is_resolved, created_at) VALUES
    (1, 4, 'Reputation score dropped below 50.0 (Severe Amenities & Staff complaints)', 'CRITICAL', FALSE, NOW() - INTERVAL '2 days'),
    (2, 4, 'Negative review spike detected on Google Places: 3 consecutive 1-star reviews', 'HIGH', FALSE, NOW() - INTERVAL '1 day'),
    (3, 2, 'Weekend staff dissatisfaction alert: Check-in bottleneck reported', 'MEDIUM', FALSE, NOW() - INTERVAL '5 days');

ALTER SEQUENCE alerts_id_seq RESTART WITH 4;

-- 8. Forecasts (30, 60, 90 Day Projections)
INSERT INTO forecasts (id, entity_id, target_date, predicted_score, lower_bound, upper_bound, model_used) VALUES
    (1, 1, CURRENT_DATE + INTERVAL '30 days', 94.50, 92.00, 96.80, 'ensemble'),
    (2, 1, CURRENT_DATE + INTERVAL '60 days', 95.20, 91.80, 97.50, 'ensemble'),
    (3, 1, CURRENT_DATE + INTERVAL '90 days', 95.80, 91.00, 98.20, 'ensemble'),
    (4, 4, CURRENT_DATE + INTERVAL '30 days', 44.10, 39.50, 48.20, 'prophet'),
    (5, 4, CURRENT_DATE + INTERVAL '60 days', 41.50, 35.00, 47.00, 'prophet');

ALTER SEQUENCE forecasts_id_seq RESTART WITH 6;
