package com.trip.dto.response;

import com.trip.entity.Review;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @Builder
public class ReviewResponse {
    private Long id;
    private Long entityId;
    private String entityName;
    private Review.ReviewSource source;
    private String reviewer;
    private String reviewText;
    private BigDecimal rating;
    private LocalDate reviewDate;
    private String sentimentLabel;
    private BigDecimal sentimentConfidence;
    private LocalDateTime createdAt;
}
