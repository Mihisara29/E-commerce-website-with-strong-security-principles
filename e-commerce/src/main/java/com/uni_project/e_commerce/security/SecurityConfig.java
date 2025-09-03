package com.uni_project.e_commerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Configuration
public class SecurityConfig {

    private final String issuer = "https://dev-ui7u7m1xfvzd5v88.us.auth0.com/";
    private final String clientId = "YoTDUiusqzDreSDNHhrekuHFAPaDfVHf";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS + disable CSRF (ok for SPA + API setup)
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll()
                        .anyRequest().authenticated()
                )

                // Server-side login with Auth0
                .oauth2Login(Customizer.withDefaults())

                // Logout handler
                .logout(logout -> logout
                        .addLogoutHandler(logoutHandler())
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // IMPORTANT: use allowedOriginPatterns for flexibility
        configuration.setAllowedOriginPatterns(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // must be true for cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private LogoutHandler logoutHandler() {
        return (request, response, authentication) -> {
            try {
                String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .build().toUriString();
                response.sendRedirect(
                        issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl
                );
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        };
    }
}
