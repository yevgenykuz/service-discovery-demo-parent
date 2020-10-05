package com.checkmarx.demo.service.discovery.kafka.hep.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String showWelcomePage() {
        return "Kafka web sender example application";
    }
}
