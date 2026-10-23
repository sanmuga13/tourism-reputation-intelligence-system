-- ============================================================
--  TRIP - Tourism Reputation Intelligence Platform
--  Database Schema (PostgreSQL & H2 Compatible)
-- ============================================================

-- ------------------------------------------------------------
-- 1. entities (Hotels / Restaurants / Attractions)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS entities (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    type        VARCHAR(50)  NOT NULL,
    city        VARCHAR(100) NOT NULL,
    country     VARCHAR(100) NOT NULL DEFAULT 'India',
    address     TEXT,
    avg_rating  NUMERIC(3, 2),
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 2. reviews
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
    id           BIGSERIAL PRIMARY KEY,
    entity_id    BIGINT       NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    source       VARCHAR(50)  NOT NULL,
    reviewer     VARCHAR(255),
    review_text  TEXT         NOT NULL,
    rating       NUMERIC(2, 1),
    review_date  DATE,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_entity ON reviews(entity_id);
CREATE INDEX IF NOT EXISTS idx_reviews_source ON reviews(source);
CREATE INDEX IF NOT EXISTS idx_reviews_date   ON reviews(review_date);

-- ------------------------------------------------------------
-- 3. sentiments (AI output - per review)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sentiments (
    id               BIGSERIAL PRIMARY KEY,
    review_id        BIGINT        NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    label            VARCHAR(50)   NOT NULL,
    confidence_score NUMERIC(5, 4) NOT NULL,
    analyzed_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sentiments_review ON sentiments(review_id);

-- ------------------------------------------------------------
-- 4. aspect_scores (ABSA - 7 tourism dimensions)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS aspect_scores (
    id        BIGSERIAL PRIMARY KEY,
    review_id BIGINT        NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    aspect    VARCHAR(50)   NOT NULL,
    score     NUMERIC(5, 4),
    label     VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_aspects_review ON aspect_scores(review_id);
CREATE INDEX IF NOT EXISTS idx_aspects_aspect ON aspect_scores(aspect);

-- ------------------------------------------------------------
-- 5. root_causes (NLP topic clustering output)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS root_causes (
    id         BIGSERIAL PRIMARY KEY,
    entity_id  BIGINT       NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    aspect     VARCHAR(50)  NOT NULL,
    cause_text TEXT         NOT NULL,
    frequency  INT          NOT NULL DEFAULT 1,
    severity   NUMERIC(3, 2),
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_root_causes_entity ON root_causes(entity_id);

-- ------------------------------------------------------------
-- 6. reputation_scores (daily composite score)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reputation_scores (
    id              BIGSERIAL PRIMARY KEY,
    entity_id       BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    score           NUMERIC(5, 2) NOT NULL,
    sentiment_score NUMERIC(5, 2),
    rating_score    NUMERIC(5, 2),
    volume_score    NUMERIC(5, 2),
    recency_score   NUMERIC(5, 2),
    trend           VARCHAR(20),
    score_date      DATE          NOT NULL DEFAULT CURRENT_DATE,
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_rep_score_entity_date ON reputation_scores(entity_id, score_date);

-- ------------------------------------------------------------
-- 7. alerts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alerts (
    id          BIGSERIAL PRIMARY KEY,
    entity_id   BIGINT      NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    message     TEXT        NOT NULL,
    severity    VARCHAR(50) NOT NULL,
    is_resolved BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_alerts_entity   ON alerts(entity_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);

-- ------------------------------------------------------------
-- 8. forecasts (predicted reputation scores)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS forecasts (
    id              BIGSERIAL PRIMARY KEY,
    entity_id       BIGINT        NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
    target_date     DATE          NOT NULL,
    predicted_score NUMERIC(5, 2) NOT NULL,
    lower_bound     NUMERIC(5, 2),
    upper_bound     NUMERIC(5, 2),
    model_used      VARCHAR(50),
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_forecast_entity_date ON forecasts(entity_id, target_date);
