package com.uni_project.e_commerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name ="users")
public class User {
    private String username;
    private String name;
}
