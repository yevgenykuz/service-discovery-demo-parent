package kafkasink.consumer;

import kafkasink.dao.ProjectDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;

import java.io.IOException;
import java.util.Random;

public class Receiver {

	private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

	@Autowired
	private ProjectDao projectDao;

	@KafkaListener(topics = "${related.services.kafka-consumer-topic}")
	public void receiveMessage(Message message) {
		Object payload = message.getPayload();

		String value = payload.toString();
		if (value.equalsIgnoreCase("COMMANDI")) {
			performCommandInjection(value);
		} else if (value.equalsIgnoreCase("RANDOM")) {
			performRandom(value);
		} else if (value.equalsIgnoreCase("SQLI")) {
			performSqlInjection(value);
		} else {
			LOGGER.info("received message='{}'", message);
		}
	}

	private void performSqlInjection(String value) {
		projectDao.findByNameUnsafe(value);
		LOGGER.info("Perform SQL injection, input value '{}'", value);
	}

	private void performRandom(String value) {
		Random rand = new Random();
		String output = value + " " + rand.nextInt();
		LOGGER.info("Perform Random, input value '{}'", output);
	}

	private void performCommandInjection(String value) {
		try {
			new ProcessBuilder().inheritIO().command("cmd", "/c", "echo input is: " + value).start().waitFor();
			LOGGER.info("Perform command injection, input value '{}'", value);
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
