package rabbitmqentrypoint.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rabbitmqentrypoint.producer.Producer;

@Component
public class Receiver {

    @Autowired
    private Producer producer;

    public void receiveMessage(byte[] message) {
        System.out.println("Received <" + new String(message) + ">");
        try {
            producer.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
