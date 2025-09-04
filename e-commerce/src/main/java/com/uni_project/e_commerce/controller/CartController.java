package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.service.CartService;
import com.uni_project.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    // Get all cart items for logged-in user
    @GetMapping
    public List<CartItem> getCart(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        return cartService.getCart(username);
    }

    // Add a cart item
    @PostMapping
    public CartItem addCartItem(@AuthenticationPrincipal OidcUser oidcUser,
                                @RequestBody CartItem item) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        item.setUsername(username);
        return cartService.addCartItem(item);
    }


    @DeleteMapping("/remove/{productName}")
    public void removeCartItem(@AuthenticationPrincipal OidcUser oidcUser,
                               @PathVariable String productName) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        cartService.removeCartItemByUsernameAndProductName(username, productName);
    }


    // Clear all cart items for logged-in user
    @DeleteMapping("/clear")
    public void clearCart(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        cartService.clearCart(username);
    }

    @PatchMapping("/update-quantity/{productName}")
    public CartItem updateQuantity(@AuthenticationPrincipal OidcUser oidcUser,
                                   @PathVariable String productName,
                                   @RequestParam int change) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        return cartService.updateQuantity(username, productName, change);
    }

}
