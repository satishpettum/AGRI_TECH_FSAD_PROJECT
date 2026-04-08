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

import com.agriconnect.backend.model.Resource;
import com.agriconnect.backend.payload.ResourceRequest;
import com.agriconnect.backend.repository.ResourceRepository;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceRepository resourceRepository;

    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getResources() {
        return ResponseEntity.ok(resourceRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EXPERT')")
    public ResponseEntity<Resource> createResource(@Validated @RequestBody ResourceRequest request) {
        Resource resource = new Resource(
                request.getTitle(),
                request.getCategory(),
                request.getDescription(),
                request.getAuthorName(),
                request.getSourceUrl(),
                request.getTags()
        );
        Resource saved = resourceRepository.save(resource);
        return ResponseEntity.ok(saved);
    }
}
