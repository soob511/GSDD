package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.*;
import com.ssafy.gsdd.entity.Lamp;
import com.ssafy.gsdd.repository.CCTVRepository;
import com.ssafy.gsdd.repository.HouseRepository;
import com.ssafy.gsdd.repository.LampRepository;
import com.ssafy.gsdd.util.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
                cctvRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= 1).map(l -> new CCTVDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                houseRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= 1).map(l -> new HouseDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList())
        );
    }

    public AroundDTO getListbyDis(double lat, double lon, double dis) {

        return new AroundDTO(
                lampRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= dis).map(l -> new LampDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                //cctvRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= dis).map(l -> new CCTVDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                new ArrayList<CCTVDTO>() ,
                houseRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= dis).map(l -> new HouseDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList())

        );
    }

    public AroundDTO getNearList(double lat1, double lon1, double lat2, double lon2, double dis) {

        double lat = (lat1 + lat2) / 2;
        double lon = (lon1 + lon2) / 2;

        double R = distance(lat, lon, lat1, lon1, "K");

        return new AroundDTO(
                lampRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= R).filter(l -> nearDistance(lat1, lon1, lat2, lon2, Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon())) <= dis).map(l -> new LampDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                //houseRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= R).filter(l -> nearDistance(lat1, lon1, lat2, lon2, Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon())) <= dis).map(l -> new CCTVDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList()),
                null,
                cctvRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= R).filter(l -> nearDistance(lat1, lon1, lat2, lon2, Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon())) <= dis).map(l -> new HouseDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList())
        );
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

    private static double nearDistance(double lat1, double lon1, double lat2, double lon2, double lat, double lon) {
        double maxlat = Math.max(lat1, lat2);
        double minlat = Math.min(lat1, lat2);
        double maxlon = Math.max(lon1, lon2);
        double minlon = Math.min(lon1, lon2);

        if (maxlat == minlat) {
            if (maxlon >= lon && lon >= minlon) {
                return distance(lat, lon, lon1, lon, "K");
            }
            return Math.min(
                    distance(lat, lon, lat1, lon1, "K"),
                    distance(lat, lon, lat1, lon2, "K")
            );
        } else if (lon1 == lon2) {
            if (maxlat >= lat && lat >= minlat) {
                return distance(lat, lon, lat, lon1, "K");
            }
            return Math.min(
                    distance(lat, lon, lat1, lon1, "K"),
                    distance(lat, lon, lat1, lon2, "K")
            );
        }
        double m = (lat1 - lat2) / (lon1 - lon2);
        double a = m;
        double b = -1;
        double c = (-m) * lon2 + lat2;


        double x2 = (b * (b * lon - a * lat) - a * c) / (a * a + b * b);
        double y2 = (a * (-b * lon + a * lat) - b * c) / (a * a + b * b);
        return distance(lat, lon, y2, x2, "K");
    }
}
