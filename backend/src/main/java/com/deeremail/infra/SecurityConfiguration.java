package com.deeremail.infra;

import com.deeremail.services.AuthorizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;

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
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/mail/sendNow").hasAnyRole("ADMIN","USER")
                .anyRequest().authenticated()
            )
           .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
           .build(); 

           

        }
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration autenticationConfiguration) {
    return autenticationConfiguration.getAuthenticationManager();

  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
