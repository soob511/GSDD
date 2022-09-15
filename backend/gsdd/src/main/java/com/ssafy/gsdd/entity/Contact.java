package com.ssafy.gsdd.entity;

import javax.persistence.*;

@Entity
public class Contact {

    @Id
    @GeneratedValue
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    User user;
    String contact;
}
