package com.uni_project.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemDTO {
    private Long id;
    private String productName;
    private int quantity;
    private double price;
    private String imageUrl;
}
