package com.checkmarx.demo.service.discovery.http.ep.auth.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthRequestEntity {
    private String login;
    private String password;
}
