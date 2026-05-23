package com.deeremail.controllers;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.deeremail.DTOs.SendMailRequest;
import com.deeremail.services.MailService;

import jakarta.mail.MessagingException;

@RestController
@CrossOrigin
@RequestMapping("/api/mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/sendNow")
    public ResponseEntity<String> sendNow(
        @RequestBody SendMailRequest request
    ) throws MessagingException, IOException {

        mailService.sendNow(request);

        return ResponseEntity.ok(
            "Mensagem enviada com sucesso!"
        );
    }
}