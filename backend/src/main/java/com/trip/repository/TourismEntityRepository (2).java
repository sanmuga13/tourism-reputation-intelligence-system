package com.trip.repository;

import com.trip.entity.TourismEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourismEntityRepository extends JpaRepository<TourismEntity, Long> {

    List<TourismEntity> findByCity(String city);

    List<TourismEntity> findByType(TourismEntity.EntityType type);

    List<TourismEntity> findByCityAndType(String city, TourismEntity.EntityType type);

    @Query("SELECT e FROM TourismEntity e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<TourismEntity> searchByName(@Param("name") String name);
}
