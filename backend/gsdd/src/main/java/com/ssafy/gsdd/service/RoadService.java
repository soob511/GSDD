package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.*;
import com.ssafy.gsdd.repository.CCTVRepository;
import com.ssafy.gsdd.repository.HouseRepository;
import com.ssafy.gsdd.repository.LampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RoadService {

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
        List<RoadDTO> list = dijkstra(boundaryList);

        return list;
    }

    private static List<RoadDTO> getBoundary(double olat, double olon, double dlat, double dlon) {
        List<RoadDTO> boundaryList = new ArrayList<RoadDTO>();


        //경계 내 좌표값 목록 찾기

        return boundaryList;
    }

    private static List<RoadDTO> dijkstra(List<RoadDTO> boundaryList) {

        //각 노드별로 가중치 새기기
        //다익스트라로 최단 경로인 좌표들 탐색

        return boundaryList;
    }
}
