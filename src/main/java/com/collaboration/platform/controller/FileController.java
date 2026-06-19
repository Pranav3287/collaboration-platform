package com.collaboration.platform.controller;

import com.collaboration.platform.model.FileAttachment;
import com.collaboration.platform.model.User;
import com.collaboration.platform.security.CustomUserDetailsService;
import com.collaboration.platform.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    private final FileService fileService;
    private final CustomUserDetailsService userDetailsService;

    public FileController(FileService fileService, CustomUserDetailsService userDetailsService) {
        this.fileService = fileService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<FileAttachment>> getProjectFiles(@PathVariable Long projectId) {
        return ResponseEntity.ok(fileService.getFilesByProject(projectId));
    }

    @PostMapping("/upload/{projectId}")
    public ResponseEntity<FileAttachment> uploadFile(@PathVariable Long projectId,
                                                     @RequestParam("file") MultipartFile file,
                                                     Authentication authentication) throws IOException {
        User user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(fileService.uploadFile(projectId, file, user));
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws IOException {
        FileAttachment meta = fileService.getFileById(fileId);
        Resource resource = fileService.downloadFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + meta.getFileName() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long fileId) throws IOException {
        fileService.deleteFile(fileId);
        return ResponseEntity.noContent().build();
    }
}
