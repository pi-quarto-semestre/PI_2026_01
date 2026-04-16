package com.deeremail.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.deeremail.DTOs.FileNode;
import com.deeremail.utils.Config;
import com.deeremail.utils.FileStructure;

@RestController
@CrossOrigin
@RequestMapping("/api/templates")
public class templatesController {

    // Pega o caminho da pasta de modelos do arquivo de configuração
    private String templatePath = Config.getTemplatesFolderPath();

    @GetMapping("/list")
    // lista as pastas e os arquivos existentes dentro em uma estrutura de json com a hierarquia
    public FileNode getFiles() throws IOException {
        return FileStructure.getFolderStructure(templatePath);
    }

    @GetMapping("/template")
    // Retorna o modelo da versão especificada como texto e seus parâmetros como um array
    public Map<String, Object> getTemplate(
        @RequestParam String name,
        @RequestParam String version
    ) throws IOException {
        
        // Monta o caminho da pasta para o modelo html
        String fullModelPath = templatePath + "/" + name + "/" + version + "/template.html";
        String content;
        try{
            content = Files.readString(Path.of(fullModelPath));
        }
        catch (java.nio.file.NoSuchFileException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        }
        

        // Encontra todos os parâmetros no formato ${parametro}
        Pattern pattern = Pattern.compile("\\$\\{([^}]+)}");
        Matcher matcher = pattern.matcher(content);

        // Cria a lista de parâmetros
        Set<String> params = new HashSet<>();

        // Percorre os parâmetros encontrados e adiciona eles na lista
        while (matcher.find()) {
            params.add(matcher.group(1));
        }

        // Cria a resposta e retorna
        Map<String, Object> response = new HashMap<>();
        response.put("content", content);
        response.put("parameters", params);
        return response;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
        @RequestParam MultipartFile file,
        @RequestParam String name,
        @RequestParam String version
    ) {

        String fullPath = templatePath + "/" + name + "/" + version;

        // Retorna erro se a chamada da api vier sem o arquivo
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo está vazio");
        }

        try {
            // Cria a pasta de template se ela não existir
            File directory = new File(fullPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Salva o arquivo
            String filePath = fullPath + "/" + file.getOriginalFilename();
            File dest = new File(filePath);
            file.transferTo(dest);

            return ResponseEntity.ok("File uploaded to: " + filePath);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro no upload");
        }
    }



}
