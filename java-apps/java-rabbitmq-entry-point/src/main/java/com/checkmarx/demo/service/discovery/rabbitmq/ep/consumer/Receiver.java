package com.checkmarx.demo.service.discovery.rabbitmq.ep.consumer;

import com.checkmarx.demo.service.discovery.rabbitmq.ep.producer.Producer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {

    private final Producer producer;

    @Autowired
    public Receiver(Producer producer) {
        this.producer = producer;
    }

    public void receiveMessage(byte[] message) {
        log.info("Received <" + new String(message) + ">");
        try {
            producer.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
