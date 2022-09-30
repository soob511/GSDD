package com.ssafy.gsdd.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "lamp")
public class Lamp {
    @Id @GeneratedValue
    @Column(name = "lampId")
    int id;
    @Column(name = "lat")
    String lat;
    @Column(name = "lon")
    String lon;
    @Column(name = "si")
    String si;
    @Column(name = "gu")
    String gu;
}
