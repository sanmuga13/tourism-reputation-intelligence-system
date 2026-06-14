package com.trip.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data @Builder
public class CompetitorResponse {
    private String baseline;
    private BigDecimal baselineScore;
    private List<CompetitorGap> competitors;

    @Data @Builder
    public static class CompetitorGap {
        private Long entityId;
        private String name;
        private BigDecimal reputationScore;
        private BigDecimal overallGap;
        private Map<String, BigDecimal> aspectGaps;  // aspect -> gap %
    }
}
