package com.deeremail.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.deeremail.DTOs.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
   UserDetails findByLogin(String login);
}
