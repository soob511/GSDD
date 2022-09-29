package com.ssafy.gsdd.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Info {
    @Id
    @GeneratedValue
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_Id")
    Area area;

    @Column(name = "type")
    String type;
    @Column(name = "count")
    int count;
}
