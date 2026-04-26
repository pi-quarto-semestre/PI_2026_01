package com.deeremail.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.deeremail.DTOs.User.User;

public interface UserRepository extends JpaRepository<User, String>{
   UserDetails findByLogin(String login);
}
