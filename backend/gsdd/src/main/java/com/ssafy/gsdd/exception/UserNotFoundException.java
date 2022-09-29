package com.ssafy.gsdd.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String userEmail){
        super(userEmail + " NotFoundException");
    }

    public UserNotFoundException(){
        super("UserNotFoundException");
    }

}
