package com.trip.service;

import com.trip.entity.*;
import com.trip.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiClientService {

    private final WebClient.Builder webClientBuilder;
    private final ReviewRepository reviewRepository;
    private final SentimentRepository sentimentRepository;
    private final AspectScoreRepository aspectScoreRepository;
    private final RootCauseRepository rootCauseRepository;

    @Value("${ai.service.base-url:http://localhost:8000}")
    private String aiBaseUrl;

    /**
     * Calls Python /analyze endpoint and persists results.
     */
    @Transactional
    public void analyzeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found: " + reviewId));

        WebClient client = webClientBuilder.baseUrl(aiBaseUrl).build();

        Map<?, ?> result = null;
        try {
            result = client.post()
                    .uri("/analyze")
                    .bodyValue(Map.of(
                            "review_id", reviewId,
                            "text", review.getReviewText()
                    ))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .timeout(Duration.ofSeconds(6))
                    .block();
        } catch (Exception ex) {
            log.warn("AI service call failed or timed out for review id={}: {}", reviewId, ex.getMessage());
            return;
        }

        if (result == null) {
            log.warn("No response from AI service for review id={}", reviewId);
            return;
        }

        // Persist sentiment
        String label = (String) result.get("sentiment_label");
        Double confidence = (Double) result.get("confidence");
        if (label != null) {
            try {
                Sentiment sentiment = Sentiment.builder()
                        .review(review)
                        .label(Sentiment.SentimentLabel.valueOf(label.toUpperCase()))
                        .confidenceScore(BigDecimal.valueOf(confidence != null ? confidence : 0.5))
                        .build();
                sentimentRepository.save(sentiment);
            } catch (Exception e) {
                log.warn("Failed to parse sentiment label '{}': {}", label, e.getMessage());
            }
        }

        // Persist aspect scores
        Object aspects = result.get("aspects");
        if (aspects instanceof Map<?, ?> aspectMap) {
            aspectMap.forEach((aspect, scoreObj) -> {
                if (scoreObj instanceof Number num) {
                    AspectScore as = AspectScore.builder()
                            .review(review)
                            .aspect(aspect.toString())
                            .score(BigDecimal.valueOf(num.doubleValue()))
                            .build();
                    aspectScoreRepository.save(as);
                }
            });
        }

        log.info("AI analysis complete for review id={} -> sentiment={}", reviewId, label);
    }
}
