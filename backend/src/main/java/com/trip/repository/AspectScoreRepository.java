package com.trip.repository;

import com.trip.entity.AspectScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AspectScoreRepository extends JpaRepository<AspectScore, Long> {

    List<AspectScore> findByReviewId(Long reviewId);
}
