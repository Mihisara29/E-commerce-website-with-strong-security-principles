package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.dto.CheckoutRequest;
import com.uni_project.e_commerce.entity.Purchase;
import com.uni_project.e_commerce.service.CartService;
import com.uni_project.e_commerce.service.PurchaseService;
import com.uni_project.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @PostMapping
    public String checkout(@AuthenticationPrincipal OidcUser oidcUser,
                           @RequestBody CheckoutRequest request) {

        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);

        // Create new Purchase
        Purchase p = new Purchase();
        p.setUsername(username);
        p.setDescription(request.getDescription());
        p.setPurchaseDate(request.getPurchaseDate());
        p.setDeliveryTime(request.getDeliveryTime());
        p.setDeliveryLocation(request.getDeliveryLocation());
        p.setTotalPrice(request.getTotalPrice());

        purchaseService.addPurchase(p);

        // Clear cart of this user
        cartService.clearCart(username);

        return "Checkout successful! Cart cleared.";
    }

    @GetMapping
    public java.util.List<Purchase> getPurchases(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        return purchaseService.getPurchases(username);
    }
}
