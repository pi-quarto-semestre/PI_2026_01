package com.deeremail.controllers;

import java.io.IOException;

import org.quartz.SchedulerException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.deeremail.DTOs.ScheduleMailRequest;
import com.deeremail.DTOs.SendMailRequest;
import com.deeremail.services.MailSchedulerService;
import com.deeremail.services.MailService;

import jakarta.mail.MessagingException;

@RestController
@CrossOrigin
@RequestMapping("/api/mail")
public class MailController {

    private final MailService mailService;
    
    private final MailSchedulerService mailSchedulerService;

    public MailController(MailService mailService, MailSchedulerService mailSchedulerService) {
        this.mailService = mailService;
        this.mailSchedulerService = mailSchedulerService;
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

    @PostMapping("/schedule")
    public ResponseEntity<String> scheduleMail(
        @RequestBody ScheduleMailRequest request
    ) throws SchedulerException {

        mailSchedulerService.scheduleMail(request);

        return ResponseEntity.ok(
            "Email agendado com sucesso!"
        );
    }
}