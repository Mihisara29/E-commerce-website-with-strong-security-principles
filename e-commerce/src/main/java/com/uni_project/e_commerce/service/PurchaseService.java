package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.entity.Purchase;
import com.uni_project.e_commerce.repo.PurchaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;


    public List<Purchase> getPurchases(String username) {
        return purchaseRepository.findByUsername(username);
    }

    public Purchase addPurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }
}
