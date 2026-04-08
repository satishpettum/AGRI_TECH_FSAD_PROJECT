package com.agriconnect.backend.controller;

import com.agriconnect.backend.model.FavoriteResource;
import com.agriconnect.backend.model.Resource;
import com.agriconnect.backend.model.User;
import com.agriconnect.backend.repository.FavoriteResourceRepository;
import com.agriconnect.backend.repository.ResourceRepository;
import com.agriconnect.backend.repository.UserRepository;
import com.agriconnect.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteResourceController {

    private final FavoriteResourceRepository favoriteResourceRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public FavoriteResourceController(FavoriteResourceRepository favoriteResourceRepository, ResourceRepository resourceRepository, UserRepository userRepository) {
        this.favoriteResourceRepository = favoriteResourceRepository;
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Long>> getFavoriteIds(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<FavoriteResource> favorites = favoriteResourceRepository.findByUserId(userPrincipal.getId());
        List<Long> resourceIds = favorites.stream()
                .map(f -> f.getResource().getId())
                .collect(Collectors.toList());
        return ResponseEntity.ok(resourceIds);
    }

    @PostMapping("/{resourceId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long resourceId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        Optional<FavoriteResource> existing = favoriteResourceRepository.findByUserIdAndResourceId(user.getId(), resource.getId());
        
        if (existing.isPresent()) {
            favoriteResourceRepository.delete(existing.get());
            return ResponseEntity.ok().body("{\"message\": \"Removed from favorites\"}");
        } else {
            FavoriteResource fav = new FavoriteResource(user, resource);
            favoriteResourceRepository.save(fav);
            return ResponseEntity.ok().body("{\"message\": \"Added to favorites\"}");
        }
    }
}
