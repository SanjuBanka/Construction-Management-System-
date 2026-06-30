package com.sanju.swpm.service;

import com.sanju.swpm.dto.MaterialRequest;
import com.sanju.swpm.model.Inventory;
import com.sanju.swpm.model.Material;
import com.sanju.swpm.model.MaterialStatus;
import com.sanju.swpm.model.Project;
import com.sanju.swpm.model.User;
import com.sanju.swpm.repository.InventoryRepository;
import com.sanju.swpm.repository.MaterialRepository;
import com.sanju.swpm.repository.ProjectRepository;
import com.sanju.swpm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final ProjectRepository projectRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    public MaterialService(MaterialRepository materialRepository, ProjectRepository projectRepository,
                            InventoryRepository inventoryRepository, UserRepository userRepository) {
        this.materialRepository = materialRepository;
        this.projectRepository = projectRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }

    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    public List<Material> getByProject(Long projectId) {
        return materialRepository.findByProjectId(projectId);
    }

    public Material create(MaterialRequest req) {
        Project project = projectRepository.findById(req.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + req.getProjectId()));
        Inventory item = inventoryRepository.findById(req.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("Inventory item not found: " + req.getItemId()));
        User requestedBy = req.getRequestedById() != null
                ? userRepository.findById(req.getRequestedById()).orElse(null) : null;

        Material material = Material.builder()
                .requestId(req.getRequestId())
                .project(project)
                .item(item)
                .quantityRequested(req.getQuantityRequested())
                .status(req.getStatus() != null ? req.getStatus() : MaterialStatus.PENDING)
                .requestedBy(requestedBy)
                .build();
        return materialRepository.save(material);
    }

    public Material updateStatus(Long id, MaterialStatus status) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Material request not found: " + id));

        if (status == MaterialStatus.FULFILLED && material.getStatus() != MaterialStatus.FULFILLED) {
            Inventory item = material.getItem();
            item.setQuantity(Math.max(0, item.getQuantity() - material.getQuantityRequested()));
            inventoryRepository.save(item);
        }

        material.setStatus(status);
        return materialRepository.save(material);
    }

    public void delete(Long id) {
        materialRepository.deleteById(id);
    }
}
