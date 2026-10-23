package com.trip.config;

import com.trip.entity.TourismEntity;
import com.trip.repository.TourismEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final TourismEntityRepository entityRepository;

    @Override
    public void run(String... args) {
        if (entityRepository.count() == 0) {
            log.info("No tourism entities found in database. Seeding initial demonstration data...");
            List<TourismEntity> seeds = List.of(
                    TourismEntity.builder()
                            .name("Taj Hotel Chennai")
                            .type(TourismEntity.EntityType.HOTEL)
                            .city("Chennai")
                            .country("India")
                            .address("37, Mahatma Gandhi Rd, Nungambakkam, Chennai")
                            .avgRating(new BigDecimal("4.50"))
                            .build(),
                    TourismEntity.builder()
                            .name("ITC Grand Chola")
                            .type(TourismEntity.EntityType.HOTEL)
                            .city("Chennai")
                            .country("India")
                            .address("63, Anna Salai, Guindy, Chennai")
                            .avgRating(new BigDecimal("4.70"))
                            .build(),
                    TourismEntity.builder()
                            .name("Saravana Bhavan")
                            .type(TourismEntity.EntityType.RESTAURANT)
                            .city("Chennai")
                            .country("India")
                            .address("Kennet Lane, Egmore, Chennai")
                            .avgRating(new BigDecimal("4.20"))
                            .build(),
                    TourismEntity.builder()
                            .name("Marina Beach Resort")
                            .type(TourismEntity.EntityType.HOTEL)
                            .city("Chennai")
                            .country("India")
                            .address("East Coast Road, Chennai")
                            .avgRating(new BigDecimal("3.90"))
                            .build(),
                    TourismEntity.builder()
                            .name("Gateway Hotel")
                            .type(TourismEntity.EntityType.HOTEL)
                            .city("Bengaluru")
                            .country("India")
                            .address("66, Residency Rd, Ashok Nagar, Bengaluru")
                            .avgRating(new BigDecimal("4.10"))
                            .build()
            );

            entityRepository.saveAll(seeds);
            log.info("Seeded {} initial tourism entities.", seeds.size());
        }
    }
}
