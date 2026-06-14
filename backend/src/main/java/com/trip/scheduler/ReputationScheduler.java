package com.trip.scheduler;

import com.trip.repository.TourismEntityRepository;
import com.trip.service.ReputationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ReputationScheduler {

    private final TourismEntityRepository entityRepository;
    private final ReputationService reputationService;

    /**
     * Every day at 2 AM, recompute reputation scores for all entities.
     */
    @Scheduled(cron = "0 0 2 * * *")
    public void computeDailyReputationScores() {
        log.info("Starting daily reputation score computation...");
        entityRepository.findAll().forEach(entity -> {
            try {
                reputationService.computeAndSave(entity);
            } catch (Exception e) {
                log.error("Failed to compute score for entity id={}: {}", entity.getId(), e.getMessage());
            }
        });
        log.info("Daily reputation score computation complete.");
    }
}
