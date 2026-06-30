package com.sanju.swpm.repository;

import com.sanju.swpm.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByManagerId(Long managerId);
    List<Project> findByCustomerId(Long customerId);
}
