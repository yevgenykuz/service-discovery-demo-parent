package kafkahttpentrypoint.controller;

import kafkahttpentrypoint.kafka.consumer.Receiver;
import kafkahttpentrypoint.kafka.producer.Sender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Home page hybrid.controller class.
 */
@RestController
@RequestMapping("/kafka")
public class KafkaController {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaController.class);
    @Autowired
    private Sender sender;

    @Autowired
    private Receiver receiver;

    @Value("${kafka.producer.topic}")
    private String producerTopic;

    @RequestMapping("/send")
    public String sendMessageToKafka(String message) {
        sender.sendMessage(producerTopic, message);
        try {
            String receivedMessage = receiver.getReceivedMessagesQueue().poll(10, TimeUnit.SECONDS);
            return "The message \"" + receivedMessage + "\" sent and received successfully";
        } catch (InterruptedException e) {
            LOGGER.error("Kafka message did not received in the time from of 10 seconds", e);
        }

        return "Message could not been sent or received from Kafka, check logs for more information";
    }
}
