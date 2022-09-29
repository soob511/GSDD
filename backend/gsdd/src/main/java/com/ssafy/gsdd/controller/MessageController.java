package com.ssafy.gsdd.controller;

import com.ssafy.gsdd.DTO.ContactDTO;
import com.ssafy.gsdd.DTO.ContactResDTO;
import com.ssafy.gsdd.DTO.MessageDTO;
import com.ssafy.gsdd.entity.Contact;
import com.ssafy.gsdd.service.MessageService;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    @PostMapping()
    public ResponseEntity<HashMap<String, Boolean>> createContact(@RequestBody MessageDTO dto){
        System.out.println(dto.toString());
        boolean result = messageService.sendMessage(dto.getName(), dto.getContact(), dto.getLocation());
        HashMap<String, Boolean> jsonMap = new HashMap<>();
        if(result) {
            jsonMap.put("isSuccess", true);
        }else jsonMap.put("isSuccess", false);

        return ResponseEntity.ok(jsonMap);
    }
}
