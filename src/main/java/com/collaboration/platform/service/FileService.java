package com.collaboration.platform.service;

import com.collaboration.platform.model.FileAttachment;
import com.collaboration.platform.model.Project;
import com.collaboration.platform.model.User;
import com.collaboration.platform.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final ProjectService projectService;
    private final Path uploadDir;

    public FileService(FileRepository fileRepository,
                       ProjectService projectService,
                       @Value("${app.upload.dir}") String uploadDir) throws IOException {
        this.fileRepository = fileRepository;
        this.projectService = projectService;
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.uploadDir);
    }

    public List<FileAttachment> getFilesByProject(Long projectId) {
        return fileRepository.findByProjectIdOrderByUploadedAtDesc(projectId);
    }

    public FileAttachment uploadFile(Long projectId, MultipartFile file, User user) throws IOException {
        Project project = projectService.getProjectById(projectId);

        String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path target = uploadDir.resolve(storedName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        FileAttachment attachment = new FileAttachment();
        attachment.setFileName(file.getOriginalFilename());
        attachment.setFileType(file.getContentType());
        attachment.setFilePath(storedName);
        attachment.setFileSize(file.getSize());
        attachment.setProject(project);
        attachment.setUploadedBy(user);

        return fileRepository.save(attachment);
    }

    public FileAttachment getFileById(Long fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    public Resource downloadFile(Long fileId) throws IOException {
        FileAttachment file = getFileById(fileId);

        Path filePath = uploadDir.resolve(file.getFilePath());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found on disk");
        }

        return resource;
    }

    public void deleteFile(Long fileId) throws IOException {
        FileAttachment file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        Path filePath = uploadDir.resolve(file.getFilePath());
        Files.deleteIfExists(filePath);
        fileRepository.delete(file);
    }
}
