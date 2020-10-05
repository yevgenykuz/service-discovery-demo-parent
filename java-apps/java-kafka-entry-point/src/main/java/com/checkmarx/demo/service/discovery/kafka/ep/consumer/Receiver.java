package com.checkmarx.demo.service.discovery.kafka.ep.consumer;

import com.checkmarx.demo.service.discovery.kafka.ep.producer.Sender;
import com.checkmarx.demo.service.discovery.kafka.ep.properites.RelatedServicesProperties;
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

    @KafkaListener(topics = "#{relatedServicesProperties.getKafkaConsumerLoopTopic()}")
    public void receiveLoopedMessage(Message<?> message) {
        log.info("Received looped Kafka message " + message);
    }
}
