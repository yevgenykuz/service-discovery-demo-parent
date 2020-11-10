package com.checkmarx.demo.service.discovery.rabbitmq.hep.controller;

import com.checkmarx.demo.service.discovery.rabbitmq.hep.producer.Producer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rabbitmq")
@Slf4j
public class RabbitMQController {

    private final Producer sender;

    @Autowired
    public RabbitMQController(Producer sender) {
        this.sender = sender;
    }

    @RequestMapping("/send")
    public String sendMessageToRabbitMQ(String message) {
        try {
            sender.send(message.getBytes());
            return "The message \"" + message + "\" sent successfully";
        } catch (Exception e) {
            log.error("RabbitMQ message did not received in the time from of 10 seconds", e);
        }
        return "Message could not been sent or received from RabbitMQ, check logs for more information";
    }
}
