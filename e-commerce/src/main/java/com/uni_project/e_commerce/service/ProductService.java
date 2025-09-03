package com.uni_project.e_commerce.service;

import com.uni_project.e_commerce.entity.Product;
import com.uni_project.e_commerce.repo.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
