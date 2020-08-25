package com.checkmarx.demo.service.discovery.model;

import lombok.Data;

import javax.persistence.*;


/**
 * Product class.
 */
@Entity
@Table(name = "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
}
