package com.sanju.swpm.repository;

import com.sanju.swpm.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByQuantityLessThanEqual(Integer threshold);
}
