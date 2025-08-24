package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.entity.CartItem;
import com.uni_project.e_commerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartItem> getCart(@RequestHeader("username") String username){
        return cartService.getCart(username);
    }

    @PostMapping
    public CartItem addCartItem(@RequestHeader("username") String username, @RequestBody CartItem item){
        item.setUsername(username);
        return cartService.addCartItem(item);
    }

    @DeleteMapping("/{id}")
    public void removeCartItem(@PathVariable Long id){
        cartService.removeCartItem(id);
    }

}
