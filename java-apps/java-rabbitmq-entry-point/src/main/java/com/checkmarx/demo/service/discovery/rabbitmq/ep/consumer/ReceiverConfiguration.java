
package com.checkmarx.demo.service.discovery.rabbitmq.ep.consumer;

import com.checkmarx.demo.service.discovery.rabbitmq.ep.properites.RelatedServicesProperties;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReceiverConfiguration {

    private final RelatedServicesProperties relatedServicesProperties;

    @Autowired
    public ReceiverConfiguration(RelatedServicesProperties relatedServicesProperties) {
        this.relatedServicesProperties = relatedServicesProperties;
    }

    @Bean
    public SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
                                                    MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(relatedServicesProperties.getRabbitMQConsumerQueueName());
        container.setMessageListener(listenerAdapter);
        return container;
    }
}
