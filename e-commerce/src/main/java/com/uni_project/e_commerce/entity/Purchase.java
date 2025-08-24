package com.uni_project.e_commerce.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "purchases")
@Data
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String productName;
    private int quantity;
    private LocalDate purchaseDate;
    private String deliveryTime;
    private String deliveryLocation;
    private String message;
}

