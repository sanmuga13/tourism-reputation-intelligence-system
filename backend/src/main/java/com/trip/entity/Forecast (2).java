package com.trip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "forecasts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Forecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entity_id", nullable = false)
    private TourismEntity entity;

    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;

    @Column(name = "predicted_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal predictedScore;

    @Column(name = "lower_bound", precision = 5, scale = 2)
    private BigDecimal lowerBound;

    @Column(name = "upper_bound", precision = 5, scale = 2)
    private BigDecimal upperBound;

    @Column(name = "model_used")
    private String modelUsed;   // prophet, arima, lstm, ensemble

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
