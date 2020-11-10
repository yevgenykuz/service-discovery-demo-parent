package com.checkmarx.demo.service.discovery.rabbitmq.hep.producer;

import com.checkmarx.demo.service.discovery.rabbitmq.hep.properites.RelatedServicesProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Producer {

    private final RabbitTemplate rabbitTemplate;

    private final RelatedServicesProperties relatedServicesProperties;

    @Autowired
    public Producer(RabbitTemplate rabbitTemplate, RelatedServicesProperties relatedServicesProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.relatedServicesProperties = relatedServicesProperties;
    }

    public void send(byte[] message) {
        log.info("Sending message: " + new String(message));
        rabbitTemplate.convertAndSend(relatedServicesProperties.getRabbitMQProducerQueueName(), message);
    }
}
