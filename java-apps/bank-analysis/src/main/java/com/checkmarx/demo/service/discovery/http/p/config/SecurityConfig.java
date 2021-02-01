package com.checkmarx.demo.service.discovery.http.p.config;

import com.checkmarx.demo.service.discovery.http.p.properites.RelatedServicesProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;

/**
 * @author Yevgeny Kuznetsov
 * @since 13 December 2020
 **/
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/check-loan-credibility").cors().configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(Collections.singletonList("*"));
            config.setAllowedMethods(Collections.singletonList("GET"));
            config.setAllowedHeaders(Collections.singletonList("*"));
            return config;
        }).and().authorizeRequests().antMatchers("**").permitAll();
    }
}
