package com.ssafy.gsdd.config;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String userEmail){
        super(userEmail + " NotFoundException");
    }

    public UserNotFoundException(){
        super("UserNotFoundException");
    }

}
