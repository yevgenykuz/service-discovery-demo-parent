package com.checkmarx.demo.service.discovery.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Home page controller class.
 */
@RestController
@Slf4j
public class HomeController {

    private final HttpServletRequest request;

    @Autowired
    public HomeController(HttpServletRequest request) {
        this.request = request;
    }

    @RequestMapping("/home")
    public void jpaExampleIndex() {
        log.info("jpa-example\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "jpaExampleIndex";
    }
}
