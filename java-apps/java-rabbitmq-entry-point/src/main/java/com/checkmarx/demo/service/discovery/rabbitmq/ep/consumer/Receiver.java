package com.checkmarx.demo.service.discovery.rabbitmq.ep.consumer;

import com.checkmarx.demo.service.discovery.rabbitmq.ep.producer.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

    @Autowired
    private Producer producer;

    public void receiveMessage(byte[] message) {
        System.out.println("Received <" + new String(message) + ">");
        try {
            producer.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
