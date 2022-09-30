package com.ssafy.gsdd.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "route")
public class Route {
    @Id
    @GeneratedValue
    @Column(name = "routeId")
    private int routeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;

    public Route(String name, String address, User user) {
        this.name = name;
        this.address = address;
        this.addRoute(user);
    }

    public void addRoute(User user) {
        this.user = user;
        user.getRoutes().add(this);
    }
}
