package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.dto.CheckoutRequest;
import com.uni_project.e_commerce.entity.Purchase;
import com.uni_project.e_commerce.service.CartService;
import com.uni_project.e_commerce.service.PurchaseService;
import com.uni_project.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> checkout(
            @AuthenticationPrincipal OidcUser oidcUser,
            @RequestBody CheckoutRequest request) {

        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);

        Purchase p = new Purchase();
        p.setUsername(username);
        p.setDescription(request.getDescription());
        p.setPurchaseDate(request.getPurchaseDate());
        p.setDeliveryTime(request.getDeliveryTime());
        p.setDeliveryLocation(request.getDeliveryLocation());
        p.setTotalPrice(request.getTotalPrice());

        purchaseService.addPurchase(p);
        cartService.clearCart(username);

        // Only return simple JSON
        return ResponseEntity.ok(
                Map.of(
                        "message", "Checkout successful! Cart cleared.",
                        "username", p.getUsername(),
                        "description", p.getDescription(),
                        "purchaseDate", p.getPurchaseDate(),
                        "deliveryTime", p.getDeliveryTime(),
                        "deliveryLocation", p.getDeliveryLocation(),
                        "totalPrice", p.getTotalPrice()
                )
        );
    }



    @GetMapping
    public java.util.List<Purchase> getPurchases(@AuthenticationPrincipal OidcUser oidcUser) {
        String email = oidcUser.getEmail();
        String username = userService.getUsernameByEmail(email);
        return purchaseService.getPurchases(username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            purchaseService.deletePurchase(id);
            return ResponseEntity.ok(Map.of("message", "Order deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}
