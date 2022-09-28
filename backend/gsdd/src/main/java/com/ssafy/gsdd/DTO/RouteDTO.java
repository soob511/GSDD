package com.ssafy.gsdd.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RouteDTO {
    int userId;
    String name;
    String address;
}
