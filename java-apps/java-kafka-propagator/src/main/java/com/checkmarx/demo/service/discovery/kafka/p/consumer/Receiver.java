package com.checkmarx.demo.service.discovery.kafka.p.consumer;

import com.checkmarx.demo.service.discovery.kafka.p.producer.Sender;
import com.checkmarx.demo.service.discovery.kafka.p.properites.RelatedServicesProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;

@Slf4j
public class Receiver {

    @Autowired
    private Sender sender;

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @KafkaListener(topics = "#{relatedServicesProperties.getKafkaConsumerTopic()}")
    public void receiveMessage(Message<?> message) {
        String payload = (String) message.getPayload();
        log.info("received message='{}'", message);
        sender.sendMessage(relatedServicesProperties.getKafkaProducerTopic(), payload);
    }
}
