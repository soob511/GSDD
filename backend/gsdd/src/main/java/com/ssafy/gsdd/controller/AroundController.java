package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.DTO.AroundDTO;
import com.ssafy.gsdd.repository.LampRepository;
import com.ssafy.gsdd.service.AroundService;
import org.aspectj.lang.annotation.Around;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/around")
public class AroundController {

    @Autowired
    AroundService aroundService;

    @GetMapping("/{lat}/{lon}")
    public ResponseEntity<HashMap> getList(@PathVariable String lat, @PathVariable String lon) {
        HashMap<String, Object> result = new HashMap<>();
        AroundDTO list = aroundService.getList(Double.parseDouble(lat), Double.parseDouble(lon));
        result.put("lights", list.getLamps());
        result.put("cameras", list.getCctvs());
        result.put("houses", list.getHouses());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{lat}/{lon}/{dis}")
    public ResponseEntity<HashMap> getList(@PathVariable String lat, @PathVariable String lon, @PathVariable String dis) {
        HashMap<String, Object> result = new HashMap<>();
        AroundDTO list = aroundService.getListbyDis(Double.parseDouble(lat), Double.parseDouble(lon), Double.parseDouble(dis));
        result.put("lights", list.getLamps());
        result.put("cameras", list.getCctvs());
        result.put("houses", list.getHouses());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/near/{slat}/{slon}/{elat}/{elon}/{dis}")
    public ResponseEntity<HashMap> getNearList(@PathVariable String slat, @PathVariable String slon, @PathVariable String elat, @PathVariable String elon, @PathVariable String dis) {
        HashMap<String, Object> result = new HashMap<>();
        AroundDTO list = aroundService.getNearList(Double.parseDouble(slat), Double.parseDouble(slon), Double.parseDouble(elat), Double.parseDouble(elon), Double.parseDouble(dis));
        result.put("lights", list.getLamps());
        result.put("cameras", list.getCctvs());
        result.put("houses", list.getHouses());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
