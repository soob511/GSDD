package com.ssafy.gsdd.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="area")
public class Area {
    @Id
    @GeneratedValue
    @Column(name = "areaId")
    int id;

    @Column(name = "si")
    String si;
    @Column(name = "gu")
    String gu;

    @OneToMany(mappedBy = "area" ,fetch = FetchType.LAZY)
    List<Info> infos;

    @OneToOne(mappedBy = "area")
    Safe safe;
}
