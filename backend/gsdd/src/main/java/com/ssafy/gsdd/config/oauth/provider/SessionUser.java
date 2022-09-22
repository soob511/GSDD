package com.ssafy.gsdd.config.oauth.provider;

import com.ssafy.gsdd.entity.User;
import lombok.Getter;

import java.io.Serializable;


@Getter
public class SessionUser implements Serializable {
    private String name, email, picture;
    public SessionUser(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}