package com.collaboration.platform.controller;

import com.collaboration.platform.dto.ProjectRequest;
import com.collaboration.platform.model.Project;
import com.collaboration.platform.model.User;
import com.collaboration.platform.security.CustomUserDetailsService;
import com.collaboration.platform.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService projectService;
    private final CustomUserDetailsService userDetailsService;

    public ProjectController(ProjectService projectService, CustomUserDetailsService userDetailsService) {
        this.projectService = projectService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectRequest request,
                                                  Authentication authentication) {
        User owner = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(projectService.createProject(request, owner));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id,
                                                  @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
