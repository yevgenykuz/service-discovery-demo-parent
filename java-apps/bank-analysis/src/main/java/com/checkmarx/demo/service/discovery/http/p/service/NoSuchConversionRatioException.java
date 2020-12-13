package com.checkmarx.demo.service.discovery.http.p.service;

/**
 * @author Yevgeny Kuznetsov
 * @since 14 December 2020
 **/
public class NoSuchConversionRatioException extends RuntimeException {

    public NoSuchConversionRatioException(Currency source, Currency target) {
        super("No conversion ratio between " + source + " and " + target);
    }
}
