package com.checkmarx.demo.service.discovery.http.s.properites;

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
     * bank-gateway application URL.
     * <p>
     * <u>Example:</u> {@code http://bank-gateway:8181}
     */
    private String bankGatewayUrl;

    /**
     * java-http-propagator application URL.
     * <p>
     * <u>Example:</u> {@code http://java-http-propagator:8182}
     */
    private String javaHttpPropagatorUrl;
}
