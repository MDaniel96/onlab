package com.todo.todo.web;

import com.todo.todo.models.User;
import com.todo.todo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public @ResponseBody Integer addNewUser(@RequestBody User user) {
        if (userRepository.findByName(user.getName()) == null) {
            userRepository.save(user);
            return user.getId();
        } else
            return userRepository.findByName(user.getName()).getId();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
