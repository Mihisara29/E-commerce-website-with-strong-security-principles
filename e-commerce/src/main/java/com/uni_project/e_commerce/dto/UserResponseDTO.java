package com.uni_project.e_commerce.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class UserResponseDTO {
    private String username;
    private String name;
    private String email;
    private String contactNumber;
    private String country;
}
