package com.deeremail.services;

import com.deeremail.repositories.UserRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.deeremail.DTOs.user.User;

@Service
public class TokenService {

    private final UserRepository userRepository;
    @Value("${jwt.secret}")
    private String secret;

    TokenService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Gera um token JWT para o usuário fornecido. O token é assinado usando o algoritmo HMAC256 e contém informações como o emissor, o assunto (login do usuário) e a data de expiração.
     * @param user usuário para gerar o token.
     * @return O token JWT gerado para o usuário.
     */
    public String generateToken (User user) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("auth-api")
                .withSubject(user.getLogin())
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);
            return token;    
        }
        catch (JWTCreationException exception){
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }

    } 
    /**
     * Valida o token JWT fornecido. O método verifica se o token é válido, se foi emitido pelo emissor correto e se não expirou. Se o token for válido, ele retorna o assunto (login do usuário) contido no token. Caso contrário, retorna uma string vazia.
     * @param token
     * @return
     */
    public String validateToken (String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                .withIssuer("auth-api")
                .build()
                .verify(token)
                .getSubject();
            
        } catch (JWTVerificationException exception) {
            return "";
        } 
    }


    /**
     * Gera a data de expiração do token, que é de 2 horas a partir do momento da geração.
     * @return A data de expiração do token.
     */
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}