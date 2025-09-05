package com.uni_project.e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CheckoutRequest {
        private String description;

        @JsonFormat(pattern="yyyy-MM-dd")
        private LocalDate purchaseDate;

        private String deliveryTime;
        private String deliveryLocation;
        private double totalPrice;
}

