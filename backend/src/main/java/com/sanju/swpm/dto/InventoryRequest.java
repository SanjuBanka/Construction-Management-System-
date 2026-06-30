package com.sanju.swpm.dto;

import lombok.Data;

@Data
public class InventoryRequest {
    private String itemName;
    private Integer quantity;
    private String itemDesc;
    private Integer reorderLevel;
}
