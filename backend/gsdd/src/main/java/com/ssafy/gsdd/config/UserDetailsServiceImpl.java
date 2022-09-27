package com.ssafy.gsdd.config;

import com.ssafy.gsdd.entity.User;
import com.ssafy.gsdd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Slf4j
// 인증 과정 중 실제 Database에 회원을 데이터를 조회하는UserDetailsService를 구현
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        System.out.println("loadUserByUsername: "+username);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("Not Found User"));
        return (UserDetails) new UserDetailsImpl(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getProvider(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getKey()))
        );
    }

}