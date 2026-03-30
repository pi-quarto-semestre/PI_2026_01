package com.deeremail.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deeremail.DTOs.FileNode;
import com.deeremail.utils.FileStructure;

@RestController
@CrossOrigin
@RequestMapping("/api/templates")
public class templatesController {

    @GetMapping("/list")
    //lista as pastas e os arquivos existentes dentro em uma estrutura de json com a hierarquia
    public FileNode getFiles() throws IOException {
        // Caminho fixo por enquanto, alterar ddurante o desenvolvimento
        String fixedPath = "mailTemplates";
        return FileStructure.getFolderStructure(fixedPath);
    }
}
