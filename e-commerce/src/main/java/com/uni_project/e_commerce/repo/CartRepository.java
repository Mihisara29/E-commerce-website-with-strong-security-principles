package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByUsername(String username);
    void deleteByUsername(String username);
}
