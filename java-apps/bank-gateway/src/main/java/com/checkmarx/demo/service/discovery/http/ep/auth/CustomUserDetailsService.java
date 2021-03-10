package com.checkmarx.demo.service.discovery.http.ep.auth;

import com.checkmarx.demo.service.discovery.http.ep.auth.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class CustomUserDetailsService implements UserDetailsService {


    private final Map<String, UserEntity> users;

    public CustomUserDetailsService() {
        this.users = new HashMap<>();

        users.put("user", new UserEntity("user", "pass"));
    }

    public UserEntity registration(UserEntity userEntity){
        users.put(userEntity.getLogin(), userEntity);
        return userEntity;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = users.get(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User " + username + " is not found.");
        }
        return CustomUserDetails.fromUserEntityToCustomUserDetails(userEntity);
    }

    public UserEntity getUserByLoginAndPassword(String login, String password){
        UserEntity userEntity = users.get(login);

        if (userEntity == null || !userEntity.getPassword().equals(password)){
            throw new UsernameNotFoundException("User %s with that password not found");
        }

        return userEntity;
    }
}
