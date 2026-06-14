package com.trip.service;

import com.trip.dto.request.CreateReviewRequest;
import com.trip.dto.response.ReviewResponse;
import com.trip.entity.Review;
import com.trip.entity.Sentiment;
import com.trip.entity.TourismEntity;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TourismEntityService entityService;
    private final AiClientService aiClientService;

    public Page<ReviewResponse> getReviewsByEntity(Long entityId, Pageable pageable) {
        entityService.findOrThrow(entityId);   // validates entity exists
        return reviewRepository.findByEntityId(entityId, pageable)
                .map(this::toResponse);
    }

    public ReviewResponse getReviewById(Long id) {
        Review review = findOrThrow(id);
        return toResponse(review);
    }

    @Transactional
    public ReviewResponse createReview(CreateReviewRequest request) {
        TourismEntity entity = entityService.findOrThrow(request.getEntityId());

        Review review = Review.builder()
                .entity(entity)
                .source(request.getSource())
                .reviewer(request.getReviewer())
                .reviewText(request.getReviewText())
                .rating(request.getRating())
                .reviewDate(request.getReviewDate())
                .build();

        review = reviewRepository.save(review);
        log.info("Saved review id={} for entity id={}", review.getId(), entity.getId());

        if (request.isAnalyzeNow()) {
            triggerAiAnalysis(review.getId());
        }

        return toResponse(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        Review review = findOrThrow(id);
        reviewRepository.delete(review);
    }

    @Async
    public void triggerAiAnalysis(Long reviewId) {
        try {
            log.info("Triggering AI analysis for review id={}", reviewId);
            aiClientService.analyzeReview(reviewId);
        } catch (Exception e) {
            log.error("AI analysis failed for review id={}: {}", reviewId, e.getMessage());
        }
    }

    // ── helpers ─────────────────────────────────────────────────────────────

    public Review findOrThrow(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
    }

    private ReviewResponse toResponse(Review r) {
        String sentimentLabel = null;
        double confidence = 0;
        if (!r.getSentiments().isEmpty()) {
            Sentiment s = r.getSentiments().get(0);
            sentimentLabel = s.getLabel().name();
            confidence = s.getConfidenceScore().doubleValue();
        }
        return ReviewResponse.builder()
                .id(r.getId())
                .entityId(r.getEntity().getId())
                .entityName(r.getEntity().getName())
                .source(r.getSource())
                .reviewer(r.getReviewer())
                .reviewText(r.getReviewText())
                .rating(r.getRating())
                .reviewDate(r.getReviewDate())
                .sentimentLabel(sentimentLabel)
                .createdAt(r.getCreatedAt())
                .build();
    }
}
