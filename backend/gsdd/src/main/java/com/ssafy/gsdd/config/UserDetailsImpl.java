package com.ssafy.gsdd.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@AllArgsConstructor
@Getter
@ToString
//회원 데이터를 조회하고 해당 정보와 권한을 저장하는 UserDetails를 구현
public class UserDetailsImpl implements OAuth2User {
    private final Long id; //사용자 고유번호
    private final String email; //사용자 이메일
    private final String name; //사용자 닉네임
    private final String provider; //제공자
    private final Collection<? extends GrantedAuthority> authorities;

    public Long getId() {
        return id;
    }

    public String getEmail() {return email;}

    public String getName() {
        return name;
    }

    public String getProvider() {
        return provider;
    }

    /*OAuth2*/
    @Override
    public Map<String, Object> getAttributes() {
        return getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

}