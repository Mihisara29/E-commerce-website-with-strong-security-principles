package com.uni_project.e_commerce.repo;

import com.uni_project.e_commerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
