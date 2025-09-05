package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.dto.UserRequestDTO;
import com.uni_project.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get logged-in user profile
    @GetMapping("/me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OidcUser oidcUser) {

        return userService.getUser(oidcUser);
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@AuthenticationPrincipal OidcUser oidcUser,
                                      @RequestBody UserRequestDTO userRequest) {

        return userService.registerUser(oidcUser, userRequest);
    }

    @GetMapping("/is-logged-in")
    public ResponseEntity<Boolean> isLoggedIn(@AuthenticationPrincipal OidcUser oidcUser) {
        boolean loggedIn = userService.isLoggedIn(oidcUser);
        return ResponseEntity.ok(loggedIn);
    }

    @GetMapping("/is-registered")
    public ResponseEntity<Boolean> isRegistered(@AuthenticationPrincipal OidcUser oidcUser) {
        boolean registered = userService.isUserRegistered(oidcUser);
        return ResponseEntity.ok(registered);
    }

}
