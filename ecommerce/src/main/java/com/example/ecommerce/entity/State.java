package com.example.ecommerce.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "state")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;



}
