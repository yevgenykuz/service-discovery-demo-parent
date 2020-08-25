package com.checkmarx.demo.service.discovery.properites;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author Yevgeny Kuznetsov
 * @since 1.0.0, 25 August 2020
 **/
@Component
@ConfigurationProperties("related.services")
@Data
public class RelatedServicesProperties {

    /**
     * propagator-example application URL.
     * <p>
     * <u>Example:</u> {@code http://propagator-example-38:8182}
     */
    private String propagatorExampleUrl;

    /**
     * jpa-example application URL.
     * <p>
     * <u>Example:</u> {@code http://jpa-example-38:8183}
     */
    private String jpaExampleUrl;
}
