package com.ssafy.gsdd.entity;


import com.ssafy.gsdd.BaseTimeEntity;
import lombok.*;

import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
@Table(name="user")
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private int userId;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String pw;

    @Column(nullable = true)
    private String email;

    @Column(nullable = false)
    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;  // Role: 직접 만드는 클래스

    @Builder
    public User(String name, String pw, String email, String provider, Role role) {
        this.name = name;
        this.pw = pw;
        this.email = email;
        this.provider = provider;
        this.role = role;
    }


    public String getRoleKey() {
        return this.role.getKey();
    }
    @OneToMany(mappedBy = "user")
    private List<Contact> contacts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Route> routes = new ArrayList<>();

}
