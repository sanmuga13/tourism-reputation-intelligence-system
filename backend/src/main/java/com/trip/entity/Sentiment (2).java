package com.trip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sentiments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Sentiment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "sentiment_label")
    private SentimentLabel label;

    @Column(name = "confidence_score", nullable = false, precision = 5, scale = 4)
    private BigDecimal confidenceScore;

    @Column(name = "analyzed_at")
    private LocalDateTime analyzedAt = LocalDateTime.now();

    public enum SentimentLabel {
        POSITIVE, NEUTRAL, NEGATIVE
    }
}
