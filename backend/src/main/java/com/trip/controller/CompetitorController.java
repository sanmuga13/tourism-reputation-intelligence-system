package com.trip.controller;

import com.trip.dto.response.ApiResponse;
import com.trip.dto.response.CompetitorResponse;
import com.trip.service.CompetitorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/competitors")
@RequiredArgsConstructor
@Tag(name = "Competitor Intelligence", description = "Compare entities and analyse gaps")
public class CompetitorController {

    private final CompetitorService competitorService;

    @GetMapping("/compare")
    @Operation(summary = "Compare entities. First ID is the baseline, rest are competitors.")
    public ApiResponse<CompetitorResponse> compare(
            @RequestParam List<Long> entities) {
        return ApiResponse.ok(competitorService.compare(entities));
    }
}
