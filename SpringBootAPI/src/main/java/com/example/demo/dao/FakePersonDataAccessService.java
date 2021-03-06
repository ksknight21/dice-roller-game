package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("fakeDao")
public class FakePersonDataAccessService implements PersonDao {

    private static List<Person> DB = new ArrayList<>();

    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    public FakePersonDataAccessService() {
    }

    @Override
    public int insertPerson(String id, Person person) {
        DB.add(new Person(id, person.getName(), person.getBank(), person.getThrowScore(), person.getMaxDice(), person.getTurnScore()));
        return 1;
    }

    @Override
    public int deletePersonById(String id) {
        Optional<Person> personMaybe = selectPersonById(id);
        if(personMaybe.isEmpty()){
            return 0;
        }
        DB.remove(personMaybe.get());
        return 1;
    }

    @Override
    public int updatePersonById(String id, Person update) {
        return selectPersonById(id)
                .map(person -> {
                    int indexOfPersonToUpdate = DB.indexOf(person);
                    if(indexOfPersonToUpdate >= 0){
                        DB.set(indexOfPersonToUpdate,new Person(id, update.getName(), update.getBank(), update.getThrowScore(), update.getMaxDice(),update.getTurnScore()));
                        return 1;
                    }
                    return 0;
                })
                .orElse(0);
    }

    @Override
    public Optional<Person> selectPersonById(String id) {
        return DB.stream()
                .filter(person -> person.getId().equals(id))
                .findFirst();
    }
}
