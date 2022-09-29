package com.ssafy.gsdd.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="cctv")
public class CCTV {
    @Id @GeneratedValue
    @Column(name = "cctvId")
    int id;

    @Column(name = "lat")
    String lat;

    @Column(name ="lon")
    String lon;

    @Column(name = "si")
    String si;

    @Column(name = "gu")
    String gu;
}
