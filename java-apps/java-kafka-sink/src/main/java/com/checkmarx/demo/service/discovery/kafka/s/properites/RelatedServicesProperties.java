package com.checkmarx.demo.service.discovery.kafka.s.properites;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("related.services")
@Data
public class RelatedServicesProperties {

    /**
     * kafka-server-host.
     * <p>
     * <u>Example:</u> {@code localhost:9002}
     */
    private String kafkaServerHost;

    /**
     * kafka-producer-topic.
     * <p>
     * <u>Example:</u> {@code propagator}
     */
    private String kafkaProducerTopic;

    /**
     * kafka-consumer-topic.
     * <p>
     * <u>Example:</u> {@code entry_point}
     */
    private String kafkaConsumerTopic;

    /**
     * Kafka consumer group ID.
     * <p>
     * <u>Example:</u> {@code cxiast}
     */
    private String kafkaConsumerGroupId;
}
