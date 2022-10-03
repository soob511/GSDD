package com.ssafy.gsdd.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteResDTO {
    int id;
    String name;
    String address;
    String lat;
    String lon;
}