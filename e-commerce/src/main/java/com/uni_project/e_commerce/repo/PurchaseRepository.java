package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.Purchase;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase,Long> {
    List<Purchase> findByUsername(String username);
}
