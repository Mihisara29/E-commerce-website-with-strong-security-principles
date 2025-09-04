package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.entity.Product;
import com.uni_project.e_commerce.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uni_project.e_commerce.dto.CartItemDTO;
import com.uni_project.e_commerce.repo.ProductRepository;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // Fetch cart with product details
    public List<CartItemDTO> getCart(String username) {

        List<CartItem> cartItems = cartRepository.findByUsername(username);

        return cartItems.stream().map(item -> {
            Product product = productRepository.findByName(item.getProductName())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return new CartItemDTO(
                    item.getId(),
                    item.getProductName(),
                    item.getQuantity(),
                    product.getPrice(),
                    product.getImageUrl()
            );
        }).toList();
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
