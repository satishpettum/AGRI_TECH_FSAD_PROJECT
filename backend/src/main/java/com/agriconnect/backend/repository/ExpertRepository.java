package com.agriconnect.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agriconnect.backend.model.Expert;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {
}
