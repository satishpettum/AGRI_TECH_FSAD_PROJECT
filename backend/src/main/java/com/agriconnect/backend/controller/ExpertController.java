package com.agriconnect.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriconnect.backend.model.Expert;
import com.agriconnect.backend.payload.ExpertRequest;
import com.agriconnect.backend.repository.ExpertRepository;

@RestController
@RequestMapping("/api/experts")
public class ExpertController {

    private final ExpertRepository expertRepository;

    public ExpertController(ExpertRepository expertRepository) {
        this.expertRepository = expertRepository;
    }

    @GetMapping
    public ResponseEntity<List<Expert>> getExperts() {
        return ResponseEntity.ok(expertRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Expert> createExpert(@Validated @RequestBody ExpertRequest request) {
        Expert expert = new Expert(
                request.getName(),
                request.getSpecialty(),
                request.getLocation(),
                request.getRating(),
                request.getReviews(),
                request.getBio(),
                request.getContactEmail()
        );
        Expert saved = expertRepository.save(expert);
        return ResponseEntity.ok(saved);
    }
}
