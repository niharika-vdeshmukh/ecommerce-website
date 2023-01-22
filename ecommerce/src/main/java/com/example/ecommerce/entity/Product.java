package com.example.ecommerce.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String sku;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private BigDecimal unitPrice;

    @Column
    private String imageUrl;

    @Column
    private boolean active;

    @Column
    private int unitsInStock;

    @Column
    @CreationTimestamp
    private Date dateCreated;

    @Column
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;
}
