package com.checkmarx.demo.service.discovery.http.s;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BankStorageApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(BankStorageApplication.class, args);
    }
}
