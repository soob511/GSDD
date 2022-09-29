package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.DTO.InfopageDTO;
import com.ssafy.gsdd.service.InfopageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/info")
public class InfopageController {

    @Autowired
    InfopageService infopageService;

    @GetMapping("/{si}/{gu}")
    public ResponseEntity<HashMap<String, Object>> getInfo(@PathVariable String si, @PathVariable String gu) {
        HashMap<String, Object> result = new HashMap<>();
        InfopageDTO info = infopageService.getInfo(si, gu);
        if (info == null) {
            result.put("message", "해당 지역의 정보를 불러 올 수 없습니다.");
        } else {
            result.put("지역정보", info);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
