package com.deeremail.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import com.deeremail.DTOs.FileNode;

public class FileStructure {

    public static FileNode getFolderStructure(String pathStr) throws IOException {
        Path rootPath = Paths.get(pathStr);
        if (!Files.exists(rootPath) || !Files.isDirectory(rootPath)) {
            throw new IOException("Path does not exist or is not a directory");
        }
        return buildTree(rootPath);
    }

    private static FileNode buildTree(Path path) throws IOException {
        String name = path.getFileName().toString();
        FileNode node = new FileNode(name, path.toString(), Files.isDirectory(path));

        if (Files.isDirectory(path)) {
            try (Stream<Path> entries = Files.list(path)) {
                entries.forEach(entry -> {
                    try {
                        node.addChild(buildTree(entry));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
            }
        }
        return node;
    }
}
