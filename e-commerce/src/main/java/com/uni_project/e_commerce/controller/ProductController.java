package com.uni_project.e_commerce.controller;

import com.uni_project.e_commerce.entity.Product;
import com.uni_project.e_commerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}
