package com.ssafy.gsdd.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id @GeneratedValue
    int id;
    @Column(name = "name", nullable = false)
    String name;
    @Column(name = "provider", nullable = false)
    String provider;

    @OneToMany(mappedBy = "userId")
    List<Contact> contacts = new ArrayList<>();

    @OneToMany(mappedBy = "userId")
    List<Route> routes = new ArrayList<>();
}
