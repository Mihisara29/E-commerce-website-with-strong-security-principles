package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.dto.UserRequestDTO;
import com.uni_project.e_commerce.dto.UserResponseDTO;
import com.uni_project.e_commerce.entity.User;
import com.uni_project.e_commerce.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get logged-in user
    public ResponseEntity<?> getUser(OidcUser oidcUser) {
        String email = oidcUser.getEmail();

        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                        new UserResponseDTO(
                                user.getUsername(),
                                user.getName(),
                                user.getEmail(),
                                user.getContactNumber(),
                                user.getCountry()
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(404)
                        .body((UserResponseDTO) Map.of("message", "User not registered")));
    }

    // Register new user
    public ResponseEntity<?> registerUser(OidcUser oidcUser, UserRequestDTO userRequest) {
        String email = oidcUser.getEmail().toLowerCase();
        System.out.println("OIDC claims: " + oidcUser.getClaims());
        System.out.println("Email from OIDC: " + oidcUser.getEmail());

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setName(userRequest.getName());
        user.setEmail(email);
        user.setContactNumber(userRequest.getContactNumber());
        user.setCountry(userRequest.getCountry());

        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "name", user.getName(),
                "email", user.getEmail(),
                "contactNumber", user.getContactNumber(),
                "country", user.getCountry()
        ));
    }

    // Returns true if user is registered, false otherwise
    public boolean isUserRegistered(OidcUser oidcUser) {
        String email = oidcUser.getEmail().toLowerCase(); // normalize
        return userRepository.existsByEmail(email);
    }


    public String getUsernameByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getUsername)
                .orElse(null); // or throw exception if not found
    }


}
