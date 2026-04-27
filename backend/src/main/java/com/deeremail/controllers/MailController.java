package com.deeremail.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.FileTemplateResolver;

import com.deeremail.utils.Config;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin
@RequestMapping("/api/mail")
public class MailController {

    // Pega o caminho da pasta de modelos do arquivo de configuração
    private String templatePath = Config.getTemplatesFolderPath();

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/sendNow")
    // Envia o email imediatamente
    public ResponseEntity<String> sendNow(
        @RequestParam String name,
        @RequestParam String version,
        @RequestParam String subject,
        @RequestParam String sendTo,
        @RequestParam String sendCcTo[],
        @RequestParam String templateParams
    ) throws IOException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper; 
        
        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");

            // Definindo parâmetros para envio do email
            helper.setTo(sendTo);
            helper.setSubject(subject);

            // Define emails em cópia se o parâmetro recebido não for nulo ou vazio
            if (sendCcTo != null && sendCcTo.length != 0) {
                helper.setCc(sendCcTo);
            }

            // Definindo o contexto (substituição das variáveis do template)
            Context context = new Context();

            // Fazendo parse da lista de chave:valor recebida como string para um Map
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> templateParamsMap = mapper.readValue(templateParams, new TypeReference<Map<String, String>>() {});

            // Definindo os parâmetros do email
            templateParamsMap.forEach((chave,valor) -> {
                context.setVariable(chave, valor);
            }); 

            // Cria uma instância do templateEngine e define o caminho da pasta de templates
            SpringTemplateEngine templateEngine = new SpringTemplateEngine();

            FileTemplateResolver resolver = new FileTemplateResolver();
            resolver.setPrefix(templatePath + "/");
            resolver.setSuffix("/template.html"); 
            resolver.setTemplateMode(TemplateMode.HTML);
            resolver.setCharacterEncoding("UTF-8");
            templateEngine.setTemplateResolver(resolver);

            // Substitui os parâmetros no texto do template
            String htmlString = templateEngine.process(name + "/" + version, context);
            System.out.println(htmlString);

            // Define como corpo do email 
            helper.setText(htmlString, true);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        
        mailSender.send(message);

        return ResponseEntity.ok("Mensagem enviada com sucesso!");
    }

    

}
