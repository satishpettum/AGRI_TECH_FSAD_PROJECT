package com.agriconnect.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriconnect.backend.model.CommunityPost;
import com.agriconnect.backend.payload.CommunityPostRequest;
import com.agriconnect.backend.repository.CommunityPostRepository;
import com.agriconnect.backend.security.UserPrincipal;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private static final Logger logger = LoggerFactory.getLogger(CommunityController.class);

    private final CommunityPostRepository communityPostRepository;

    public CommunityController(CommunityPostRepository communityPostRepository) {
        this.communityPostRepository = communityPostRepository;
    }

    @GetMapping
    public ResponseEntity<List<CommunityPost>> getCommunity() {
        return ResponseEntity.ok(communityPostRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<CommunityPost> createCommunityPost(@Validated @RequestBody CommunityPostRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() instanceof String) {
            logger.warn("Community post creation denied: unauthenticated request");
            return ResponseEntity.status(401).build();
        }

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        logger.info("Creating community post for user={}", principal.getUsername());
        CommunityPost post = new CommunityPost(
                request.getTitle(),
                request.getCategory(),
                request.getContent(),
                principal.getFullName(),
                principal.getUsername(),
                LocalDateTime.now(),
                0
        );
        CommunityPost saved = communityPostRepository.save(post);
        return ResponseEntity.ok(saved);
    }
}
