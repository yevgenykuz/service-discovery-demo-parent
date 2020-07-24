package com.checkmarx.demo.service.discovery.controller;

import com.checkmarx.demo.service.discovery.dao.ProjectDao;
import com.checkmarx.demo.service.discovery.model.Project;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Project REST controller class.
 */
@RestController
@RequestMapping("/projects")
public class ProjectsController {
    private static final Logger LOGGER = LogManager.getLogger(ProjectsController.class);

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    private ProjectDao projectDao;

    @RequestMapping(path = "/safe", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Project> findByNameSafe(@RequestParam("name") String name) {
        System.out.println("findByNameSafe: " + name);
        return projectDao.findByNameSafe(name);
    }

    @RequestMapping(path = "/safe", method = RequestMethod.POST)
    @ResponseBody
    public Collection<Project> findByNameSafePost(@RequestParam("name") String name,
                                                  @RequestHeader MultiValueMap<String, String> headers) {
        System.out.println("findByNameSafePost: " + name);
        System.out.println("findByNameSafePost - headers: " + headers);
        return projectDao.findByNameSafe(name);
    }

    @RequestMapping(path = "/unsafe", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Project> findByNameUnsafe(@RequestParam("name") String name) {
        LOGGER.debug("findByNameUnsafe: " + name);
        return projectDao.findByNameUnsafe(name);
    }
}
