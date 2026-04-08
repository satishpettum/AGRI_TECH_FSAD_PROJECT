package com.agriconnect.backend.repository;

import com.agriconnect.backend.model.FavoriteResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteResourceRepository extends JpaRepository<FavoriteResource, Long> {
    List<FavoriteResource> findByUserId(Long userId);
    Optional<FavoriteResource> findByUserIdAndResourceId(Long userId, Long resourceId);
}
