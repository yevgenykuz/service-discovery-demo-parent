package com.checkmarx.demo.service.discovery.rabbitmq.p;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.checkmarx.demo.service.discovery.rabbitmq.p.consumer.Receiver;
import com.checkmarx.demo.service.discovery.rabbitmq.p.properites.RelatedServicesProperties;

@Configuration
public class BaseConfiguration {

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @Bean
    Queue queue() {
        return new Queue(relatedServicesProperties.getRabbitMQConsumerQueueName(), false);
    }

    @Bean
    MessageListenerAdapter listenerAdapter(Receiver receiver) {
        return new MessageListenerAdapter(receiver, "receiveMessage");
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(relatedServicesProperties.getRabbitMQServerHost());
        connectionFactory.setUsername("guest");
        connectionFactory.setPassword("guest");
        return connectionFactory;
    }
}
