package com.ssafy.gsdd.DTO;

import com.ssafy.gsdd.entity.Info;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InfoDTO {
    String type ;
    int cnt;
}
