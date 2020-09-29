
package rabbitmqhttpentrypoint.consumer;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import rabbitmqhttpentrypoint.properites.RelatedServicesProperties;

@Configuration
public class ReceiverConfiguration {

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
                                             MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(relatedServicesProperties.getRabbitMQProducerQueueName());
        container.setMessageListener(listenerAdapter);
        return container;
    }

}
