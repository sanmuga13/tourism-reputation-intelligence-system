package com.trip.controller;

import com.trip.dto.response.ApiResponse;
import com.trip.entity.Alert;
import com.trip.service.AlertService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/alerts")
@RequiredArgsConstructor
@Tag(name = "Alerts", description = "Reputation alerts and notifications")
public class AlertController {

    private final AlertService alertService;

    @GetMapping("/entity/{entityId}")
    @Operation(summary = "Get all alerts for an entity")
    public ApiResponse<List<Alert>> getByEntity(
            @PathVariable Long entityId,
            @RequestParam(defaultValue = "false") boolean unresolvedOnly) {
        return ApiResponse.ok(alertService.getAlertsForEntity(entityId, unresolvedOnly));
    }

    @PatchMapping("/{alertId}/resolve")
    @Operation(summary = "Mark an alert as resolved")
    public ApiResponse<Alert> resolve(@PathVariable Long alertId) {
        return ApiResponse.ok("Alert resolved", alertService.resolveAlert(alertId));
    }
}
