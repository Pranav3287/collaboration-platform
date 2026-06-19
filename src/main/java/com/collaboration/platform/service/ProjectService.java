package com.collaboration.platform.service;

import com.collaboration.platform.dto.ProjectRequest;
import com.collaboration.platform.model.Project;
import com.collaboration.platform.model.User;
import com.collaboration.platform.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(ProjectRequest request, User owner) {
        Project project = new Project(request.getTitle(), request.getDescription(), owner);
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, ProjectRequest request) {
        Project project = getProjectById(id);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
