package com.ssafy.gsdd.config.oauth;

import com.ssafy.gsdd.config.oauth.provider.FacebookUserInfo;
import com.ssafy.gsdd.config.oauth.provider.GoogleUserInfo;
import com.ssafy.gsdd.config.oauth.provider.NaverUserInfo;
import com.ssafy.gsdd.config.oauth.provider.OAuth2Userinfo;
import com.ssafy.gsdd.entity.User;
import com.ssafy.gsdd.repository.UserReposityory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserReposityory userReposityory;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration:" + userRequest.getClientRegistration());
        System.out.println("getAccessToken:" + userRequest.getAccessToken().getTokenValue());
        System.out.println("getAttributes:" + super.loadUser(userRequest).getAttributes());


        //구글로그인창 , 로그인 완료, 토근요청
        //userRequest 정보 , loadUser 함수 호출 , 구글로부터 회원프로필 받음
        OAuth2User oauth2User = super.loadUser(userRequest);
        System.out.println("getAttributes :" + oauth2User.getAttributes());

        OAuth2Userinfo oAuth2Userinfo = null;

        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글로그인요청");
            oAuth2Userinfo = new GoogleUserInfo(oauth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("facebook")) {
            System.out.println("페이스북로그인요청");
            oAuth2Userinfo = new FacebookUserInfo(oauth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("네이버로그인요청");
            oAuth2Userinfo = new NaverUserInfo((Map)oauth2User.getAttributes().get("response"));
        } else {
            System.out.println("지원안함");
        }

        String provider = oAuth2Userinfo.getProvider();
        String providerId = oAuth2Userinfo.getProviderId();
        String username = provider + "_" + providerId;
        String password = bCryptPasswordEncoder.encode("겟");
        String email = oAuth2Userinfo.getEmail();
        String role = "ROLE_USER";

        User userEntity = userReposityory.findByUsername(username);

        if (userEntity == null) {
            userEntity = User.builder()
                    .username(username)
                    .password(password)
                    .email(email)
                    .role(role)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            userReposityory.save(userEntity);
        }else{
            System.out.println("로그인 한적 있음");
        }

        //회원가입 강제로 진행
        return new

                PrincipalDetails(userEntity, oauth2User.getAttributes());
    }

}
