package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.AroundDTO;
import com.ssafy.gsdd.DTO.CCTVDTO;
import com.ssafy.gsdd.DTO.HouseDTO;
import com.ssafy.gsdd.DTO.LampDTO;
import com.ssafy.gsdd.entity.Lamp;
import com.ssafy.gsdd.repository.CCTVRepository;
import com.ssafy.gsdd.repository.HouseRepository;
import com.ssafy.gsdd.repository.LampRepository;
import com.ssafy.gsdd.util.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AroundService {
    @Autowired
    LampRepository lampRepository;

    @Autowired
    CCTVRepository cctvRepository;
    @Autowired
    HouseRepository houseRepository;

    DistanceCalculator cal = new DistanceCalculator();

    public AroundDTO getList(double lat, double lon) {

        return new AroundDTO(
                lampRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= 1).map(l -> new LampDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                houseRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= 1).map(l -> new CCTVDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                cctvRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= 1).map(l -> new HouseDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList())
        );
    }

    public void test() {
        List<Lamp> all = lampRepository.findAll();
        for (Lamp l : all) {
            if (l.getLat().isEmpty() || l.getLon().isEmpty()) {
                System.out.println("l.toString() = " + l.toString());
            }
        }
    }

    private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515;
            if (unit.equals("K")) {
                dist = dist * 1.609344;
            } else if (unit.equals("N")) {
                dist = dist * 0.8684;
            }
            return (dist);
        }
    }
}
