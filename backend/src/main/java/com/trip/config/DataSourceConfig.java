package com.trip.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
@Slf4j
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource(Environment env) {
        String databaseUrl = env.getProperty("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.isBlank()) {
            databaseUrl = env.getProperty("DATABASE_PUBLIC_URL");
        }

        String pghost = env.getProperty("PGHOST");

        // 1. If Railway DATABASE_URL is present
        if (databaseUrl != null && !databaseUrl.isBlank() &&
                (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("jdbc:"))) {
            log.info("Detected Railway DATABASE_URL environment variable. Configuring HikariDataSource...");
            try {
                if (databaseUrl.startsWith("jdbc:")) {
                    HikariConfig config = new HikariConfig();
                    config.setJdbcUrl(databaseUrl);
                    String user = env.getProperty("spring.datasource.username");
                    String pass = env.getProperty("spring.datasource.password");
                    if (user != null) config.setUsername(user);
                    if (pass != null) config.setPassword(pass);
                    return new HikariDataSource(config);
                }

                String normalizedUriStr = databaseUrl;
                if (normalizedUriStr.startsWith("postgres://")) {
                    normalizedUriStr = "postgresql://" + normalizedUriStr.substring("postgres://".length());
                }

                URI uri = new URI(normalizedUriStr);
                String userInfo = uri.getUserInfo();
                String username = null;
                String password = null;
                if (userInfo != null) {
                    String[] parts = userInfo.split(":", 2);
                    username = parts[0];
                    if (parts.length > 1) {
                        password = parts[1];
                    }
                }

                String host = uri.getHost();
                int port = uri.getPort() != -1 ? uri.getPort() : 5432;
                String path = uri.getPath();

                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                    jdbcUrl += "?" + uri.getQuery();
                }

                HikariConfig config = new HikariConfig();
                config.setJdbcUrl(jdbcUrl);
                if (username != null) config.setUsername(username);
                if (password != null) config.setPassword(password);
                config.setDriverClassName("org.postgresql.Driver");
                config.setMaximumPoolSize(10);
                config.setMinimumIdle(2);
                config.setConnectionTimeout(30000);
                config.setIdleTimeout(600000);
                config.setMaxLifetime(1800000);

                log.info("Configured HikariDataSource connected to: {}:{}{}", host, port, path);
                return new HikariDataSource(config);
            } catch (Exception e) {
                log.error("Failed to parse Railway DATABASE_URL: {}. Falling back to default configuration.", e.getMessage(), e);
            }
        } else if (pghost != null && !pghost.isBlank()) {
            // 2. If Railway PG* env vars are present
            log.info("Detected Railway PGHOST environment variable. Configuring HikariDataSource...");
            String pgport = env.getProperty("PGPORT", "5432");
            String pgdatabase = env.getProperty("PGDATABASE", "railway");
            String pguser = env.getProperty("PGUSER", "postgres");
            String pgpassword = env.getProperty("PGPASSWORD", "");

            String jdbcUrl = "jdbc:postgresql://" + pghost + ":" + pgport + "/" + pgdatabase;
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(pguser);
            config.setPassword(pgpassword);
            config.setDriverClassName("org.postgresql.Driver");
            config.setMaximumPoolSize(10);
            return new HikariDataSource(config);
        }

        // 3. Fallback to standard Spring Boot datasource properties (or H2 in-memory default)
        String jdbcUrl = env.getProperty("spring.datasource.url");
        String username = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password", "");
        String driver = env.getProperty("spring.datasource.driver-class-name");

        if (jdbcUrl == null || jdbcUrl.isBlank()) {
            jdbcUrl = "jdbc:h2:mem:trip_db;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1";
            driver = "org.h2.Driver";
            username = "sa";
            password = "";
        }

        log.info("Initializing DataSource with URL: {}", jdbcUrl);
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        if (username != null) config.setUsername(username);
        if (password != null) config.setPassword(password);
        if (driver != null) config.setDriverClassName(driver);
        return new HikariDataSource(config);
    }
}
