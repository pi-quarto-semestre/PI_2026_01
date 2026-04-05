package com.deeremail.controllers;

import java.io.File;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
