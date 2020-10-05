package com.checkmarx.demo.service.discovery.http.s.dao;

import com.checkmarx.demo.service.discovery.http.s.model.Project;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.Collection;

/**
 * JPA project DAO implementation.
 */
@Repository
@Slf4j
public class JpaProjectDao implements ProjectDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Collection<Project> findByNameSafe(String name) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Project> criteriaQuery = criteriaBuilder.createQuery(Project.class);
        Metamodel metamodel = entityManager.getMetamodel();
        EntityType<Project> projectEntity = metamodel.entity(Project.class);
        Root<Project> projectRoot = criteriaQuery.from(Project.class);
        criteriaQuery.where(criteriaBuilder.equal(projectRoot.get(projectEntity.getSingularAttribute("name")), name));
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public Collection<Project> findByNameUnsafe(String name) {
        String sql = String.format("SELECT * FROM PROJECTS WHERE name = '%s'", name);
        log.info("findByNameUnsafe: " + sql);
        return entityManager.createNativeQuery(sql).getResultList();
    }
}
