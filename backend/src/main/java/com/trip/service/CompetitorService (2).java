package com.trip.service;

import com.trip.dto.response.CompetitorResponse;
import com.trip.entity.ReputationScore;
import com.trip.entity.TourismEntity;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.ReputationScoreRepository;
import com.trip.repository.TourismEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompetitorService {

    private final TourismEntityRepository entityRepository;
    private final ReputationScoreRepository reputationRepository;

    /**
     * Compare a baseline entity against a list of competitors.
     * entityIds[0] = baseline, rest = competitors
     */
    public CompetitorResponse compare(List<Long> entityIds) {
        if (entityIds == null || entityIds.size() < 2) {
            throw new IllegalArgumentException("At least 2 entity IDs required for comparison");
        }

        Long baselineId = entityIds.get(0);
        TourismEntity baseline = entityRepository.findById(baselineId)
                .orElseThrow(() -> new ResourceNotFoundException("Baseline entity not found: " + baselineId));

        BigDecimal baselineScore = getLatestScore(baselineId);

        List<CompetitorResponse.CompetitorGap> gaps = entityIds.subList(1, entityIds.size()).stream()
                .map(id -> buildGap(id, baselineScore))
                .toList();

        return CompetitorResponse.builder()
                .baseline(baseline.getName())
                .baselineScore(baselineScore)
                .competitors(gaps)
                .build();
    }

    private CompetitorResponse.CompetitorGap buildGap(Long entityId, BigDecimal baselineScore) {
        TourismEntity entity = entityRepository.findById(entityId)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not found: " + entityId));

        BigDecimal competitorScore = getLatestScore(entityId);
        BigDecimal gap = competitorScore.subtract(baselineScore).setScale(2, RoundingMode.HALF_UP);

        // Aspect gaps — populated after ABSA is live (Phase 6)
        Map<String, BigDecimal> aspectGaps = Map.of();

        return CompetitorResponse.CompetitorGap.builder()
                .entityId(entityId)
                .name(entity.getName())
                .reputationScore(competitorScore)
                .overallGap(gap)
                .aspectGaps(aspectGaps)
                .build();
    }

    private BigDecimal getLatestScore(Long entityId) {
        return reputationRepository.findTopByEntityIdOrderByScoreDateDesc(entityId)
                .map(ReputationScore::getScore)
                .orElse(BigDecimal.ZERO);
    }
}
