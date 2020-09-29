package rabbitmqsink;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import rabbitmqsink.consumer.Receiver;
import rabbitmqsink.properites.RelatedServicesProperties;

@Configuration
public class BaseConfiguration {

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    @Bean
    Queue queue() {
        return new Queue(relatedServicesProperties.getRabbitMQConsumerQueueName(), false);
    }

/*    @Bean
    TopicExchange exchange() {
        return new TopicExchange(relatedServicesProperties.getRabbitmqExchange());
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("foo.bar.#");
    }*/

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
