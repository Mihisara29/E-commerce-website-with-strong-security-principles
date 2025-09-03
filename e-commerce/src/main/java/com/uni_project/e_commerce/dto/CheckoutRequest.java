package com.uni_project.e_commerce.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CheckoutRequest {
        private String description;
        private LocalDate purchaseDate;
        private String deliveryTime;
        private String deliveryLocation;
        private double totalPrice;
}
