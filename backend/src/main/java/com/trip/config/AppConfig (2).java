package com.trip.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.concurrent.Executor;

@Configuration
public class AppConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("trip-async-");
        executor.initialize();
        return executor;
    }

    @Bean
    public OpenAPI tripOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TRIP - Tourism Reputation Intelligence API")
                        .description("AI-powered reputation intelligence for hotels, restaurants, and attractions")
                        .version("1.0.0"));
    }
}
