package com.deeremail.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.LinkedHashSet;
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
public class TemplatesController {

    private static final String TEMPLATE_FILE_NAME = "template.html";

    private Path getTemplateRootPath() {
        String configuredPath = Config.getTemplatesFolderPath();

        if (configuredPath == null || configuredPath.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Pasta de templates nao configurada"
            );
        }

        return Path.of(configuredPath).normalize();
    }

    private String sanitizePathSegment(String value, String fieldName) {
        String sanitizedValue = value == null ? "" : value.trim();

        if (sanitizedValue.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                fieldName + " nao pode ficar em branco"
            );
        }

        if (sanitizedValue.contains("..")
            || sanitizedValue.contains("/")
            || sanitizedValue.contains("\\")
            || sanitizedValue.contains(":")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                fieldName + " contem caracteres invalidos"
            );
        }

        return sanitizedValue;
    }

    private Path resolveTemplateVersionPath(String name, String version) {
        Path rootPath = getTemplateRootPath();
        String sanitizedName = sanitizePathSegment(name, "Nome do template");
        String sanitizedVersion = sanitizePathSegment(version, "Versao do template");
        Path versionPath = rootPath.resolve(sanitizedName).resolve(sanitizedVersion).normalize();

        if (!versionPath.startsWith(rootPath)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Caminho do template invalido"
            );
        }

        return versionPath;
    }

    @GetMapping("/list")
    // lista as pastas e os arquivos existentes dentro em uma estrutura de json com a hierarquia
    public FileNode getFiles() throws IOException {
        return FileStructure.getFolderStructure(getTemplateRootPath().toString());
    }

    @GetMapping("/template")
    // Retorna o modelo da versão especificada como texto e seus parâmetros como um array
    public Map<String, Object> getTemplate(
        @RequestParam String name,
        @RequestParam String version
    ) throws IOException {
        
        // Monta o caminho da pasta para o modelo html
        Path fullModelPath = resolveTemplateVersionPath(name, version).resolve(TEMPLATE_FILE_NAME);
        String content;
        try{
            content = Files.readString(fullModelPath);
        }
        catch (java.nio.file.NoSuchFileException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        }
        

        // Encontra todos os parâmetros no formato ${parametro}
        Pattern pattern = Pattern.compile("\\$\\{([^}]+)}");
        Matcher matcher = pattern.matcher(content);

        // Cria a lista de parâmetros
        Set<String> params = new LinkedHashSet<>();

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

        // Retorna erro se a chamada da api vier sem o arquivo
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo está vazio");
        }

        try {
            Path templateVersionPath = resolveTemplateVersionPath(name, version);
            Files.createDirectories(templateVersionPath);

            Path destinationFile = templateVersionPath.resolve(TEMPLATE_FILE_NAME);
            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("File uploaded to: " + destinationFile);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro no upload");
        }
    }



}
