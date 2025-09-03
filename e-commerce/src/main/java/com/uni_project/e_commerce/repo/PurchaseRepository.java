package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByUsername(String username);
}
