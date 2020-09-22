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
     * rest-entry-point-example application URL.
     * <p>
     * <u>Example:</u> {@code http://rest-entry-point-example-38:8181}
     */
    private String restEntryPointUrl;

    /**
     * jpa-example application URL.
     * <p>
     * <u>Example:</u> {@code http://jpa-example-38:8183}
     */
    private String jpaExampleUrl;
}
