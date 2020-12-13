package com.checkmarx.demo.service.discovery.http.p.properites;

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
     * bank-storage application URL.
     * <p>
     * <u>Example:</u> {@code http://bank-storage:8183}
     */
    private String bankStorageUrl;

    /**
     * dotnet-core-http-entry-point application URL.
     * <p>
     * <u>Example:</u> {@code http://dotnet-core-http-entry-point:5551}
     */
    private String dotnetCoreHttpEntryPointUrl;
}
