package com.trip.dto.response;

import com.trip.entity.TourismEntity;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Builder
public class EntityResponse {
    private Long id;
    private String name;
    private TourismEntity.EntityType type;
    private String city;
    private String country;
    private String address;
    private BigDecimal avgRating;
    private long reviewCount;
    private LocalDateTime createdAt;
}
