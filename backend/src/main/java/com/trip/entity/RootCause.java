package com.trip.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "root_causes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RootCause {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entity_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "reviews"})
    private TourismEntity entity;

    @Column(nullable = false)
    private String aspect;

    @Column(name = "cause_text", nullable = false, columnDefinition = "TEXT")
    private String causeText;

    @Column(nullable = false)
    @Builder.Default
    private Integer frequency = 1;

    @Column(precision = 3, scale = 2)
    private BigDecimal severity;

    @org.hibernate.annotations.CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
