package com.checkmarx.demo.service.discovery.controller;

import com.checkmarx.demo.service.discovery.dao.ProjectDao;
import com.checkmarx.demo.service.discovery.model.Project;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Project REST controller class.
 */
@RestController
@RequestMapping("/projects")
@Slf4j
public class ProjectsController {

    private final ProjectDao projectDao;

    @Autowired
    public ProjectsController(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @RequestMapping(path = "/safe", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Project> findByNameSafe(@RequestParam("name") String name) {
        log.info("findByNameSafe: " + name);
        return projectDao.findByNameSafe(name);
    }

    @RequestMapping(path = "/safe", method = RequestMethod.POST)
    @ResponseBody
    public Collection<Project> findByNameSafePost(@RequestParam("name") String name,
                                                  @RequestHeader MultiValueMap<String, String> headers) {
        log.info("findByNameSafePost: " + name);
        log.info("findByNameSafePost - headers: " + headers);
        return projectDao.findByNameSafe(name);
    }

    @RequestMapping(path = "/unsafe", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Project> findByNameUnsafe(@RequestParam("name") String name) {
        log.info("findByNameUnsafe: " + name);
        return projectDao.findByNameUnsafe(name);
    }
}
