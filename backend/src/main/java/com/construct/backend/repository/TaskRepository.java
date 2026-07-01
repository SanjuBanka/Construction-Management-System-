package com.construct.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construct.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
