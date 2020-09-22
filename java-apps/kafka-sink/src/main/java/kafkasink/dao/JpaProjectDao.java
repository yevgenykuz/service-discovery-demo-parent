package kafkasink.dao;

import kafkasink.model.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class JpaProjectDao implements ProjectDao {
	private static final Logger LOGGER = LoggerFactory.getLogger(JpaProjectDao.class);
	
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
		LOGGER.debug("findByNameUnsafe: " + sql);
		return entityManager.createNativeQuery(sql).getResultList();
	}
}
