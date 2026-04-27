package com.deeremail.infra;

import com.deeremail.services.AuthorizationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

  private final AuthorizationService authorizationService;

    SecurityConfiguration(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

  @Bean
  public SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity) throws Exception {

    System.out.println("SECUTRITY CONFIGURATION LOADED");

    return httpSecurity 
           .csrf(csrf -> csrf.disable()) 
           .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
           .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/api/mail").hasAnyRole("ADMIN","USER")
                .anyRequest().authenticated()
            )
           .build(); 
        }
}
