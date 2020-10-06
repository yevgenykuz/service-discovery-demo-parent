package com.checkmarx.demo.service.discovery.kafka.s.consumer;

import com.checkmarx.demo.service.discovery.kafka.s.dao.ProjectDao;
import com.checkmarx.demo.service.discovery.kafka.s.model.Project;
import com.checkmarx.demo.service.discovery.kafka.s.producer.Sender;
import com.checkmarx.demo.service.discovery.kafka.s.properites.RelatedServicesProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;

import java.util.Collection;
import java.util.Random;

@Slf4j
public class Receiver {

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private Sender sender;

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @KafkaListener(topics = "#{relatedServicesProperties.getKafkaConsumerTopic()}")
    public void receiveMessage(Message<?> message) {
        Object payload = message.getPayload();
        String value = payload.toString();
        if (value.equalsIgnoreCase("COMMANDI")) {
            performCommandInjection(value);
        } else if (value.equalsIgnoreCase("RANDOM")) {
            performRandom(value);
        } else if (value.equalsIgnoreCase("SQLI")) {
            performSqlInjection(value);
        } else if (value.equalsIgnoreCase("SANITIZED")) {
            performSanitizedSqlCall(value);
        } else if (value.equalsIgnoreCase("LOOP")) {
            performLoopBackToHttpEntry(value);
        } else {
            log.info("received message='{}'", message);
        }
    }

    private void performLoopBackToHttpEntry(String value) {
        final Collection<Project> result = projectDao.findByNameSafe(value);
        log.info("Perform sanitized SQL call, input value '{}', output value '{}'", value, result);
        sender.sendMessage(relatedServicesProperties.getKafkaProducerTopic(), value);
    }

    private void performSanitizedSqlCall(String value) {
        final Collection<Project> result = projectDao.findByNameSafe(value);
        log.info("Perform sanitized SQL call, input value '{}', output value '{}'", value, result);
    }

    private void performSqlInjection(String value) {
        final Collection<Project> result = projectDao.findByNameUnsafe(value);
        log.info("Perform SQL injection, input value '{}', output value '{}'", value, result);
    }

    private void performRandom(String value) {
        Random rand = new Random();
        String output = value + " " + rand.nextInt();
        log.info("Perform random, input value '{}'", output);
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
