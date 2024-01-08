package com.fantasybballsmall.fantasybballsmallapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

//Format error message and send it back as a JSON response with a 404 status code

@ControllerAdvice
public class PlayerNotFoundAdvice {

    @ResponseBody //return custom response
    @ExceptionHandler(PlayerNotFound.class) //for PlayerNotFound exception
    @ResponseStatus(HttpStatus.NOT_FOUND) //set HTTP response status code
    String handleExceptions(PlayerNotFound exception){
        String errors = exception.getMessage();
        return errors;
    }
}
