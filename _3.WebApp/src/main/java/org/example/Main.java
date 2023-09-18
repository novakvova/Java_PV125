package org.example;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.example.interfaces.SeedService;
import org.example.storage.StorageProperties;
import org.example.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@SecurityScheme(name="my-api", scheme = "bearer", type = SecuritySchemeType.HTTP, in= SecuritySchemeIn.HEADER)
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService, SeedService seedService) {
        return (args) -> {
            try {
                storageService.init();
                seedService.seedRoleData();
                seedService.seedUserData();
            }
            catch(Exception ex) {
                System.out.println("-----Хюсто у нас проблеми----"+ ex.getMessage());
            }
        };
    }
}