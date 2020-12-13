package com.checkmarx.demo.service.discovery.http.s.dao;

import com.checkmarx.demo.service.discovery.http.s.model.Project;

import java.util.Collection;

/**
 * Project DAO interface.
 */
public interface ProjectDao {

    Collection<Project> findByNameSafe(String name);

    Collection<Project> findByNameUnsafe(String name);
}
