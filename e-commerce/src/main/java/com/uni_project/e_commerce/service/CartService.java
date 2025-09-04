package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<CartItem> getCart(String username){
        return cartRepository.findByUsername(username);
    }

    public CartItem addCartItem(CartItem item){
        return cartRepository.save(item);
    }


    public void clearCart(String username){
        cartRepository.deleteByUsername(username);
    }

    public void removeCartItemByUsernameAndProductName(String username, String productName){
        cartRepository.findByUsernameAndProductName(username, productName)
                .ifPresent(cartRepository::delete);
    }

    public CartItem updateQuantity(String username, String productName, int change) {
        return cartRepository.findByUsernameAndProductName(username, productName)
                .map(item -> {
                    int newQty = item.getQuantity() + change;
                    if (newQty < 1) newQty = 1; // cannot reduce below 1
                    item.setQuantity(newQty);
                    return cartRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
    }


}
