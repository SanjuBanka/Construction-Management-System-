package com.sanju.swpm.controller;

import com.sanju.swpm.dto.MaterialRequest;
import com.sanju.swpm.model.Material;
import com.sanju.swpm.model.MaterialStatus;
import com.sanju.swpm.service.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    public ResponseEntity<List<Material>> getAll() {
        return ResponseEntity.ok(materialService.getAll());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Material>> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(materialService.getByProject(projectId));
    }

    @PostMapping
    public ResponseEntity<Material> create(@RequestBody MaterialRequest request) {
        return ResponseEntity.ok(materialService.create(request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Material> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        MaterialStatus status = MaterialStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(materialService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        materialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
