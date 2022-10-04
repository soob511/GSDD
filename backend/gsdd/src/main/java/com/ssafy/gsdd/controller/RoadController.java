//package com.ssafy.gsdd.controller;
//
//import com.ssafy.gsdd.DTO.RoadDTO;
//import com.ssafy.gsdd.service.RoadService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.List;
//
//@RestController
//@RequestMapping("/road")
//public class RoadController {
//
//    @Autowired
//    RoadService roadService;
//
//    @GetMapping("/{olat}/{olon}/{dlat}/{dlon}")
//    public ResponseEntity<HashMap> getList(@PathVariable double olat, @PathVariable double olon, @PathVariable double dlat, @PathVariable double dlon){
//        HashMap<String , Object> result = new HashMap<>();
//        List<RoadDTO> list = roadService.getPosition(olat, olon, dlat, dlon);
//        result.put("road", list.stream().map(r -> new RoadDTO(r.getLat(),r.getLon())));
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//}
