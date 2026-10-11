-- ============================================================
--  TRIP - Tourism Reputation Intelligence Platform
--  PostgreSQL Complete Schema
-- ============================================================

-- Drop tables if exist (for clean setup)
DROP TABLE IF EXISTS forecasts CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS reputation_scores CASCADE;
DROP TABLE IF EXISTS root_causes CASCADE;
DROP TABLE IF EXISTS aspect_scores CASCADE;
DROP TABLE IF EXISTS sentiments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS entities CASCADE;

-- Drop enum types if exist
DROP TYPE IF EXISTS alert_severity CASCADE;
DROP TYPE IF EXISTS sentiment_label CASCADE;
DROP TYPE IF EXISTS review_source CASCADE;
DROP TYPE IF EXISTS entity_type CASCADE;

-- ENUM types
CREATE TYPE entity_type     AS ENUM ('HOTEL', 'RESTAURANT', 'ATTRACTION');
CREATE TYPE review_source   AS ENUM ('GOOGLE', 'YELP', 'TRIPADVISOR', 'REDDIT', 'KAGGLE');
CREATE TYPE sentiment_label AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');
CREATE TYPE alert_severity  AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- ------------------------------------------------------------
-- 1. entities (Hotels, Restaurants, Attractions)
-- ------------------------------------------------------------
CREATE TABLE entities (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)  NOT NULL,
    type        entity_type   NOT NULL,
    city        VARCHAR(100)  NOT NULL,
    country     VARCHAR(100)  NOT NULL DEFAULT 'India',
    address     TEXT,
    avg_rating  NUMERIC(3, 2),
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 2. reviews
-- ------------------------------------------------------------
CREATE TABLE reviews (
    id           BIGSERIAL PRIMARY KEY,
    entity_id    BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    source       review_source NOT NULL,
    reviewer     VARCHAR(255),
    review_text  TEXT          NOT NULL,
    rating       NUMERIC(2, 1),
    review_date  DATE,
    created_at   TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_entity ON reviews(entity_id);
CREATE INDEX idx_reviews_source ON reviews(source);
CREATE INDEX idx_reviews_date   ON reviews(review_date);

-- ------------------------------------------------------------
-- 3. sentiments (AI output — per review)
-- ------------------------------------------------------------
CREATE TABLE sentiments (
    id               BIGSERIAL PRIMARY KEY,
    review_id        BIGINT          NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    label            sentiment_label NOT NULL,
    confidence_score NUMERIC(5, 4)   NOT NULL,
    analyzed_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sentiments_review ON sentiments(review_id);

-- ------------------------------------------------------------
-- 4. aspect_scores (ABSA — 7 tourism dimensions)
-- ------------------------------------------------------------
CREATE TABLE aspect_scores (
    id        BIGSERIAL PRIMARY KEY,
    review_id BIGINT          NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    aspect    VARCHAR(50)     NOT NULL,   -- Food, Staff, Cleanliness, Safety, Value, Location, Amenities
    score     NUMERIC(5, 4),
    label     sentiment_label
);

CREATE INDEX idx_aspects_review ON aspect_scores(review_id);
CREATE INDEX idx_aspects_aspect ON aspect_scores(aspect);

-- ------------------------------------------------------------
-- 5. root_causes (NLP topic clustering output)
-- ------------------------------------------------------------
CREATE TABLE root_causes (
    id         BIGSERIAL PRIMARY KEY,
    entity_id  BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    aspect     VARCHAR(50)   NOT NULL,
    cause_text TEXT          NOT NULL,
    frequency  INT           NOT NULL DEFAULT 1,
    severity   NUMERIC(3, 2),
    created_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_root_causes_entity ON root_causes(entity_id);

-- ------------------------------------------------------------
-- 6. reputation_scores (Daily composite score)
-- ------------------------------------------------------------
CREATE TABLE reputation_scores (
    id              BIGSERIAL PRIMARY KEY,
    entity_id       BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    score           NUMERIC(5, 2) NOT NULL,
    sentiment_score NUMERIC(5, 2),
    rating_score    NUMERIC(5, 2),
    volume_score    NUMERIC(5, 2),
    recency_score   NUMERIC(5, 2),
    trend           VARCHAR(20),              -- 'improving', 'stable', 'declining'
    score_date      DATE          NOT NULL DEFAULT CURRENT_DATE,
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_rep_score_entity_date ON reputation_scores(entity_id, score_date);

-- ------------------------------------------------------------
-- 7. alerts
-- ------------------------------------------------------------
CREATE TABLE alerts (
    id          BIGSERIAL PRIMARY KEY,
    entity_id   BIGINT         NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    message     TEXT           NOT NULL,
    severity    alert_severity NOT NULL,
    is_resolved BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMP
);

CREATE INDEX idx_alerts_entity   ON alerts(entity_id);
CREATE INDEX idx_alerts_severity ON alerts(severity);

-- ------------------------------------------------------------
-- 8. forecasts (Predicted reputation scores)
-- ------------------------------------------------------------
CREATE TABLE forecasts (
    id              BIGSERIAL PRIMARY KEY,
    entity_id       BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    target_date     DATE          NOT NULL,
    predicted_score NUMERIC(5, 2) NOT NULL,
    lower_bound     NUMERIC(5, 2),
    upper_bound     NUMERIC(5, 2),
    model_used      VARCHAR(50),              -- 'prophet', 'arima', 'lstm', 'ensemble'
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_forecast_entity_date ON forecasts(entity_id, target_date);
