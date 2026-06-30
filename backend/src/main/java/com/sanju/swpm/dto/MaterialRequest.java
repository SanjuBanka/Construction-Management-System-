package com.sanju.swpm.dto;

import com.sanju.swpm.model.MaterialStatus;
import lombok.Data;

@Data
public class MaterialRequest {
    private String requestId;
    private Long projectId;
    private Long itemId;
    private Integer quantityRequested;
    private MaterialStatus status;
    private Long requestedById;
}
