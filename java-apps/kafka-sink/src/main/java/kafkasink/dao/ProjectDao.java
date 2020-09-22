package kafkasink.dao;


import kafkasink.model.Project;

import java.util.Collection;

/**
 * Project DAO interface.
 */
public interface ProjectDao {
	/**
	 * Find projects by name after input validation.
	 * @param name
	 * @return
	 */
	Collection<Project> findByNameSafe(String name);
	
	/**
	 * Find projects by name without input validation.
	 * @param name
	 * @return
	 */
	Collection<Project> findByNameUnsafe(String name);
}
