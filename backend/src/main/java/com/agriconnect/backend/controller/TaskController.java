package com.agriconnect.backend.controller;

import com.agriconnect.backend.model.Task;
import com.agriconnect.backend.model.User;
import com.agriconnect.backend.payload.TaskRequest;
import com.agriconnect.backend.repository.TaskRepository;
import com.agriconnect.backend.repository.UserRepository;
import com.agriconnect.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Task>> getTasks(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(taskRepository.findByUserId(userPrincipal.getId()));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Task> addTask(@AuthenticationPrincipal UserPrincipal userPrincipal, @Validated @RequestBody TaskRequest request) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task(user, request.getTitle(), request.isCompleted());
        Task saved = taskRepository.save(task);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/toggle")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Task> toggleTask(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getId().equals(userPrincipal.getId())) {
            throw new RuntimeException("Not authorized");
        }
        task.setCompleted(!task.isCompleted());
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }
}
