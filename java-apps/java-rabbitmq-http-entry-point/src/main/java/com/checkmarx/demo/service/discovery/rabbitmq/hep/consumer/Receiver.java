/*
package com.checkmarx.demo.service.discovery.rabbitmq.hep.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Component
@Slf4j
public class Receiver {

    private final BlockingQueue<String> receivedMessagesQueue = new ArrayBlockingQueue<>(1024);

    public void receiveMessage(byte[] message) {
        String msg = new String(message);
        log.info("Received <" + msg + ">");
        receivedMessagesQueue.add(msg);
    }

    public BlockingQueue<String> getReceivedMessagesQueue() {
        return receivedMessagesQueue;
    }
}
*/
