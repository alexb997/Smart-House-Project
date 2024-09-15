package com.projects.smarthouse_backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.User;
import com.projects.smarthouse_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.jdbc.Sql;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testGetAllUsers() {
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password123");
        userRepository.save(user);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.GET,
                null,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("testUser");
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password123");
        user = userRepository.save(user);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/" + user.getId(),
                HttpMethod.GET,
                null,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("testUser");
    }

    @Test
    void testCreateUser() throws Exception {
        User newUser = new User();
        newUser.setUsername("newUser");
        newUser.setPassword("newPassword");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(objectMapper.writeValueAsString(newUser), headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.POST,
                request,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("newUser");

        Optional<User> createdUser = userRepository.findByUsername("newUser");
        assertThat(createdUser).isPresent();
        assertThat(createdUser.get().getUsername()).isEqualTo("newUser");
    }

    @Test
    void testUpdateUser() throws Exception {
        User user = new User();
        user.setUsername("existingUser");
        user.setPassword("oldPassword");
        user = userRepository.save(user);

        user.setPassword("newPassword");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(objectMapper.writeValueAsString(user), headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/" + user.getId(),
                HttpMethod.PUT,
                request,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("newPassword");

        Optional<User> updatedUser = userRepository.findById(user.getId());
        assertThat(updatedUser).isPresent();
        assertThat(updatedUser.get().getPassword()).isEqualTo("newPassword");
    }

    @Test
    void testDeleteUser() {
        User user = new User();
        user.setUsername("deleteUser");
        user.setPassword("password");
        user = userRepository.save(user);

        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/" + user.getId(),
                HttpMethod.DELETE,
                null,
                Void.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        Optional<User> deletedUser = userRepository.findById(user.getId());
        assertThat(deletedUser).isEmpty();
    }

    @Test
    void testLogin() throws Exception {
        User user = new User();
        user.setUsername("loginUser");
        user.setPassword("loginPassword");
        userRepository.save(user);

        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "loginUser");
        loginData.put("password", "loginPassword");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(loginData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/login",
                HttpMethod.POST,
                request,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Login successful");
        assertThat(response.getBody()).contains("loginUser");
    }
}
