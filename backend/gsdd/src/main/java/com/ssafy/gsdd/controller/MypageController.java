package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.DTO.ContactDTO;
import com.ssafy.gsdd.DTO.ContactResDTO;
import com.ssafy.gsdd.DTO.RouteDTO;
import com.ssafy.gsdd.DTO.RouteResDTO;
import com.ssafy.gsdd.entity.Contact;
import com.ssafy.gsdd.entity.Route;
import com.ssafy.gsdd.entity.User;
import com.ssafy.gsdd.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/mypage")
@CrossOrigin(origins = "*")
public class MypageController {

    @Autowired
    MypageService mypageService;

    // 유저 정보 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity<HashMap<String,Object>> userInfo(@PathVariable int userId) {
        HashMap<String, Object> result = new HashMap<>();
        User user = mypageService.getUser(userId);
        result.put("user",user.getName());
        result.put("contacts", user.getContacts().stream().map(c -> new ContactResDTO(c.getContactId(),c.getName(),c.getContact())));
        result.put("routes", user.getRoutes().stream().map(r -> new RouteResDTO(r.getRouteId(),r.getName(),r.getAddress())));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 비상연락망 추가
    @PostMapping("/contact")
    public ResponseEntity<HashMap> createContact(@RequestBody ContactDTO dto){
        HashMap<String, Object> result = new HashMap<>();
        List<Contact> list = mypageService.contactSave(dto.getUserId(), dto.getName(), dto.getNumber());
        if(list == null){
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.NOT_ACCEPTABLE);
        }
        result.put("contacts", list.stream().map(c -> new ContactResDTO(c.getContactId(),c.getName(),c.getContact())));
        return new ResponseEntity<>(result , HttpStatus.OK);
    }
    // 비상연락망 삭제
    @DeleteMapping("/contact/{contactId}")
    public ResponseEntity<HashMap> deleteContact(@PathVariable int contactId){
        HashMap<String, Object> result = new HashMap<>();
        mypageService.contactRemove(contactId);
        result.put("message", "success");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 즐겨찾는 목적지 추가
    @PostMapping("/route")
    public ResponseEntity<HashMap> createRoute(@RequestBody RouteDTO dto){
        HashMap<String, Object> result = new HashMap<>();
        List<Route> list = mypageService.routeSave(dto.getUserId(), dto.getName(), dto.getAddress());
        if(list == null){
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.NOT_ACCEPTABLE);
        }
        result.put("contacts", list.stream().map(r -> new RouteResDTO(r.getRouteId(),r.getName(),r.getAddress())));
        return new ResponseEntity<>(result , HttpStatus.OK);
    }
    // 즐겨찾는 목적지 삭제
    @DeleteMapping("/route/{routeId}")
    public ResponseEntity<HashMap> deleteRoute(@PathVariable int routeId){
        HashMap<String, Object> result = new HashMap<>();
        mypageService.routeRemove(routeId);
        result.put("message", "success");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
