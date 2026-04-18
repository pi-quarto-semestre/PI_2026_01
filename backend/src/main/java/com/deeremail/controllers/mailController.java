package com.deeremail.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin
@RequestMapping("/api/mail")
public class mailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/sendNow")
    // Envia o email imediatamente
    public ResponseEntity<String> sendNow() throws IOException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper; 
        
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo("teste@gmail.com");
            //helper.setCc("copy@example.com"); // [11]
            helper.setSubject("Teste de email");
            helper.setText("<h1>Teste 123</h1>", true);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        
        mailSender.send(message);

        return ResponseEntity.ok("Mensagem enviada com sucesso!");
    }

}
