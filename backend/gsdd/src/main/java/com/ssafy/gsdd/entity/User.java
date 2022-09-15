package com.ssafy.gsdd.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString(exclude = "contacts")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    @Column(name = "user_Id")
    private int userId;
    @Column(name = "name", nullable = false)
    private  String name;
    @Column(name = "provider", nullable = false)
    private String provider;

    @OneToMany(mappedBy = "user")
    private  List<Contact> contacts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Route> routes = new ArrayList<>();
}
