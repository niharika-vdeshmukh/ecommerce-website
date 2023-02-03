package com.example.ecommerce.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "country")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private  String name;

    @Column
    private String code;

    @OneToMany(mappedBy = "country")
    private List<State> stateList;
}
