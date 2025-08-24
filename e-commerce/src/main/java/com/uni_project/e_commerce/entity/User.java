package com.uni_project.e_commerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="users")
public class User {
    @Id
    private String username;
    private String name;
    private String email;
    private String contactNumber;
    private String country;
}
