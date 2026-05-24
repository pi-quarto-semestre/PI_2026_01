package com.deeremail.services;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.deeremail.DTOs.SendMailRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public MailService(
        JavaMailSender mailSender,
        SpringTemplateEngine templateEngine
    ) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendNow(SendMailRequest request)
        throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
            new MimeMessageHelper(message, true, "UTF-8");

        // Definindo parâmetros para envio do email
        helper.setTo(request.getSendTo());
        helper.setSubject(request.getSubject());

        // Define emails em cópia se o parâmetro recebido não for nulo ou vazio
        if (request.getSendCcTo() != null &&
            request.getSendCcTo().length > 0) {

            helper.setCc(request.getSendCcTo());
        }

        // Definindo o contexto (substituição das variáveis do template)
        Context context = new Context();
        request.getTemplateParams().forEach(context::setVariable);

        //Processa a substituição de parâmetros
        String templateName = request.getName() + "/" + request.getVersion();
        String htmlContent = templateEngine.process(templateName, context);
        
        //Define o novo texto no email e manda a mensagem
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}