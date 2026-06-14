package com.trip.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Data @Builder
public class ReputationResponse {
    private Long entityId;
    private String entityName;
    private BigDecimal reputationScore;
    private String trend;
    private LocalDate scoreDate;
    private ScoreBreakdown breakdown;
    private ForecastSummary forecast;

    @Data @Builder
    public static class ScoreBreakdown {
        private BigDecimal sentimentScore;
        private BigDecimal ratingScore;
        private BigDecimal volumeScore;
        private BigDecimal recencyScore;
    }

    @Data @Builder
    public static class ForecastSummary {
        private BigDecimal days30;
        private BigDecimal days60;
        private BigDecimal days90;
    }
}
