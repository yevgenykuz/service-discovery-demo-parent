package rabbitmqhttpentrypoint.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rabbitmqhttpentrypoint.consumer.Receiver;
import rabbitmqhttpentrypoint.producer.Producer;
import rabbitmqhttpentrypoint.properites.RelatedServicesProperties;

import java.util.concurrent.TimeUnit;

/**
 * Home page hybrid.controller class.
 */
@RestController
@RequestMapping("/rabbitmq")
public class RabbitMQController {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQController.class);
    @Autowired
    private Producer sender;

    @Autowired
    private Receiver receiver;

    @RequestMapping("/send")
    public String sendMessageToRabbitMQ(String message) {
        try {
            sender.send(message.getBytes());
            String receivedMessage = receiver.getReceivedMessagesQueue().poll(10, TimeUnit.SECONDS);
            return "The message \"" + receivedMessage + "\" sent and received successfully";
        } catch (Exception e) {
            LOGGER.error("RabbitMQ message did not received in the time from of 10 seconds", e);
        }

        return "Message could not been sent or received from RabbitMQ, check logs for more information";
    }
}
