package com.ssafy.gsdd.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CCTV {
    @Id @GeneratedValue
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
