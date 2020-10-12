
package com.checkmarx.demo.service.discovery.rabbitmq.p.consumer;

import com.checkmarx.demo.service.discovery.rabbitmq.p.properites.RelatedServicesProperties;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReceiverConfiguration {

    private final RelatedServicesProperties relatedServicesProperties;

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
