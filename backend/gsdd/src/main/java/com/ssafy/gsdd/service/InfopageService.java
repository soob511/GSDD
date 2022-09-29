package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.InfoDTO;
import com.ssafy.gsdd.DTO.InfopageDTO;
import com.ssafy.gsdd.entity.Area;
import com.ssafy.gsdd.repository.AreaRepository;
import com.ssafy.gsdd.repository.SafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class InfopageService {
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    SafeRepository safeRepository;
    public InfopageDTO getInfo(String si, String gu) {

        Optional<Area> findArea = areaRepository.findBySiAndGu(si, gu);

        if (findArea.isEmpty()) {
            return null;
        } else {
            Area area = findArea.get();
            return new InfopageDTO(area.getSafe().getNum(),area.getInfos().stream().map(i -> new InfoDTO(i.getType(),i.getCount())).collect(Collectors.toList()));
        }

    }

}
