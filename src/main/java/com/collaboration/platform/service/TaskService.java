package com.collaboration.platform.service;

import com.collaboration.platform.dto.TaskRequest;
import com.collaboration.platform.model.Priority;
import com.collaboration.platform.model.Project;
import com.collaboration.platform.model.Task;
import com.collaboration.platform.model.TaskStatus;
import com.collaboration.platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;

    public TaskService(TaskRepository taskRepository, ProjectService projectService) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectIdOrderByUpdatedAtDesc(projectId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Long projectId, TaskRequest request) {
        Project project = projectService.getProjectById(projectId);

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(parseStatus(request.getStatus()));
        task.setPriority(parsePriority(request.getPriority()));
        task.setLabels(request.getLabels());
        task.setDeadline(parseDate(request.getDeadline()));
        task.setProject(project);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task task = getTaskById(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(parseStatus(request.getStatus()));
        task.setPriority(parsePriority(request.getPriority()));
        task.setLabels(request.getLabels());
        task.setDeadline(parseDate(request.getDeadline()));
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long id, String status) {
        Task task = getTaskById(id);
        task.setStatus(parseStatus(status));
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private TaskStatus parseStatus(String status) {
        try {
            return TaskStatus.valueOf(status.toUpperCase().replace("-", "_"));
        } catch (Exception e) {
            return TaskStatus.TODO;
        }
    }

    private Priority parsePriority(String priority) {
        try {
            return Priority.valueOf(priority.toUpperCase());
        } catch (Exception e) {
            return Priority.MEDIUM;
        }
    }

    private LocalDate parseDate(String date) {
        if (date == null || date.isBlank()) return null;
        return LocalDate.parse(date);
    }
}
