package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.dto.CheckoutRequest;
import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.entity.Purchase;
import com.uni_project.e_commerce.service.CartService;
import com.uni_project.e_commerce.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkout")
public class PurchaseController {
    @Autowired
    private CartService cartService;
    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public String checkout(@RequestHeader("username") String username, @RequestBody CheckoutRequest request){
        List<CartItem> cartItems = cartService.getCart(username);

        for(CartItem item : cartItems){
            Purchase p = new Purchase();
            p.setUsername(username);
            p.setProductName(item.getProductName());
            p.setQuantity(item.getQuantity());
            p.setPurchaseDate(request.getPurchaseDate());
            p.setDeliveryTime(request.getDeliveryLocation());
            p.setDeliveryLocation(request.getDeliveryLocation());
            p.setMessage(request.getMessage());

            purchaseService.addPurchase(p);
        }

        cartService.clearCart(username);
        return "Checkout successful!";
    }
}
