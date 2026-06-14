package com.trip.controller;

import com.trip.dto.request.CreateEntityRequest;
import com.trip.dto.response.ApiResponse;
import com.trip.dto.response.EntityResponse;
import com.trip.entity.TourismEntity;
import com.trip.service.TourismEntityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/entities")
@RequiredArgsConstructor
@Tag(name = "Entities", description = "Hotels, Restaurants, Attractions")
public class EntityController {

    private final TourismEntityService entityService;

    @GetMapping
    @Operation(summary = "List all entities, optionally filtered by city/type")
    public ApiResponse<List<EntityResponse>> getAll(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) TourismEntity.EntityType type) {
        return ApiResponse.ok(entityService.searchEntities(city, type));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single entity by ID")
    public ApiResponse<EntityResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(entityService.getEntityById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new entity")
    public ApiResponse<EntityResponse> create(@Valid @RequestBody CreateEntityRequest request) {
        return ApiResponse.ok("Entity created", entityService.createEntity(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing entity")
    public ApiResponse<EntityResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CreateEntityRequest request) {
        return ApiResponse.ok("Entity updated", entityService.updateEntity(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete an entity")
    public void delete(@PathVariable Long id) {
        entityService.deleteEntity(id);
    }
}
