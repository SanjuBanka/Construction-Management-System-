package com.sanju.swpm.repository;

import com.sanju.swpm.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByProjectId(Long projectId);
    Optional<Material> findByRequestId(String requestId);
}
