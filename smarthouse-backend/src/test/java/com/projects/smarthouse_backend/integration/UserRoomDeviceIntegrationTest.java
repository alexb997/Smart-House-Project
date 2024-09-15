package com.projects.smarthouse_backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.model.User;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import com.projects.smarthouse_backend.repository.RoomRepository;
import com.projects.smarthouse_backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRoomDeviceIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setPassword("password123");
        userRepository.save(testUser);

        Room room1 = new Room();
        room1.setName("Living Room");
        room1.setUser(testUser);
        roomRepository.save(room1);

        Room room2 = new Room();
        room2.setName("Kitchen");
        room2.setUser(testUser);
        roomRepository.save(room2);

        Device testDevice = new Device();
        testDevice.setName("Light");
        testDevice.setType(DeviceType.LIGHT);
        testDevice.setStatus(true);
        testDevice.setRoom(room1);
        deviceRepository.save(testDevice);
    }

    @AfterEach
    void tearDown() {
        deviceRepository.deleteAll();
        roomRepository.deleteAll();
        userRepository.deleteAll();
    }

    private String getUserBaseUrl() {
        return "http://localhost:" + port + "/api/users";
    }

    private String getRoomBaseUrl() {
        return "http://localhost:" + port + "/api/rooms";
    }

    private String getDeviceBaseUrl() {
        return "http://localhost:" + port + "/api/devices";
    }

    @Test
    void testCreateUserWithMultipleRoomsAndAssignDevice() throws Exception {
        User newUser = new User();
        newUser.setUsername("newUser");
        newUser.setPassword("newPassword");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> userRequest = new HttpEntity<>(objectMapper.writeValueAsString(newUser), headers);

        ResponseEntity<User> userResponse = restTemplate.exchange(
                getUserBaseUrl(),
                HttpMethod.POST,
                userRequest,
                User.class
        );
        assertThat(userResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        User createdUser = userResponse.getBody();
        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getUsername()).isEqualTo("newUser");

        Room newRoom1 = new Room();
        newRoom1.setName("Office");
        newRoom1.setUser(createdUser);

        HttpEntity<String> roomRequest1 = new HttpEntity<>(objectMapper.writeValueAsString(newRoom1), headers);

        ResponseEntity<Room> roomResponse1 = restTemplate.exchange(
                getRoomBaseUrl(),
                HttpMethod.POST,
                roomRequest1,
                Room.class
        );
        assertThat(roomResponse1.getStatusCode()).isEqualTo(HttpStatus.OK);
        Room createdRoom1 = roomResponse1.getBody();
        assertThat(createdRoom1).isNotNull();
        assertThat(createdRoom1.getName()).isEqualTo("Office");

        Room newRoom2 = new Room();
        newRoom2.setName("Bedroom");
        newRoom2.setUser(createdUser);

        HttpEntity<String> roomRequest2 = new HttpEntity<>(objectMapper.writeValueAsString(newRoom2), headers);

        ResponseEntity<Room> roomResponse2 = restTemplate.exchange(
                getRoomBaseUrl(),
                HttpMethod.POST,
                roomRequest2,
                Room.class
        );
        assertThat(roomResponse2.getStatusCode()).isEqualTo(HttpStatus.OK);
        Room createdRoom2 = roomResponse2.getBody();
        assertThat(createdRoom2).isNotNull();
        assertThat(createdRoom2.getName()).isEqualTo("Bedroom");

        Device newDevice = new Device();
        newDevice.setName("Thermostat");
        newDevice.setType(DeviceType.THERMOSTAT);
        newDevice.setStatus(false);
        newDevice.setRoom(createdRoom1);

        HttpEntity<String> deviceRequest = new HttpEntity<>(objectMapper.writeValueAsString(newDevice), headers);

        ResponseEntity<Device> deviceResponse = restTemplate.exchange(
                getDeviceBaseUrl(),
                HttpMethod.POST,
                deviceRequest,
                Device.class
        );
        assertThat(deviceResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Device createdDevice = deviceResponse.getBody();
        assertThat(createdDevice).isNotNull();
        assertThat(createdDevice.getName()).isEqualTo("Thermostat");

        ResponseEntity<Room> updatedRoomResponse = restTemplate.getForEntity(getRoomBaseUrl() + "/" + createdRoom1.getId(), Room.class);
        Room updatedRoom = updatedRoomResponse.getBody();
        assertThat(updatedRoom).isNotNull();
        assertThat(updatedRoom.getDevices()).hasSize(1);
        assertThat(updatedRoom.getDevices().get(0).getName()).isEqualTo("Thermostat");

        ResponseEntity<User> updatedUserResponse = restTemplate.getForEntity(getUserBaseUrl() + "/" + createdUser.getId(), User.class);
        User updatedUser = updatedUserResponse.getBody();
        assertThat(updatedUser).isNotNull();
        assertThat(updatedUser.getRooms()).hasSize(2);
        assertThat(updatedUser.getRooms().get(0).getName()).isEqualTo("Office");
        assertThat(updatedUser.getRooms().get(1).getName()).isEqualTo("Bedroom");
    }

    @Test
    void testGetUserWithRoomsAndDevices() {
        ResponseEntity<User> userResponse = restTemplate.getForEntity(getUserBaseUrl() + "/" + testUser.getId(), User.class);
        User fetchedUser = userResponse.getBody();
        assertThat(userResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(fetchedUser).isNotNull();
        assertThat(fetchedUser.getRooms()).hasSize(2);

        Room room1 = fetchedUser.getRooms().get(0);
        Room room2 = fetchedUser.getRooms().get(1);

        assertThat(room1.getDevices()).hasSize(1);
        assertThat(room1.getDevices().get(0).getName()).isEqualTo("Light");

        assertThat(room2.getDevices()).isEmpty();
    }
}
