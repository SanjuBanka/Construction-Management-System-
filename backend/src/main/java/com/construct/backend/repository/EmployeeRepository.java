package com.construct.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construct.backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
