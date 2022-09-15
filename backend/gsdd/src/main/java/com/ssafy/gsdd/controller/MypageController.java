package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.entity.Contact;
import com.ssafy.gsdd.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    @Autowired
    MypageService mypageService;

    @GetMapping("/contact/{userId}")
    public ResponseEntity<HashMap> contactList(@PathVariable int userId) {
        HashMap<String, Object> result = new HashMap<>();
        List<Contact> list =
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
