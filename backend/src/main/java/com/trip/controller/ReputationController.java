package com.trip.controller;

import com.trip.dto.response.ApiResponse;
import com.trip.dto.response.ReputationResponse;
import com.trip.entity.ReputationScore;
import com.trip.entity.TourismEntity;
import com.trip.repository.ReputationScoreRepository;
import com.trip.service.ReputationService;
import com.trip.service.TourismEntityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reputation")
@RequiredArgsConstructor
@Tag(name = "Reputation", description = "Reputation scores and history")
public class ReputationController {

    private final ReputationService reputationService;
    private final TourismEntityService entityService;
    private final ReputationScoreRepository reputationRepository;

    @GetMapping("/{entityId}")
    @Operation(summary = "Get latest reputation score with forecast for an entity")
    public ApiResponse<ReputationResponse> getReputation(@PathVariable Long entityId) {
        return ApiResponse.ok(reputationService.getReputation(entityId));
    }

    @GetMapping("/{entityId}/history")
    @Operation(summary = "Get historical reputation scores (last N days)")
    public ApiResponse<List<ReputationScore>> getHistory(
            @PathVariable Long entityId,
            @RequestParam(defaultValue = "90") int days) {
        List<ReputationScore> history = reputationRepository
                .findHistoryByEntity(entityId, LocalDate.now().minusDays(days));
        return ApiResponse.ok(history);
    }

    @PostMapping("/{entityId}/recompute")
    @Operation(summary = "Manually trigger reputation score recomputation")
    public ApiResponse<ReputationScore> recompute(@PathVariable Long entityId) {
        TourismEntity entity = entityService.findOrThrow(entityId);
        ReputationScore score = reputationService.computeAndSave(entity);
        return ApiResponse.ok("Reputation recomputed", score);
    }
}
