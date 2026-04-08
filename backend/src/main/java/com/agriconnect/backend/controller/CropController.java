package com.agriconnect.backend.controller;

import com.agriconnect.backend.model.Crop;
import com.agriconnect.backend.model.User;
import com.agriconnect.backend.payload.CropRequest;
import com.agriconnect.backend.repository.CropRepository;
import com.agriconnect.backend.repository.UserRepository;
import com.agriconnect.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropRepository cropRepository;
    private final UserRepository userRepository;

    public CropController(CropRepository cropRepository, UserRepository userRepository) {
        this.cropRepository = cropRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Crop>> getCrops(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(cropRepository.findByUserId(userPrincipal.getId()));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Crop> addCrop(@AuthenticationPrincipal UserPrincipal userPrincipal, @Validated @RequestBody CropRequest request) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Crop crop = new Crop(
            user,
            request.getName(),
            request.getProgress(),
            request.getStage(),
            request.getWatering(),
            request.getHealth()
        );
        Crop saved = cropRepository.save(crop);
        return ResponseEntity.ok(saved);
    }
}
