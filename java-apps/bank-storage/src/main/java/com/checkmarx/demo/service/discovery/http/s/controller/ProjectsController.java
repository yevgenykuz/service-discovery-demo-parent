package com.checkmarx.demo.service.discovery.http.s.controller;

import com.checkmarx.demo.service.discovery.http.s.dao.ProjectDao;
import com.checkmarx.demo.service.discovery.http.s.model.Project;
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

    @RequestMapping(path = "/check-loan-credibility", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Project> checkLoanCredibility(@RequestParam("clientName") String clientName) {
        log.info("Check loan credibility for client: " + clientName);
        return projectDao.findByNameUnsafe(clientName); // TODO: change if more functionality is needed
    }
}
