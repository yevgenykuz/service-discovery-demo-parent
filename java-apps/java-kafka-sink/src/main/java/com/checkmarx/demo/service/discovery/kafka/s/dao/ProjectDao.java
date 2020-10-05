package com.checkmarx.demo.service.discovery.kafka.s.dao;


import com.checkmarx.demo.service.discovery.kafka.s.model.Project;

import java.util.Collection;

/**
 * Project DAO interface.
 */
public interface ProjectDao {

    Collection<Project> findByNameSafe(String name);

    Collection<Project> findByNameUnsafe(String name);
}
