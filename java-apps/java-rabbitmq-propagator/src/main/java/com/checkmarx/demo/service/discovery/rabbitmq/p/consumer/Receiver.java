package com.checkmarx.demo.service.discovery.rabbitmq.p.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.checkmarx.demo.service.discovery.rabbitmq.p.producer.Producer;

@Component
public class Receiver {

    @Autowired
    private Producer producer;

    public void receiveMessage(byte[] message) {
        System.out.println("Received <" + new String(message) + ">");
        //TODO do something to the message before passing it to next service
        try {
            producer.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
