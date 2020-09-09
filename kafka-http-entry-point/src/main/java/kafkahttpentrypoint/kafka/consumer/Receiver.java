package kafkahttpentrypoint.kafka.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class Receiver {

	private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);
    private BlockingQueue<String> receivedMessagesQueue = new ArrayBlockingQueue(1024);

	@KafkaListener(topics = "${kafka.producer.topic}")
	public void receiveMessage(Message message) {
		LOGGER.info("Received Kafka message " + message);
		Object payload = message.getPayload();
		String value = payload.toString();
		receivedMessagesQueue.add(value);
	}

	public BlockingQueue<String> getReceivedMessagesQueue() {
		return receivedMessagesQueue;
	}
}
