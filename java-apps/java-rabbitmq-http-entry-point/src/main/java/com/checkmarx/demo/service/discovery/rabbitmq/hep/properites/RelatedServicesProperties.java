package com.checkmarx.demo.service.discovery.rabbitmq.hep.properites;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("related.services")
@Data
public class RelatedServicesProperties {

    /**
     * rabbitMQ-server-host.
     * <p>
     * <u>Example:</u> {@code localhost}
     */
    private String rabbitMQServerHost;

    /**
     * rabbitMQ-producer-queue-name.
     * <p>
     * <u>Example:</u> {@code propagator}
     */
    private String rabbitMQProducerQueueName;

}
