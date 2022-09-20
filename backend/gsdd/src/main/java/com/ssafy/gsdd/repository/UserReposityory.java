package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserReposityory extends JpaRepository<User,Integer> {

    public User findByUsername(String username);




}