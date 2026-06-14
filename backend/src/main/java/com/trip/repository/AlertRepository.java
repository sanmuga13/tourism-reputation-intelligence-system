package com.trip.repository;

import com.trip.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findByEntityIdOrderByCreatedAtDesc(Long entityId);

    List<Alert> findByEntityIdAndIsResolvedFalseOrderByCreatedAtDesc(Long entityId);

    List<Alert> findBySeverityAndIsResolvedFalse(Alert.AlertSeverity severity);

    long countByEntityIdAndIsResolvedFalse(Long entityId);
}
