package com.agriconnect.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agriconnect.backend.model.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
}
