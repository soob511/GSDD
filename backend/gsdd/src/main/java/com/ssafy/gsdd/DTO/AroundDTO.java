package com.ssafy.gsdd.DTO;

import com.ssafy.gsdd.entity.House;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AroundDTO {
    List<LampDTO> lamps ;
    List<CCTVDTO> cctvs;
    List<HouseDTO> houses;
}
