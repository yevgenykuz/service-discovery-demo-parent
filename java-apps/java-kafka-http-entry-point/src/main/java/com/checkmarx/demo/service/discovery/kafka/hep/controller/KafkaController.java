package com.checkmarx.demo.service.discovery.kafka.hep.controller;

import com.checkmarx.demo.service.discovery.kafka.hep.kafka.consumer.Receiver;
import com.checkmarx.demo.service.discovery.kafka.hep.kafka.producer.Sender;
import com.checkmarx.demo.service.discovery.kafka.hep.properites.RelatedServicesProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/kafka")
@Slf4j
public class KafkaController {

    private final Sender sender;
    private final Receiver receiver;
    private final RelatedServicesProperties relatedServicesProperties;

    @Autowired
    public KafkaController(Sender sender, Receiver receiver,
                           RelatedServicesProperties relatedServicesProperties) {
        this.sender = sender;
        this.receiver = receiver;
        this.relatedServicesProperties = relatedServicesProperties;
    }

    @RequestMapping("/send")
    public String sendMessageToKafka(String message) {
        if (message.equalsIgnoreCase("SPLIT")) {
            sender.sendMessage(relatedServicesProperties.getKafkaProducerSplitTopic(), message);
            return "\"" + message + "\" sent";
        } else {
            sender.sendMessage(relatedServicesProperties.getKafkaProducerTopic(), message);
            try {
                String receivedMessage = receiver.getReceivedMessagesQueue().poll(10, TimeUnit.SECONDS);
                return "The message \"" + receivedMessage + "\" sent and received successfully";
            } catch (InterruptedException e) {
                log.error("Kafka message did not received in the time from of 10 seconds", e);
            }
        }
        return "Message could not been sent or received from Kafka, check logs for more information";
    }
}
