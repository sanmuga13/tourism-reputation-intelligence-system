package com.trip.repository;

import com.trip.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByEntityId(Long entityId, Pageable pageable);

    List<Review> findByEntityIdAndSource(Long entityId, Review.ReviewSource source);

    long countByEntityId(Long entityId);

    @Query("SELECT r FROM Review r WHERE r.entity.id = :entityId AND r.reviewDate >= :since ORDER BY r.reviewDate DESC")
    List<Review> findRecentByEntity(@Param("entityId") Long entityId, @Param("since") LocalDate since);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.entity.id = :entityId")
    Double findAverageRatingByEntityId(@Param("entityId") Long entityId);
}
