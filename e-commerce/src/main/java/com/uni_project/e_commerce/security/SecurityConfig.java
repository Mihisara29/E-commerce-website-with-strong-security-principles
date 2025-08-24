package com.uni_project.e_commerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/cart/**") // apply security only to /api/cart
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated() // require authentication
                )
                .csrf(csrf -> csrf.disable())    // disable CSRF for APIs
                .httpBasic(httpBasic -> {});    // enable HTTP Basic Auth using new syntax

        return http.build();
    }
}
