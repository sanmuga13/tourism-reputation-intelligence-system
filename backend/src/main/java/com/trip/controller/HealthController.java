package com.trip.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@Tag(name = "Health", description = "Service health check")
public class HealthController {

    @GetMapping({"/health", "/api/v1/health"})
    public Map<String, Object> health() {
        return Map.of(
            "status", "UP",
            "service", "TRIP Backend",
            "timestamp", LocalDateTime.now().toString()
        );
    }
}
