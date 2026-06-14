package com.trip.service;

import com.trip.entity.Alert;
import com.trip.entity.TourismEntity;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.AlertRepository;
import com.trip.repository.TourismEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlertService {

    private final AlertRepository alertRepository;
    private final TourismEntityRepository entityRepository;

    public List<Alert> getAlertsForEntity(Long entityId, boolean unresolvedOnly) {
        if (unresolvedOnly) {
            return alertRepository.findByEntityIdAndIsResolvedFalseOrderByCreatedAtDesc(entityId);
        }
        return alertRepository.findByEntityIdOrderByCreatedAtDesc(entityId);
    }

    @Transactional
    public Alert createAlert(Long entityId, String message, Alert.AlertSeverity severity) {
        TourismEntity entity = entityRepository.findById(entityId)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not found: " + entityId));

        Alert alert = Alert.builder()
                .entity(entity)
                .message(message)
                .severity(severity)
                .isResolved(false)
                .build();

        alert = alertRepository.save(alert);
        log.warn("Alert created [{}] for entity {}: {}", severity, entityId, message);
        return alert;
    }

    @Transactional
    public Alert resolveAlert(Long alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found: " + alertId));
        alert.setIsResolved(true);
        alert.setResolvedAt(LocalDateTime.now());
        return alertRepository.save(alert);
    }
}
