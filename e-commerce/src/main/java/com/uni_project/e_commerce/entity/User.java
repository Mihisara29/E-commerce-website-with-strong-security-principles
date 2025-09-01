package com.uni_project.e_commerce.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name ="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String username;
    private String name;
    @Column(unique=true)
    private String email;
    private String contactNumber;
    private String country;
}
