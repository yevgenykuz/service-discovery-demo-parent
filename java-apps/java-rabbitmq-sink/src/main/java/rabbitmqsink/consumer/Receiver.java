package rabbitmqsink.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rabbitmqsink.dao.ProjectDao;

import java.io.IOException;
import java.util.Random;

@Component
public class Receiver {

    private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    private ProjectDao projectDao;

    public void receiveMessage(byte[] message) {
        String msg = new String(message);

        if (msg.equalsIgnoreCase("COMMANDI")) {
            performCommandInjection(msg);
        } else if (msg.equalsIgnoreCase("RANDOM")) {
            performRandom(msg);
        } else if (msg.equalsIgnoreCase("SQLI")) {
            performSqlInjection(msg);
        } else {
            LOGGER.info("received message='{}'", msg);
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
