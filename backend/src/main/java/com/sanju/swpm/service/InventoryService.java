package com.sanju.swpm.service;

import com.sanju.swpm.dto.InventoryRequest;
import com.sanju.swpm.model.Inventory;
import com.sanju.swpm.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAll() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getLowStock() {
        return inventoryRepository.findAll().stream()
                .filter(i -> i.getQuantity() <= i.getReorderLevel())
                .toList();
    }

    public Inventory getById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Inventory item not found: " + id));
    }

    public Inventory create(InventoryRequest req) {
        Inventory item = Inventory.builder()
                .itemName(req.getItemName())
                .quantity(req.getQuantity() != null ? req.getQuantity() : 0)
                .itemDesc(req.getItemDesc())
                .reorderLevel(req.getReorderLevel() != null ? req.getReorderLevel() : 10)
                .build();
        return inventoryRepository.save(item);
    }

    public Inventory update(Long id, InventoryRequest req) {
        Inventory item = getById(id);
        item.setItemName(req.getItemName());
        item.setQuantity(req.getQuantity());
        item.setItemDesc(req.getItemDesc());
        item.setReorderLevel(req.getReorderLevel());
        return inventoryRepository.save(item);
    }

    public void delete(Long id) {
        inventoryRepository.deleteById(id);
    }
}
