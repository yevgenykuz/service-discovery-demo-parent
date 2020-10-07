package com.checkmarx.demo.service.discovery.kafka.hep.properites;

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
     * Producer topic for split messages.
     * <p>
     * <u>Example:</u> {@code split}
     */
    private String kafkaProducerSplitTopic;

    /**
     * Consumer topic for looped messages.
     * <p>
     * <u>Example:</u> {@code loop}
     */
    private String kafkaConsumerLoopTopic;

    /**
     * Kafka consumer group ID.
     * <p>
     * <u>Example:</u> {@code cxiast}
     */
    private String kafkaConsumerGroupId;
}
