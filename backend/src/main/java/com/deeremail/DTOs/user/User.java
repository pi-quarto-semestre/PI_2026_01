package com.deeremail.DTOs.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity(name = "users")
@Getter //Cria os métodos getters para os campos da classe
@NoArgsConstructor //Cria um construtor sem argumentos para a classe
@EqualsAndHashCode(of = "id") //Gera os métodos equals() e hashCode() com base no campo id, garantindo que a comparação de objetos seja feita com base no valor do id
public class User implements UserDetails{

    @Id //Define que o campo id é a chave primária da tabela
    @GeneratedValue(strategy = GenerationType.UUID) //Define que o valor do campo id será gerado automaticamente usando UUID
    private String id; 
    private String login;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
    else return List.of(new SimpleGrantedAuthority("ROLE_USER"));

    }

    @Override
    public String getUsername() {
        return login;
    }


}
