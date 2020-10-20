package com.example.demo.dao;

import com.example.demo.model.Person;

import java.util.List;
import java.util.Optional;

public interface PersonDao {

    int insertPerson(String id, Person person);

    default int insertPerson(Person person,List<Person> DB){
        String id = person.getName();

        //Check to see if the person already exists
        boolean personExists = false;
        for(Person per : DB){
            String perName = per.getName();
            if(perName.equals(person.getName())){
                personExists = true;
            }
        }

        //If person does not exist then add them
        if(!personExists) {
            return insertPerson(id,person);
        }
            return 0;
    }

    int deletePersonById(String id);

    int updatePersonById(String id, Person person);

    Optional<Person> selectPersonById(String id);

    List<Person> selectAllPeople();
}
