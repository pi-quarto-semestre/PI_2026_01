package com.deeremail.DTOs;

import java.util.ArrayList;
import java.util.List;

public class FileNode {
    private String name;
    private String path;
    private boolean isDirectory;
    private List<FileNode> children;

    public FileNode(String name, String path, boolean isDirectory) {
        this.name = name;
        this.path = path;
        this.isDirectory = isDirectory;
        if (isDirectory) {
            this.children = new ArrayList<>();
        }
    }

    // Getters e Setters
    public String getName() { return name; }
    public String getPath() { return path; }
    public boolean isDirectory() { return isDirectory; }
    public List<FileNode> getChildren() { return children; }
    public void addChild(FileNode node) { this.children.add(node); }
}
