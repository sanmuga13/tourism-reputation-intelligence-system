package com.trip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "aspect_scores")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AspectScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    @Column(nullable = false)
    private String aspect;   // Food, Staff, Cleanliness, Safety, Value, Location, Amenities

    @Column(precision = 5, scale = 4)
    private BigDecimal score;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "sentiment_label")
    private Sentiment.SentimentLabel label;
}
