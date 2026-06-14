package com.trip.repository;

import com.trip.entity.RootCause;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RootCauseRepository extends JpaRepository<RootCause, Long> {

    List<RootCause> findByEntityIdOrderByFrequencyDesc(Long entityId);

    List<RootCause> findByEntityIdAndAspectOrderByFrequencyDesc(Long entityId, String aspect);
}
