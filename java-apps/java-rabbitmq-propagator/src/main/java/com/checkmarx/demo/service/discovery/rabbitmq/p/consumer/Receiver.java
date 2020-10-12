package com.checkmarx.demo.service.discovery.rabbitmq.p.consumer;

import com.checkmarx.demo.service.discovery.rabbitmq.p.producer.Producer;
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
        //TODO do something to the message before passing it to next service
        try {
            producer.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
