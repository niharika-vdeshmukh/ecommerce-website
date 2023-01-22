package com.example.ecommerce.dao;

import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "product", path = "product")
public interface ProductRepository extends JpaRepository<Product, Long> {
}
