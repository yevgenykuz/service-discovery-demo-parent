
package rabbitmqentrypoint.consumer;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import rabbitmqentrypoint.properites.RelatedServicesProperties;

@Configuration
public class ReceiverConfiguration {

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
                                             MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(relatedServicesProperties.getRabbitMQConsumerQueueName());
        container.setMessageListener(listenerAdapter);
        return container;
    }

}
