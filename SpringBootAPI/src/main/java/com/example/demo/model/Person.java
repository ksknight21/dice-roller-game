package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Person {

    private final UUID id;
    private final String name;
    private final int bank;
    private final int throwScore;
    private final int maxDice;
    private final int turnScore;

    public Person(@JsonProperty("id") UUID id,
                  @JsonProperty("name") String name,
                  @JsonProperty("bank") int bank,
                  @JsonProperty("throwScore") int throwScore,
                  @JsonProperty("maxDice") int maxDice,
                  @JsonProperty("turnScore") int turnScore) {
        this.id = id;
        this.name = name;
        this.bank = bank;
        this.throwScore = throwScore;
        this.maxDice = maxDice;
        this.turnScore = turnScore;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public int getBank() {
        return bank;
    }

    public int getThrowScore() {
        return throwScore;
    }

    public int getMaxDice() {
        return maxDice;
    }

    public int getTurnScore() {
        return turnScore;
    }


}
