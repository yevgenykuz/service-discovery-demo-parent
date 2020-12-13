package com.checkmarx.demo.service.discovery.http.p.controller;

import com.checkmarx.demo.service.discovery.http.p.service.NoSuchConversionRatioException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Yevgeny Kuznetsov
 * @since 14 December 2020
 **/
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    @ExceptionHandler(NoSuchConversionRatioException.class)
    public ResponseEntity<String> handleNoSuchConversionRatioException(NoSuchConversionRatioException e) {
        log.warn(e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.PRECONDITION_FAILED);
    }
}
