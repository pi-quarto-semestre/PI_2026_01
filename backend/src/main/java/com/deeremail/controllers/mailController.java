package com.deeremail.controllers;

import java.io.IOException;
import java.util.Properties;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deeremail.utils.Config;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin
@RequestMapping("/api/mail")
public class mailController {

    private JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    @PostMapping("/sendNow")
    // Envia o email imediatamente
    public void sendNow() throws IOException {

        //Configurações gerais de email
        Properties mailProperties = new Properties();
        mailProperties.put("mail.smtp.starttls.enable", "true");
        mailProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        mailProperties.put("mail.transport.protocol", "smtp");
        mailProperties.put("mail.smtp.auth", "true");
        mailProperties.put("mail.debug", "true");

        //Configurações da mensagem
        mailSender.setJavaMailProperties(mailProperties);
        mailSender.setHost(Config.getSmtpHost());
        mailSender.setPort(Config.getSmtpPort());
        mailSender.setUsername(Config.getSmtpUsername());
        mailSender.setPassword(Config.getSmtpPassword());

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper; 
        
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo("teste@gmail.com");
            //helper.setCc("copy@example.com"); // [11]
            helper.setText("<h1>Teste 123</h1>", true);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        
        mailSender.send(message);

        return;
    }

}
