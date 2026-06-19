package com.collaboration.platform.repository;

import com.collaboration.platform.model.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileAttachment, Long> {
    List<FileAttachment> findByProjectIdOrderByUploadedAtDesc(Long projectId);
}
