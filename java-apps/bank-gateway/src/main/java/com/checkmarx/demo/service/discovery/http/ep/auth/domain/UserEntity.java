package com.checkmarx.demo.service.discovery.http.ep.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    private String login;
    private String password;
    private String roleEntity;

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
        this.roleEntity = "ROLE_USER";
    }
}
