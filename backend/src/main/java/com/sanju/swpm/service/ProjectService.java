package com.sanju.swpm.service;

import com.sanju.swpm.dto.ProjectRequest;
import com.sanju.swpm.model.Project;
import com.sanju.swpm.model.User;
import com.sanju.swpm.repository.ProjectRepository;
import com.sanju.swpm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
    }

    public Project create(ProjectRequest req) {
        Project project = Project.builder()
                .projectName(req.getProjectName())
                .budget(req.getBudget())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .status(req.getStatus())
                .manager(req.getManagerId() != null ? findUser(req.getManagerId()) : null)
                .customer(req.getCustomerId() != null ? findUser(req.getCustomerId()) : null)
                .build();
        return projectRepository.save(project);
    }

    public Project update(Long id, ProjectRequest req) {
        Project project = getById(id);
        project.setProjectName(req.getProjectName());
        project.setBudget(req.getBudget());
        project.setStartDate(req.getStartDate());
        project.setEndDate(req.getEndDate());
        if (req.getStatus() != null) project.setStatus(req.getStatus());
        if (req.getManagerId() != null) project.setManager(findUser(req.getManagerId()));
        if (req.getCustomerId() != null) project.setCustomer(findUser(req.getCustomerId()));
        return projectRepository.save(project);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
    }
}
