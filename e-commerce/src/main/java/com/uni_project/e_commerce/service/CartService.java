package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
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

    public void removeCartItem(Long id){
        cartRepository.deleteById(id);
    }

    public void clearCart(String username){
        cartRepository.deleteByUsername(username);
    }

}
