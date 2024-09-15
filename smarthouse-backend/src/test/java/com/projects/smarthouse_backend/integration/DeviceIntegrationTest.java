package com.projects.smarthouse_backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DeviceIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private DeviceRepository deviceRepository;

    private Device device;

    @BeforeEach
    void setup() {
        deviceRepository.deleteAll();  
        device = new Device();
        device.setName("Test Device");
        device.setType(DeviceType.LIGHT);
        device.setStatus(true);
        deviceRepository.save(device);  
    }

    @Test
    void testGetAllDevices() {
        webTestClient.get().uri("/api/devices")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].name").isEqualTo("Test Device")
                .jsonPath("$[0].type").isEqualTo("LIGHT");
    }

    @Test
    void testGetDeviceById() {
        webTestClient.get().uri("/api/devices/{id}", device.getId())
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("Test Device")
                .jsonPath("$.type").isEqualTo("LIGHT");
    }

    @Test
    void testCreateDevice() throws Exception {
        Device newDevice = new Device();
        newDevice.setName("New Device");
        newDevice.setType(DeviceType.LIGHT);
        newDevice.setStatus(false);

        webTestClient.post().uri("/api/devices")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new ObjectMapper().writeValueAsString(newDevice))
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("New Device")
                .jsonPath("$.type").isEqualTo("LIGHT");

        Optional<Device> createdDevice = deviceRepository.findByName("New Device");
        assertThat(createdDevice).isPresent();
        assertThat(createdDevice.get().getType()).isEqualTo(DeviceType.LOCK);
    }

    @Test
    void testUpdateDevice() throws Exception {
        Device updatedDevice = new Device();
        updatedDevice.setName("Updated Device");
        updatedDevice.setType(DeviceType.LOCK);
        updatedDevice.setStatus(true);

        webTestClient.put().uri("/api/devices/{id}", device.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new ObjectMapper().writeValueAsString(updatedDevice))
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.name").isEqualTo("Updated Device")
                .jsonPath("$.type").isEqualTo("LIGHT");

        Optional<Device> updatedInRepo = deviceRepository.findById(device.getId());
        assertThat(updatedInRepo).isPresent();
        assertThat(updatedInRepo.get().getName()).isEqualTo("Updated Device");
    }

    @Test
    void testDeleteDevice() {
        webTestClient.delete().uri("/api/devices/{id}", device.getId())
                .exchange()
                .expectStatus().isNoContent();

        Optional<Device> deletedDevice = deviceRepository.findById(device.getId());
        assertThat(deletedDevice).isNotPresent();
    }
}
