package com.ssafy.gsdd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Table;

@Getter
@RequiredArgsConstructor
@Table(name="role")
public enum Role {

    USER("ROLE_USER");

    private final String key;
}