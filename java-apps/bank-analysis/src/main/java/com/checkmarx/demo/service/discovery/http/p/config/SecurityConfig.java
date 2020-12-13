package com.checkmarx.demo.service.discovery.http.p.config;

import com.checkmarx.demo.service.discovery.http.p.properites.RelatedServicesProperties;
import com.sun.tools.javac.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

/**
 * @author Yevgeny Kuznetsov
 * @since 13 December 2020
 **/
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final RelatedServicesProperties relatedServicesProperties;

    @Autowired
    public SecurityConfig(RelatedServicesProperties relatedServicesProperties) {
        this.relatedServicesProperties = relatedServicesProperties;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/check-loan-credibility").cors().configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(List.of(relatedServicesProperties.getBankGatewayUrl()));
            config.setAllowedMethods(List.of("GET"));
            config.setAllowedHeaders(List.of("*"));
            return config;
        }).and().authorizeRequests().antMatchers("**").permitAll();
    }
}
