package com.deeremail.utils;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        //Configurações da mensagem
        mailSender.setHost(Config.getSmtpHost());
        mailSender.setPort(Config.getSmtpPort());
        mailSender.setUsername(Config.getSmtpUsername());
        mailSender.setPassword(Config.getSmtpPassword());

        //Pega as propriedades de configuração da instância do mailSender
        Properties props = mailSender.getJavaMailProperties();

        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.smtp.connectiontimeout", "5000");
        props.put("mail.smtp.timeout", "5000");

        return mailSender;
    }
}
