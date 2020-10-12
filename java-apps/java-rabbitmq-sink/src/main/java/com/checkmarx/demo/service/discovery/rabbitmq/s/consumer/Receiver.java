package com.checkmarx.demo.service.discovery.rabbitmq.s.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.checkmarx.demo.service.discovery.rabbitmq.s.dao.ProjectDao;

import java.util.Random;

@Component
@Slf4j
public class Receiver {

    private final ProjectDao projectDao;

    @Autowired
    public Receiver(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public void receiveMessage(byte[] message) {
        String msg = new String(message);
        if (msg.equalsIgnoreCase("COMMANDI")) {
            performCommandInjection(msg);
        } else if (msg.equalsIgnoreCase("RANDOM")) {
            performRandom(msg);
        } else if (msg.equalsIgnoreCase("SQLI")) {
            performSqlInjection(msg);
        } else {
            log.info("received message='{}'", msg);
        }
    }

    private void performSqlInjection(String value) {
        projectDao.findByNameUnsafe(value);
        log.info("Perform SQL injection, input value '{}'", value);
    }

    private void performRandom(String value) {
        Random rand = new Random();
        String output = value + " " + rand.nextInt();
        log.info("Perform Random, input value '{}'", output);
    }

    private void performCommandInjection(String value) {
        try {
            new ProcessBuilder().inheritIO().command("cmd", "/c", "echo input is: " + value).start().waitFor();
            log.info("Perform command injection, input value '{}'", value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
