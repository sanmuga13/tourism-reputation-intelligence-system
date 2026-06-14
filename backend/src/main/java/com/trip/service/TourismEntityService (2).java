package com.trip.service;

import com.trip.dto.request.CreateEntityRequest;
import com.trip.dto.response.EntityResponse;
import com.trip.entity.TourismEntity;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.ReviewRepository;
import com.trip.repository.TourismEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TourismEntityService {

    private final TourismEntityRepository entityRepository;
    private final ReviewRepository reviewRepository;

    public List<EntityResponse> getAllEntities() {
        return entityRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public EntityResponse getEntityById(Long id) {
        TourismEntity entity = findOrThrow(id);
        return toResponse(entity);
    }

    public List<EntityResponse> searchEntities(String city, TourismEntity.EntityType type) {
        List<TourismEntity> results;
        if (city != null && type != null) {
            results = entityRepository.findByCityAndType(city, type);
        } else if (city != null) {
            results = entityRepository.findByCity(city);
        } else if (type != null) {
            results = entityRepository.findByType(type);
        } else {
            results = entityRepository.findAll();
        }
        return results.stream().map(this::toResponse).toList();
    }

    @Transactional
    public EntityResponse createEntity(CreateEntityRequest request) {
        TourismEntity entity = TourismEntity.builder()
                .name(request.getName())
                .type(request.getType())
                .city(request.getCity())
                .country(request.getCountry() != null ? request.getCountry() : "India")
                .address(request.getAddress())
                .build();
        entity = entityRepository.save(entity);
        log.info("Created entity: {} (id={})", entity.getName(), entity.getId());
        return toResponse(entity);
    }

    @Transactional
    public EntityResponse updateEntity(Long id, CreateEntityRequest request) {
        TourismEntity entity = findOrThrow(id);
        entity.setName(request.getName());
        entity.setType(request.getType());
        entity.setCity(request.getCity());
        if (request.getCountry() != null) entity.setCountry(request.getCountry());
        if (request.getAddress() != null) entity.setAddress(request.getAddress());
        return toResponse(entityRepository.save(entity));
    }

    @Transactional
    public void deleteEntity(Long id) {
        TourismEntity entity = findOrThrow(id);
        entityRepository.delete(entity);
        log.info("Deleted entity id={}", id);
    }

    // ── helpers ─────────────────────────────────────────────────────────────

    public TourismEntity findOrThrow(Long id) {
        return entityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not found with id: " + id));
    }

    private EntityResponse toResponse(TourismEntity e) {
        return EntityResponse.builder()
                .id(e.getId())
                .name(e.getName())
                .type(e.getType())
                .city(e.getCity())
                .country(e.getCountry())
                .address(e.getAddress())
                .avgRating(e.getAvgRating())
                .reviewCount(reviewRepository.countByEntityId(e.getId()))
                .createdAt(e.getCreatedAt())
                .build();
    }
}
