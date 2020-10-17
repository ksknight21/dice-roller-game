package com.example.demo.api;

import com.example.demo.model.Person;
import com.example.demo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/v1/person")
@RestController
public class PersonController {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    private final PersonService personService;

    @PostMapping
    public void addPerson(@RequestBody Person person){
        personService.addPerson(person);
        System.out.println(person.getName() + " Added!");
    }

    @GetMapping
    public List<Person> getAllPeople(){
        System.out.println(request.getServletContext());
        return personService.getAllPeople();
    }

    @GetMapping(path = "{id}")
    public Person getPersonById(@PathVariable("id") UUID id){
        return personService.getPersonById(id)
                .orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public void deletePersonById(@PathVariable("id") UUID id){
        personService.deletePerson(id);
    }

    @PutMapping(path = "{id}")
    public void updatePerson(@PathVariable("id") UUID id, @RequestBody Person personToUpdate){
        personService.updatePerson(id, personToUpdate);
    }


}
