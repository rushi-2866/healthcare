package com.healthcare.tpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;

/**
 * HealthCare TPA & Benefits Administration Platform
 * Spring Boot 3.3.0 REST Backend
 */
@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "HealthCare TPA Core REST API",
        version = "v1.0.0",
        description = "Production-grade microservices for claims adjudication, cashless hospital network search, pre-auth intimation, and member benefits.",
        contact = @Contact(name = "HealthCare Technology Desk", email = "tech@healthcare-tpa.com"),
        license = @License(name = "IRDAI TPA License #003")
    )
)
public class HealthCareApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthCareApplication.java, args);
    }
}
