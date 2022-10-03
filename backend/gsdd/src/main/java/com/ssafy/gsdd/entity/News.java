package com.ssafy.gsdd.entity;

import lombok.Getter;
import lombok.Setter;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "news")
@Getter
@Setter
public class News {
    @Id
    @GeneratedValue
    int newsId;

    String title;

    String url;

    String keyword;

    String area;
}
