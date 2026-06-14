package com.trip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reputation_scores")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReputationScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entity_id", nullable = false)
    private TourismEntity entity;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal score;

    @Column(name = "sentiment_score", precision = 5, scale = 2)
    private BigDecimal sentimentScore;

    @Column(name = "rating_score", precision = 5, scale = 2)
    private BigDecimal ratingScore;

    @Column(name = "volume_score", precision = 5, scale = 2)
    private BigDecimal volumeScore;

    @Column(name = "recency_score", precision = 5, scale = 2)
    private BigDecimal recencyScore;

    private String trend;   // improving, stable, declining

    @Column(name = "score_date", nullable = false)
    private LocalDate scoreDate = LocalDate.now();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
