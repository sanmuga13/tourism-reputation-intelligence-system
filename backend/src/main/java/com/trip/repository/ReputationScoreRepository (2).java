package com.trip.repository;

import com.trip.entity.ReputationScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReputationScoreRepository extends JpaRepository<ReputationScore, Long> {

    Optional<ReputationScore> findByEntityIdAndScoreDate(Long entityId, LocalDate date);

    List<ReputationScore> findByEntityIdOrderByScoreDateDesc(Long entityId);

    @Query("SELECT rs FROM ReputationScore rs WHERE rs.entity.id = :entityId AND rs.scoreDate >= :since ORDER BY rs.scoreDate ASC")
    List<ReputationScore> findHistoryByEntity(@Param("entityId") Long entityId, @Param("since") LocalDate since);

    Optional<ReputationScore> findTopByEntityIdOrderByScoreDateDesc(Long entityId);
}
