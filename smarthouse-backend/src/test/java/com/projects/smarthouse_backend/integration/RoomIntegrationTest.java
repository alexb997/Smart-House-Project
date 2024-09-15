package com.projects.smarthouse_backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RoomIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        roomRepository.deleteAll();
    }

    @Test
    void testGetAllRooms() {
        Room room = new Room();
        room.setName("Living Room");
        roomRepository.save(room);

        webTestClient.get().uri("/api/rooms")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].name").isEqualTo("Living Room");
    }

    @Test
    void testGetRoomById() {
        Room savedRoom = new Room();
        savedRoom.setName("Bedroom");
        roomRepository.save(savedRoom);

        webTestClient.get().uri("/api/rooms/{roomId}", savedRoom.getId())
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("Bedroom");
    }

    @Test
    void testCreateRoom() throws Exception {
        Room newRoom = new Room();
        newRoom.setName("Kitchen");

        webTestClient.post().uri("/api/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(objectMapper.writeValueAsString(newRoom))
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("Kitchen");

        Optional<Room> createdRoom = roomRepository.findByName("Kitchen");
        assertThat(createdRoom).isPresent();
        assertThat(createdRoom.get().getName()).isEqualTo("Kitchen");
    }

    @Test
    void testUpdateRoom() throws Exception {
        Room savedRoom = new Room();
        savedRoom.setName("Office");
        savedRoom = roomRepository.save(savedRoom);
        savedRoom.setName("Updated Office");

        webTestClient.put().uri("/api/rooms/{roomId}", savedRoom.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(objectMapper.writeValueAsString(savedRoom))
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("Updated Office");

        Optional<Room> updatedRoom = roomRepository.findById(savedRoom.getId());
        assertThat(updatedRoom).isPresent();
        assertThat(updatedRoom.get().getName()).isEqualTo("Updated Office");
    }

    @Test
    void testDeleteRoom() {
        Room savedRoom = new Room();
        savedRoom.setName("Dining Room");
        savedRoom = roomRepository.save(savedRoom);

        webTestClient.delete().uri("/api/rooms/{roomId}", savedRoom.getId())
                .exchange()
                .expectStatus().isNoContent();

        Optional<Room> deletedRoom = roomRepository.findById(savedRoom.getId());
        assertThat(deletedRoom).isEmpty();
    }

    @Test
    void testGetRoomDevices() {
        Room savedRoom = new Room();
        savedRoom.setName("Living Room");
        savedRoom = roomRepository.save(savedRoom);

        webTestClient.get().uri("/api/rooms/{roomId}/devices", savedRoom.getId())
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$").isArray();
    }
}
