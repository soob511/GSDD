package com.ssafy.gsdd.entity;


import com.ssafy.gsdd.BaseTimeEntity;
import lombok.*;

import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String email;

    @Column(nullable = false)
    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;  // Role: 직접 만드는 클래스

    @Builder
    public User(String name, String email, String provider, Role role) {
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.role = role;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
