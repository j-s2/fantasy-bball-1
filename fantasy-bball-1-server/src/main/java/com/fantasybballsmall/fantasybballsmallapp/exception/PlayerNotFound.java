package com.fantasybballsmall.fantasybballsmallapp.exception;

public class PlayerNotFound extends RuntimeException{
    public PlayerNotFound(Long id){
        super("Player with id " + id + " could not be found.");
    }
}
