package com.ssafy.gsdd.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Safe {
    @Id
    @GeneratedValue
    @Column(name = "safe_id")
    int id;

    @OneToOne
    @JoinColumn(name = "area_id")
    Area area;

    int num;
}
