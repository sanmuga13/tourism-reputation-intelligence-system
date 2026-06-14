package com.trip.dto.request;

import com.trip.entity.Review;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateReviewRequest {

    @NotNull(message = "Entity ID is required")
    private Long entityId;

    @NotNull(message = "Source is required")
    private Review.ReviewSource source;

    private String reviewer;

    @NotBlank(message = "Review text is required")
    private String reviewText;

    private BigDecimal rating;

    private LocalDate reviewDate;

    // If true, triggers async AI analysis after saving
    private boolean analyzeNow = true;
}
