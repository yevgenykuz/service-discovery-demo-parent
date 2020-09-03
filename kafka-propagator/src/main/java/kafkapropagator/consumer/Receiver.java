package kafkapropagator.consumer;

import kafkapropagator.producer.Sender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;

public class Receiver {

    private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

	@Autowired
	private Sender sender;

	@Value("${kafka.producer.topic}")
	private String producerTopic;

    @KafkaListener(topics = "${kafka.consumer.topic}")
    public void receiveMessage(Message message) {
		String payload = (String)message.getPayload();
        LOGGER.info("received message='{}'", message);
        //do something to the data

		sender.sendMessage(producerTopic, payload);
    }
}
