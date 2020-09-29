package rabbitmqhttpentrypoint.consumer;

import org.springframework.stereotype.Component;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Component
public class Receiver {

    private BlockingQueue<String> receivedMessagesQueue = new ArrayBlockingQueue(1024);

    public void receiveMessage(byte[] message) {
        String msg = new String(message);
        System.out.println("Received <" + msg + ">");
        receivedMessagesQueue.add(msg);
    }

    public BlockingQueue<String> getReceivedMessagesQueue() {
        return receivedMessagesQueue;
    }
}
