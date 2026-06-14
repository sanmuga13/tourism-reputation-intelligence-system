package com.trip.dto.request;

import com.trip.entity.TourismEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateEntityRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Type is required")
    private TourismEntity.EntityType type;

    @NotBlank(message = "City is required")
    private String city;

    private String country = "India";
    private String address;
}
