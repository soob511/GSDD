package com.ssafy.gsdd.entity;

import javax.persistence.*;

@Entity
public class Route {
    @Id
    @GeneratedValue
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    User user;

    @Column(nullable = false)
    String destination;

}
