package com.checkmarx.demo.service.discovery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Home page controller class.
 */
@RestController
public class HomeController {

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    private HttpServletRequest request;

    @RequestMapping("/home")
    public void jpaExampleIndex() {
        System.out.println("jpa-example\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "jpaExampleIndex";
    }
}
