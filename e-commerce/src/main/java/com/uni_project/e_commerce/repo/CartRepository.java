package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByUsername(String username);
    void deleteByUsername(String username);

    Optional<CartItem> findByUsernameAndProductName(String username, String productName);
}
