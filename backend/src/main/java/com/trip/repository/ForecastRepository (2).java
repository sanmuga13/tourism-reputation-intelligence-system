package com.trip.repository;

import com.trip.entity.Forecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ForecastRepository extends JpaRepository<Forecast, Long> {

    List<Forecast> findByEntityIdAndTargetDateAfterOrderByTargetDateAsc(Long entityId, LocalDate after);

    Optional<Forecast> findByEntityIdAndTargetDate(Long entityId, LocalDate targetDate);
}
