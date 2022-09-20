package com.ssafy.gsdd.config.oauth;

import com.ssafy.gsdd.entity.User;
import com.ssafy.gsdd.repository.UserReposityory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UserReposityory userReposityory;

    @Override
    public PrincipalDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userReposityory.findByUsername(username);
        if(userEntity != null) {
//            return new PrincipalDetails(userEntity);
    }
        return null;
    }
}
