package rabbitmqpropagator.producer;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import rabbitmqpropagator.properites.RelatedServicesProperties;

@Configuration
public class ProducerConfiguration {

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

	@Bean
	public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
		RabbitTemplate template = new RabbitTemplate(connectionFactory);
		template.setRoutingKey(relatedServicesProperties.getRabbitMQProducerQueueName());
		return template;
	}

}
