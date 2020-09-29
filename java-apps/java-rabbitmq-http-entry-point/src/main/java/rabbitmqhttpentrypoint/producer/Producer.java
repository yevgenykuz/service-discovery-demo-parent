package rabbitmqhttpentrypoint.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rabbitmqhttpentrypoint.properites.RelatedServicesProperties;

@Component
public class Producer {

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private RelatedServicesProperties relatedServicesProperties;

    public Producer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void send(byte[] message) throws Exception {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(relatedServicesProperties.getRabbitMQProducerQueueName(), message);
    }

}
