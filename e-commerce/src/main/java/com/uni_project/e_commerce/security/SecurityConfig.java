package com.uni_project.e_commerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.List;

@Configuration
public class SecurityConfig {

    private final String issuer = "https://dev-ui7u7m1xfvzd5v88.us.auth0.com/";
    private final String clientId = "YoTDUiusqzDreSDNHhrekuHFAPaDfVHf";
    private final String frontendUrl = "http://localhost:5173"; // Your frontend URL

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS + disable CSRF
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                // Authorize requests
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
                )

                // OAuth2 login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl(frontendUrl, true) // Redirect after login
                )

                // Logout configuration
                .logout(logout -> logout
                        .logoutSuccessHandler((request, response, authentication) -> {
                            try {
                                response.sendRedirect(
                                        issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + frontendUrl
                                );
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                        })
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // use setAllowedOrigins
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE","PATCH","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
