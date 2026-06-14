package com.trip;

import com.trip.dto.request.CreateEntityRequest;
import com.trip.dto.response.EntityResponse;
import com.trip.entity.TourismEntity;
import com.trip.exception.ResourceNotFoundException;
import com.trip.repository.ReviewRepository;
import com.trip.repository.TourismEntityRepository;
import com.trip.service.TourismEntityService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EntityServiceTest {

    @Mock TourismEntityRepository entityRepository;
    @Mock ReviewRepository reviewRepository;
    @InjectMocks TourismEntityService entityService;

    @Test
    void createEntity_shouldPersistAndReturn() {
        CreateEntityRequest req = new CreateEntityRequest();
        req.setName("Test Hotel");
        req.setType(TourismEntity.EntityType.HOTEL);
        req.setCity("Chennai");

        TourismEntity saved = TourismEntity.builder()
                .id(1L).name("Test Hotel")
                .type(TourismEntity.EntityType.HOTEL)
                .city("Chennai").country("India").build();

        when(entityRepository.save(any())).thenReturn(saved);
        when(reviewRepository.countByEntityId(1L)).thenReturn(0L);

        EntityResponse response = entityService.createEntity(req);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("Test Hotel");
        verify(entityRepository, times(1)).save(any());
    }

    @Test
    void getEntityById_notFound_shouldThrow() {
        when(entityRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> entityService.getEntityById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("99");
    }
}
