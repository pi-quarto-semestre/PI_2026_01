package com.deeremail.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.FileTemplateResolver;

@Configuration
public class ThymeleafConfig {

    // Bean de configuração do thymeleaf (substituição dos parâmetros em templates)
    @Bean
    public SpringTemplateEngine templateEngine() {

        FileTemplateResolver resolver =
            new FileTemplateResolver();

        // Pega o caminho da pasta de modelos do arquivo de configuração e define como prefixo para o caminho dos templates
        resolver.setPrefix(
            Config.getTemplatesFolderPath() + "/"
        );

        System.out.println("USANDO O BEAN - CAMINHO: " + Config.getTemplatesFolderPath());

        resolver.setSuffix("/template.html");
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCharacterEncoding("UTF-8");

        SpringTemplateEngine engine =
            new SpringTemplateEngine();

        engine.setTemplateResolver(resolver);

        return engine;
    }
}