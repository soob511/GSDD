package com.ssafy.gsdd.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "info")
public class Info {
    @Id
    @GeneratedValue
    @Column(name = "infoId")
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "areaId")
    Area area;

    @Column(name = "type")
    String type;
    @Column(name = "count")
    int count;
}
