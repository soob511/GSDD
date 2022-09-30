package com.ssafy.gsdd.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "safe")
public class Safe {
    @Id
    @GeneratedValue
    @Column(name = "safeId")
    int id;

    @OneToOne
    @JoinColumn(name = "areaId")
    Area area;

    int num;
}
