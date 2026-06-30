package com.sanju.swpm.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Builder.Default
    private Integer quantity = 0;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "reorder_level")
    @Builder.Default
    private Integer reorderLevel = 10;
}
