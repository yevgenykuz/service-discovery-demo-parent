package com.checkmarx.demo.service.discovery.kafka.s.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
}