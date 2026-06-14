package com.trip.controller;

import com.trip.dto.request.CreateReviewRequest;
import com.trip.dto.response.ApiResponse;
import com.trip.dto.response.ReviewResponse;
import com.trip.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Review ingestion and retrieval")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/entity/{entityId}")
    @Operation(summary = "Get paginated reviews for an entity")
    public ApiResponse<Page<ReviewResponse>> getByEntity(
            @PathVariable Long entityId,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        return ApiResponse.ok(reviewService.getReviewsByEntity(entityId, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single review by ID")
    public ApiResponse<ReviewResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(reviewService.getReviewById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Submit a new review (triggers AI analysis if analyzeNow=true)")
    public ApiResponse<ReviewResponse> create(@Valid @RequestBody CreateReviewRequest request) {
        return ApiResponse.ok("Review saved", reviewService.createReview(request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete a review")
    public void delete(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }
}
