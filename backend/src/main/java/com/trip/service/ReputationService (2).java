package com.trip.service;

import com.trip.dto.response.ReputationResponse;
import com.trip.entity.*;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReputationService {

    // Weights from the README: Sentiment 40%, Rating 30%, Volume 20%, Recency 10%
    private static final BigDecimal W_SENTIMENT = new BigDecimal("0.40");
    private static final BigDecimal W_RATING    = new BigDecimal("0.30");
    private static final BigDecimal W_VOLUME    = new BigDecimal("0.20");
    private static final BigDecimal W_RECENCY   = new BigDecimal("0.10");

    private final TourismEntityRepository entityRepository;
    private final ReviewRepository reviewRepository;
    private final ReputationScoreRepository reputationRepository;
    private final ForecastRepository forecastRepository;

    /**
     * Returns the latest reputation score for an entity, with forecast.
     */
    public ReputationResponse getReputation(Long entityId) {
        TourismEntity entity = entityRepository.findById(entityId)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not found: " + entityId));

        ReputationScore latest = reputationRepository
                .findTopByEntityIdOrderByScoreDateDesc(entityId)
                .orElseGet(() -> computeAndSave(entity));

        // 30/60/90 day forecast
        LocalDate today = LocalDate.now();
        BigDecimal f30 = getForecast(entityId, today.plusDays(30));
        BigDecimal f60 = getForecast(entityId, today.plusDays(60));
        BigDecimal f90 = getForecast(entityId, today.plusDays(90));

        return ReputationResponse.builder()
                .entityId(entityId)
                .entityName(entity.getName())
                .reputationScore(latest.getScore())
                .trend(latest.getTrend())
                .scoreDate(latest.getScoreDate())
                .breakdown(ReputationResponse.ScoreBreakdown.builder()
                        .sentimentScore(latest.getSentimentScore())
                        .ratingScore(latest.getRatingScore())
                        .volumeScore(latest.getVolumeScore())
                        .recencyScore(latest.getRecencyScore())
                        .build())
                .forecast(ReputationResponse.ForecastSummary.builder()
                        .days30(f30).days60(f60).days90(f90)
                        .build())
                .build();
    }

    /**
     * Recomputes and persists today's reputation score for an entity.
     */
    @Transactional
    public ReputationScore computeAndSave(TourismEntity entity) {
        BigDecimal sentimentScore = computeSentimentScore(entity.getId());
        BigDecimal ratingScore    = computeRatingScore(entity.getId());
        BigDecimal volumeScore    = computeVolumeScore(entity.getId());
        BigDecimal recencyScore   = computeRecencyScore(entity.getId());

        BigDecimal composite = sentimentScore.multiply(W_SENTIMENT)
                .add(ratingScore.multiply(W_RATING))
                .add(volumeScore.multiply(W_VOLUME))
                .add(recencyScore.multiply(W_RECENCY))
                .setScale(2, RoundingMode.HALF_UP);

        String trend = computeTrend(entity.getId(), composite);

        ReputationScore score = reputationRepository
                .findByEntityIdAndScoreDate(entity.getId(), LocalDate.now())
                .orElse(ReputationScore.builder().entity(entity).scoreDate(LocalDate.now()).build());

        score.setScore(composite);
        score.setSentimentScore(sentimentScore);
        score.setRatingScore(ratingScore);
        score.setVolumeScore(volumeScore);
        score.setRecencyScore(recencyScore);
        score.setTrend(trend);

        log.info("Computed reputation score={} for entity id={}", composite, entity.getId());
        return reputationRepository.save(score);
    }

    // ── Score component calculations ────────────────────────────────────────

    /**
     * Sentiment score: % of POSITIVE sentiments * 100
     */
    private BigDecimal computeSentimentScore(Long entityId) {
        // Placeholder — real impl queries sentiments table
        // Replace with: sentimentRepository.countPositiveByEntityId(entityId) / total * 100
        return BigDecimal.valueOf(75);
    }

    /**
     * Rating score: (avgRating / 5) * 100
     */
    private BigDecimal computeRatingScore(Long entityId) {
        Double avg = reviewRepository.findAverageRatingByEntityId(entityId);
        if (avg == null) return BigDecimal.valueOf(50);
        return BigDecimal.valueOf((avg / 5.0) * 100).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Volume score: log-normalised review count, capped at 100
     */
    private BigDecimal computeVolumeScore(Long entityId) {
        long count = reviewRepository.countByEntityId(entityId);
        double score = Math.min(100, (Math.log1p(count) / Math.log1p(500)) * 100);
        return BigDecimal.valueOf(score).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Recency score: % of reviews in last 90 days
     */
    private BigDecimal computeRecencyScore(Long entityId) {
        List<Review> recent = reviewRepository.findRecentByEntity(entityId, LocalDate.now().minusDays(90));
        long total = reviewRepository.countByEntityId(entityId);
        if (total == 0) return BigDecimal.valueOf(50);
        double score = Math.min(100, ((double) recent.size() / total) * 200);
        return BigDecimal.valueOf(score).setScale(2, RoundingMode.HALF_UP);
    }

    private String computeTrend(Long entityId, BigDecimal currentScore) {
        return reputationRepository.findTopByEntityIdOrderByScoreDateDesc(entityId)
                .map(prev -> {
                    int cmp = currentScore.compareTo(prev.getScore());
                    if (cmp > 0) return "improving";
                    if (cmp < 0) return "declining";
                    return "stable";
                })
                .orElse("stable");
    }

    private BigDecimal getForecast(Long entityId, LocalDate date) {
        return forecastRepository.findByEntityIdAndTargetDate(entityId, date)
                .map(Forecast::getPredictedScore)
                .orElse(null);
    }
}
