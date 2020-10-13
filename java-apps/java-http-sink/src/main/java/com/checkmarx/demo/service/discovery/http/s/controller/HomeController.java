package com.checkmarx.demo.service.discovery.http.s.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Home page controller class.
 */
@RestController
@Slf4j
public class HomeController {

    @RequestMapping("/home")
    public void javaHttpSinkIndex(HttpServletRequest request) {
        log.info("java-http-sink\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "javaHttpSinkIndex";
    }
}
