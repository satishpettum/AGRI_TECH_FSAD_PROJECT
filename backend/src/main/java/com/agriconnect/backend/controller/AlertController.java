package com.agriconnect.backend.controller;

import com.agriconnect.backend.model.Alert;
import com.agriconnect.backend.model.User;
import com.agriconnect.backend.payload.AlertRequest;
import com.agriconnect.backend.repository.AlertRepository;
import com.agriconnect.backend.repository.UserRepository;
import com.agriconnect.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;

    public AlertController(AlertRepository alertRepository, UserRepository userRepository) {
        this.alertRepository = alertRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Alert>> getAlerts(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(alertRepository.findByUserId(userPrincipal.getId()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Alert> addAlert(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestParam Long userId, @Validated @RequestBody AlertRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Alert alert = new Alert(user, request.getType(), request.getTitle(), request.getDescription());
        Alert saved = alertRepository.save(alert);
        return ResponseEntity.ok(saved);
    }
}
