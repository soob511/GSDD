package com.ssafy.gsdd.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactResDTO {
    int id;
    String name;
    String contact;
}
