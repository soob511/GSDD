package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.RoadDTO;
import com.ssafy.gsdd.repository.CCTVRepository;
import com.ssafy.gsdd.repository.HouseRepository;
import com.ssafy.gsdd.repository.LampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BoundService {

    @Autowired
    LampRepository lampRepository;
    @Autowired
    CCTVRepository cctvRepository;
    @Autowired
    HouseRepository houseRepository;

    public List<RoadDTO> getPosition(double olat, double olon, double dlat, double dlon) {

        //1. 출발지 목적지 사이의 원 내엥 있는 가로등, cctv 좌표를 뽑는다.
        List<RoadDTO> boundaryList = getBoundary(olat, olon, dlat, dlon);

        //2. 뽑은 좌표들로 출발지 목적지 사이 최단경로 인 좌표 목록을 뽑는다
//        List<RoadDTO> list = dijkstra(boundaryList);

        return boundaryList;
    }

    private List<RoadDTO> getBoundary(double olat, double olon, double dlat, double dlon) {

        double lat = (olat + dlat) / 2;
        double lon = (olon + dlon) / 2;

        double R = distance(lat, lon, olat, olon, "K");

        //경계 내 좌표값 목록 찾기
        List<RoadDTO> lampList = lampRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= R)
                .map(l -> new RoadDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList());

        List<RoadDTO> cctvList = lampRepository.findAll().stream().filter(l -> distance(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()), lat, lon, "K") <= R)
                .map(l -> new RoadDTO(Double.parseDouble(l.getLat()), Double.parseDouble(l.getLon()))).collect(Collectors.toList());


        //두 리스트 병합하여 리턴하기~

        List<RoadDTO> mergeList = new ArrayList<>();
        mergeList.add(new RoadDTO(olat, olon));
        mergeList.addAll(lampList);
        mergeList.addAll(cctvList);
        mergeList.add(new RoadDTO(dlat, dlon));

        return mergeList;

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
