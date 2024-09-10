package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.User;
import com.projects.smarthouse_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<User> getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public ResponseEntity<User> updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        return ResponseEntity.ok(userRepository.save(user));
    }

    public ResponseEntity<Void> deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
