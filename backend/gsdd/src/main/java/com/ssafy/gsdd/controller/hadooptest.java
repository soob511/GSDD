package com.ssafy.gsdd.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/hadoop")
public class hadooptest {
    @GetMapping("")
    public ResponseEntity<String> hadooptest(){
        System.out.println(" asdfjiaosdjfiaso");
        String cmd = "sh test.sh";
        String result = execCmd(cmd);

        return new ResponseEntity<>(result, HttpStatus.OK
        );
    }
    public String execCmd(String cmd) {
        try {
            Process process = Runtime.getRuntime().exec("cmd /c " + cmd);
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line = null;
            StringBuffer sb = new StringBuffer();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
