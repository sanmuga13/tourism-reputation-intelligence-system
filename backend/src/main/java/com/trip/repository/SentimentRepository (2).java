package com.trip.repository;

import com.trip.entity.Sentiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentimentRepository extends JpaRepository<Sentiment, Long> {}
