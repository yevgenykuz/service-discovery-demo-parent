package com.checkmarx.demo.service.discovery.rabbitmq.hep.producer;

import com.checkmarx.demo.service.discovery.rabbitmq.hep.properites.RelatedServicesProperties;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProducerConfiguration {

    private final RelatedServicesProperties relatedServicesProperties;

    @Autowired
    public ProducerConfiguration(RelatedServicesProperties relatedServicesProperties) {
        this.relatedServicesProperties = relatedServicesProperties;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setRoutingKey(relatedServicesProperties.getRabbitMQProducerQueueName());
        return template;
    }
}
