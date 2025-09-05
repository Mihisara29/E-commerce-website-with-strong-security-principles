package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByUsername(String username);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.username = :username")
    void deleteByUsername(String username);

    Optional<CartItem> findByUsernameAndProductName(String username, String productName);
}
