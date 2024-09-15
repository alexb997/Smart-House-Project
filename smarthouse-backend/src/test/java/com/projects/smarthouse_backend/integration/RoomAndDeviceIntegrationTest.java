package com.projects.smarthouse_backend.integration;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import com.projects.smarthouse_backend.repository.RoomRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RoomAndDeviceIntegrationTest {

    private int port = 8080;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    private RestTemplate restTemplate = new RestTemplate();

    private Room testRoom;

    @BeforeEach
    void setUp() {
        testRoom = new Room();
        testRoom.setName("Living Room");
        roomRepository.save(testRoom);

        Device testDevice = new Device();
        testDevice.setName("Light");
        testDevice.setType(DeviceType.LIGHT);
        testDevice.setStatus(true);
        testDevice.setRoom(testRoom);

        deviceRepository.save(testDevice);
    }

    @AfterEach
    void tearDown() {
        deviceRepository.deleteAll();
        roomRepository.deleteAll();
    }

    private String getRoomBaseUrl() {
        return "http://localhost:" + port + "/api/rooms";
    }

    private String getDeviceBaseUrl() {
        return "http://localhost:" + port + "/api/devices";
    }

    @Test
    void testCreateRoomAndAssignDevice() {
        Room newRoom = new Room();
        newRoom.setName("Kitchen");

        ResponseEntity<Room> roomResponse = restTemplate.postForEntity(getRoomBaseUrl(), newRoom, Room.class);
        assertThat(roomResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Room createdRoom = roomResponse.getBody();
        assertThat(createdRoom).isNotNull();
        assertThat(createdRoom.getName()).isEqualTo("Kitchen");

        Device newDevice = new Device();
        newDevice.setName("Thermostat");
        newDevice.setType(DeviceType.THERMOSTAT);
        newDevice.setStatus(false);

        ResponseEntity<Device> deviceResponse = restTemplate.postForEntity(getDeviceBaseUrl(), newDevice, Device.class);
        assertThat(deviceResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Device createdDevice = deviceResponse.getBody();
        assertThat(createdDevice).isNotNull();
        assertThat(createdDevice.getName()).isEqualTo("Thermostat");

        ResponseEntity<Device> assignDeviceResponse = restTemplate.exchange(
                getDeviceBaseUrl() + "/" + createdDevice.getId() + "/assign-room/" + createdRoom.getId(),
                HttpMethod.POST,
                null,
                Device.class
        );
        assertThat(assignDeviceResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Device updatedDevice = assignDeviceResponse.getBody();
        assertThat(updatedDevice).isNotNull();
        assertThat(updatedDevice.getRoom().getId()).isEqualTo(createdRoom.getId());

        ResponseEntity<Room> updatedRoomResponse = restTemplate.getForEntity(getRoomBaseUrl() + "/" + createdRoom.getId(), Room.class);
        Room updatedRoom = updatedRoomResponse.getBody();
        assertThat(updatedRoom).isNotNull();
        assertThat(updatedRoom.getDevices()).hasSize(1);
        assertThat(updatedRoom.getDevices().get(0).getName()).isEqualTo("Thermostat");
    }

    @Test
    void testGetRoomWithDevices() {
        ResponseEntity<Room> roomResponse = restTemplate.getForEntity(getRoomBaseUrl() + "/" + testRoom.getId(), Room.class);
        Room fetchedRoom = roomResponse.getBody();
        assertThat(roomResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(fetchedRoom).isNotNull();
        assertThat(fetchedRoom.getDevices()).hasSize(1);
        assertThat(fetchedRoom.getDevices().get(0).getName()).isEqualTo("Light");
    }
}
