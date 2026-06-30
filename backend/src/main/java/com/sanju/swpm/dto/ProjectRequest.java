package com.sanju.swpm.dto;

import com.sanju.swpm.model.ProjectStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProjectRequest {
    private String projectName;
    private BigDecimal budget;
    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectStatus status;
    private Long managerId;
    private Long customerId;
}
