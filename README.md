<div align="center">

<!-- ANIMATED BANNER — paste this SVG into docs/banner.svg and reference it, OR use the SVG inline -->

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   ████████╗██████╗ ██╗██████╗                                       ║
║      ██╔══╝██╔══██╗██║██╔══██╗                                      ║
║      ██║   ██████╔╝██║██████╔╝                                      ║
║      ██║   ██╔══██╗██║██╔═══╝                                       ║
║      ██║   ██║  ██║██║██║                                           ║
║      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝                                          ║
║                                                                      ║
║        Tourism Reputation Intelligence Platform                      ║
║        Know your reputation. Before your guests do.                 ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

# 🌐 Tourism Reputation Intelligence Platform

### *Know your reputation. Before your guests do.*

<br/>

[![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

<br/>

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/sanmuga13/tourism-reputation-intelligence-system/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Status](https://img.shields.io/badge/status-active_development-blue?style=flat-square)]()
[![Made in India](https://img.shields.io/badge/Made_in-India_🇮🇳-orange?style=flat-square)]()

<br/>

> **An enterprise-grade AI platform that transforms raw hotel & travel reviews into actionable reputation intelligence — with root cause analysis, predictive forecasting, competitor benchmarking, and one-click management reports.**

<br/>

[🚀 Live Demo](#live-demo) · [📖 Documentation](#documentation) · [🛠️ Quick Start](#quick-start) · [🗺️ Roadmap](#development-roadmap) · [👥 Team](#team)

---

</div>

<br/>

## 🎯 The Problem We're Solving

Hotels, restaurants, and tourism boards collect **thousands of reviews** across Google, TripAdvisor, Yelp, and Reddit every month.

**The current reality:**

```
❌  Managers manually read reviews — hours of work, subjective conclusions
❌  Platforms show you a star rating — not WHY it dropped
❌  No early warning before a reputation crisis hits
❌  No intelligence on what competitors are doing better
❌  No AI-generated action plan — just data, no direction
```

**What TRIP delivers:**

```
✅  Automated ingestion from multiple review sources
✅  AI-powered sentiment + aspect analysis (Food, Staff, Cleanliness, etc.)
✅  Root cause extraction — not just scores, but REASONS
✅  Reputation forecasting — see next month before it happens
✅  Competitor gap intelligence — know exactly where you're losing
✅  One-click AI management reports — PDF, ready to present
```

---

<br/>

## ✨ Platform Highlights

<table>
<tr>
<td width="50%">

### 🧠 Intelligent Sentiment Analysis
- BERT-powered multi-label classification
- Aspect-Based Sentiment Analysis (ABSA)
- 7 tourism-specific dimensions tracked
- `Food · Staff · Cleanliness · Safety · Value · Location · Amenities`

</td>
<td width="50%">

### 📊 Reputation Score Engine
- Composite 0–100 reputation score
- Weighted formula: Sentiment (40%) + Ratings (30%) + Volume (20%) + Recency (10%)
- Daily score tracking & historical trends
- Alert system for negative spikes

</td>
</tr>
<tr>
<td width="50%">

### 🔍 Root Cause Analysis ⭐ *Differentiator*
- Goes beyond "Staff score = 65%"
- Surfaces **why**: *"Slow check-in · Poor communication · Unfriendly reception"*
- Clusters complaints using NLP topic modeling
- Prioritized by frequency and severity

</td>
<td width="50%">

### 🔮 Reputation Forecasting ⭐ *Differentiator*
- Predicts next 30/60/90 day reputation score
- Models: Prophet · ARIMA · LSTM ensemble
- Identifies seasonal dips before they arrive
- Integrates external event signals

</td>
</tr>
<tr>
<td width="50%">

### 🏆 Competitor Intelligence ⭐ *Differentiator*
- Multi-entity comparison dashboard
- Gap analysis: *"Competitor leads Food +12%, Staff +15%"*
- Benchmark against city/category averages
- Trend correlation across competitors

</td>
<td width="50%">

### 📋 AI Report Generator ⭐ *Differentiator*
- One-click weekly management report
- Sections: Highlights · Complaints · Trends · Predictions · Actions
- Export to PDF — board-ready
- GPT-powered narrative summaries

</td>
</tr>
</table>

---

<br/>

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     TOURISM REPUTATION INTELLIGENCE                      │
│                                                                          │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │   DATA SOURCES   │    │   SPRING BOOT    │    │  AI / NLP ENGINE │  │
│  │                  │    │     BACKEND      │    │                  │  │
│  │ • Google Places  │───▶│                  │───▶│ • BERT Sentiment │  │
│  │ • Yelp API       │    │ • REST APIs      │    │ • ABSA Aspects   │  │
│  │ • Reddit API     │    │ • JPA / ORM      │    │ • Root Causes    │  │
│  │ • Kaggle CSV     │    │ • Reputation Eng │    │ • Forecasting    │  │
│  │ • TripAdvisor    │    │ • Scheduler      │    │ • Report Gen     │  │
│  └──────────────────┘    └────────┬─────────┘    └────────┬─────────┘  │
│                                   │                        │            │
│                          ┌────────▼─────────┐             │            │
│                          │    POSTGRESQL     │◀────────────┘            │
│                          │                  │                           │
│                          │ • entities       │                           │
│                          │ • reviews        │                           │
│                          │ • sentiments     │                           │
│                          │ • aspect_scores  │                           │
│                          │ • reputation     │                           │
│                          │ • alerts         │                           │
│                          └────────┬─────────┘                          │
│                                   │                                     │
│                          ┌────────▼─────────┐                          │
│                          │  REACT DASHBOARD  │                          │
│                          │                  │                           │
│                          │ • Overview        │                          │
│                          │ • Entity Details  │                          │
│                          │ • Competitor View │                          │
│                          │ • Reports & Alerts│                          │
│                          └──────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────┘
```

<br/>

### Technology Decisions

| Layer | Technology | Why |
|-------|-----------|-----|
| Backend | Spring Boot 3 + Java 21 | Production-grade REST APIs, Virtual Threads |
| AI Service | Python + FastAPI | Best ML/NLP ecosystem |
| NLP Models | HuggingFace Transformers | State-of-the-art sentiment models |
| Forecasting | Prophet + ARIMA + LSTM | Ensemble for accuracy |
| Database | PostgreSQL | Relational integrity for reputation data |
| Frontend | React 18 | Component architecture, rich charts |
| Container | Docker + Compose | One-command local setup |
| CI/CD | GitHub Actions | Automated testing on every push |

---

<br/>

## 📁 Project Structure

```
tourism-reputation-intelligence-system/
│
├── 📂 backend/                          # Spring Boot 3 Application
│   └── src/main/java/com/trip/
│       ├── controller/                  # REST endpoints
│       ├── service/                     # Business logic
│       ├── repository/                  # Spring Data JPA
│       ├── entity/                      # JPA models
│       ├── dto/                         # Request/Response DTOs
│       ├── config/                      # App configuration
│       └── exception/                   # Global error handling
│
├── 📂 ai-service/                       # Python FastAPI Service
│   ├── main.py                          # FastAPI application
│   ├── sentiment/                       # BERT sentiment pipeline
│   ├── aspects/                         # ABSA extraction
│   ├── forecasting/                     # Prophet/ARIMA/LSTM
│   ├── reports/                         # PDF generation
│   └── requirements.txt
│
├── 📂 frontend/                         # React Dashboard
│   ├── src/
│   │   ├── pages/                       # Dashboard, Entity, Competitors, Reports
│   │   ├── components/                  # Reusable UI components
│   │   └── services/                    # API client
│   └── package.json
│
├── 📂 database/
│   ├── schema.sql                       # Complete DB schema
│   └── seed_data.sql                    # Sample data
│
├── 📂 docs/
│   ├── api-reference.md                 # API documentation
│   ├── architecture.md                  # Architecture decisions
│   └── er-diagram.png                   # Entity-Relationship diagram
│
├── 📂 deployment/
│   ├── docker-compose.yml               # Full stack local setup
│   ├── Dockerfile.backend
│   ├── Dockerfile.ai-service
│   └── Dockerfile.frontend
│
├── .github/
│   └── workflows/
│       ├── ci-backend.yml
│       └── ci-ai-service.yml
│
└── README.md
```

---

<br/>

## ⚡ Quick Start

### Prerequisites

```bash
# Required
Java 21+         java --version
Maven 3.9+       mvn --version
Python 3.11+     python --version
PostgreSQL 15+   psql --version
Node.js 20+      node --version
Docker           docker --version   # optional but recommended
```

### Option A — Docker (Recommended, One Command)

```bash
# Clone the repository
git clone https://github.com/sanmuga13/tourism-reputation-intelligence-system.git
cd tourism-reputation-intelligence-system

# Copy environment config
cp .env.example .env

# Launch everything
docker compose up --build

# Access:
# 🌐 Frontend:    http://localhost:3000
# 🔧 Backend API: http://localhost:8080
# 🤖 AI Service:  http://localhost:8000
# 📚 Swagger UI:  http://localhost:8080/swagger-ui.html
```

### Option B — Manual Setup

<details>
<summary><b>Click to expand manual setup instructions</b></summary>

#### 1. Database Setup

```sql
-- Create database
CREATE DATABASE trip_db;
CREATE USER trip_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE trip_db TO trip_user;

-- Run schema
psql -U trip_user -d trip_db -f database/schema.sql
psql -U trip_user -d trip_db -f database/seed_data.sql
```

#### 2. Backend (Spring Boot)

```bash
cd backend

# Configure database in src/main/resources/application.yml
# spring.datasource.url=jdbc:postgresql://localhost:5432/trip_db

mvn clean install
mvn spring-boot:run

# Verify:
curl http://localhost:8080/health
# {"status":"running","version":"1.0.0","timestamp":"..."}
```

#### 3. AI Service (Python FastAPI)

```bash
cd ai-service
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Verify:
curl http://localhost:8000/health
```

#### 4. Frontend (React)

```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000
```

</details>

---

<br/>

## 🔌 API Reference

### Health Check
```http
GET /health
```
```json
{
  "status": "running",
  "version": "1.0.0",
  "timestamp": "2026-06-14T10:30:00Z"
}
```

### Entity APIs
```http
GET    /api/v1/entities              # List all entities with pagination
GET    /api/v1/entities/{id}         # Get entity details + reputation score
POST   /api/v1/entities              # Create new entity
PUT    /api/v1/entities/{id}         # Update entity
DELETE /api/v1/entities/{id}         # Remove entity
```

### Review APIs
```http
GET  /api/v1/reviews                 # All reviews
GET  /api/v1/reviews/{entityId}      # Reviews for specific entity
POST /api/v1/reviews/ingest          # Trigger review collection
```

### Sentiment Analysis
```http
POST /analyze
Content-Type: application/json

{
  "review": "Food was excellent but staff were extremely rude and slow."
}
```
```json
{
  "sentiment": "mixed",
  "confidence": 0.91,
  "aspects": {
    "food":      { "label": "positive", "score": 0.96 },
    "staff":     { "label": "negative", "score": 0.88 },
    "cleanliness": { "label": "neutral", "score": 0.50 }
  },
  "root_causes": [
    "Slow service response",
    "Staff attitude and professionalism"
  ]
}
```

### Reputation Score
```http
GET /api/v1/reputation/{entityId}
```
```json
{
  "entityId": 1,
  "entityName": "Taj Hotel Chennai",
  "reputationScore": 88,
  "trend": "stable",
  "breakdown": {
    "sentiment":     { "score": 85, "weight": "40%" },
    "rating":        { "score": 92, "weight": "30%" },
    "reviewVolume":  { "score": 87, "weight": "20%" },
    "recency":       { "score": 90, "weight": "10%" }
  },
  "forecast": {
    "30days": 85,
    "60days": 83,
    "90days": 86
  }
}
```

### Competitor Analysis
```http
GET /api/v1/competitors/compare?entities=1,2,3
```
```json
{
  "baseline": "Hotel A",
  "competitors": [
    {
      "name": "Hotel B",
      "overallGap": "+7.2",
      "advantages": [
        { "aspect": "food",  "gap": "+12%" },
        { "aspect": "staff", "gap": "+15%" },
        { "aspect": "value", "gap": "+8%"  }
      ]
    }
  ]
}
```

📚 **[Full API Documentation →](docs/api-reference.md)** · **[Swagger UI](http://localhost:8080/swagger-ui.html)**

---

<br/>

## 🗺️ Development Roadmap

```
Phase 0  ━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  DONE ✅
         GitHub Setup · Branch Strategy · Project Board

Phase 1  ━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  DONE ✅
         Spring Boot Foundation · Layered Architecture · /health

Phase 2  ━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  DONE ✅
         PostgreSQL Schema · ER Diagram · SQL Scripts

Phase 3  ━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  🔄 IN PROGRESS
         Entity & Review CRUD APIs · Swagger · Postman Collection

Phase 4  ━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ⏳ UPCOMING
         Data Collectors · Google Places · Reddit · Kaggle

Phase 5  ━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━  ⏳ UPCOMING
         Python FastAPI · BERT Sentiment Pipeline

Phase 6  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━  ⏳ UPCOMING
         Aspect-Based Sentiment Analysis · 7 Dimensions

Phase 7  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━  ⏳ UPCOMING
         Reputation Score Engine · Weighted Formula

Phase 8  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━  ⭐ DIFFERENTIATOR
         Root Cause Analysis · NLP Topic Clustering

Phase 9  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━  ⭐ DIFFERENTIATOR
         AI Recommendation Engine · GPT-powered Actions

Phase 10 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━  ⭐ DIFFERENTIATOR
         Trend Analysis · Prophet/ARIMA/LSTM Forecasting

Phase 11 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━  ⭐ DIFFERENTIATOR
         Competitor Intelligence · Gap Analysis Engine

Phase 12 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●  ⭐ DIFFERENTIATOR
         AI Report Generator · PDF Export · Board-ready
```

---

<br/>

## 📊 Database Schema

```sql
-- Core Entities (Hotels, Restaurants, Attractions)
entities          id · name · type · city · country · rating

-- Reviews from all sources
reviews           id · entity_id · source · review_text · rating · review_date

-- AI Analysis Results
sentiments        id · review_id · label · confidence_score
aspect_scores     id · review_id · aspect · score · label
root_causes       id · entity_id · aspect · cause_text · frequency

-- Intelligence Layer
reputation_scores id · entity_id · score · breakdown_json · date
alerts            id · entity_id · message · severity · created_at
forecasts         id · entity_id · target_date · predicted_score · model_used
```

📊 **[View Full ER Diagram →](docs/er-diagram.png)**

---

<br/>

## 🧪 Testing

```bash
# Backend unit + integration tests
cd backend
mvn test

# Coverage report
mvn jacoco:report
open target/site/jacoco/index.html

# AI Service tests
cd ai-service
pytest tests/ -v --cov=. --cov-report=html

# API tests (Postman)
newman run docs/postman-collection.json
```

| Layer | Framework | Coverage Target |
|-------|-----------|----------------|
| Spring Boot Service Layer | JUnit 5 + Mockito | 75%+ |
| Spring Boot Controllers | MockMvc | 70%+ |
| Python AI Service | pytest | 70%+ |
| E2E API | Newman (Postman) | All endpoints |

---

<br/>

## 👥 Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Sanmuga** | Full-Stack Lead | Spring Boot Backend · System Architecture |
| **Vignesh** | AI/ML Engineer | Python FastAPI · NLP Models · Forecasting |
| *(open)* | Frontend | React Dashboard · Data Visualization |
| *(open)* | DevOps | Docker · CI/CD · Deployment |

---

<br/>

## 🤝 Contributing

We follow a professional Git workflow:

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make commits with conventional format
git commit -m "feat: add sentiment analysis endpoint"
git commit -m "fix: handle null review text in ABSA"
git commit -m "docs: update API reference for /analyze"

# 3. Push and open Pull Request → develop
git push origin feature/your-feature-name
# Open PR on GitHub, request review
```

**Commit Convention:** `feat | fix | docs | test | refactor | chore`

📖 **[Read CONTRIBUTING.md →](CONTRIBUTING.md)**

---

<br/>

## 📜 License

```
MIT License — Copyright (c) 2026 sanmuga13 & contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software ... see LICENSE file for full text.
```

---

<br/>

## 🙏 Acknowledgments

- [HuggingFace Transformers](https://huggingface.co/) — Pre-trained NLP models
- [Spring Boot](https://spring.io/) — Enterprise Java framework
- [Meta Prophet](https://facebook.github.io/prophet/) — Time series forecasting
- [Kaggle Hotel Reviews Dataset](https://www.kaggle.com/) — Training & testing data

---

<br/>

<div align="center">

**Built with ❤️ by Team TRIP · Tamil Nadu, India 🇮🇳**

*Transforming reviews into reputation intelligence — one API call at a time.*

---

⭐ **Star this repo if you find it useful** · 🍴 **Fork to build your own version** · 🐛 **[Open an issue](https://github.com/sanmuga13/tourism-reputation-intelligence-system/issues)**

</div>