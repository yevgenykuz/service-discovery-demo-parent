package com.checkmarx.demo.service.discovery.http.ep.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseEntity {
    private String token;
    private String name;
}
