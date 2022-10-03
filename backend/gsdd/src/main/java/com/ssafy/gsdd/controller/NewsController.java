package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    NewsService newsService;
    @GetMapping("/{si}/{gu}")
    public ResponseEntity<HashMap> getNews(@PathVariable String si, @PathVariable String gu) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("news", newsService.getList(si,gu));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
