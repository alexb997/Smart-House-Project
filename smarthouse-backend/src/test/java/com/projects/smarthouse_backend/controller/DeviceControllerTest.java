package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.service.DeviceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DeviceController.class)
class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeviceService deviceService;

    private Device device;

    @BeforeEach
    void setup() {
        device = new Device();
        device.setId(1L);
        device.setName("Test Device");
        device.setType(DeviceType.LIGHT);
        device.setStatus(true);
    }

    @Test
    void getAllDevicesTest() throws Exception {
        when(deviceService.getAllDevices()).thenReturn(Arrays.asList(device));

        mockMvc.perform(get("/api/devices"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(device.getName()));
    }

    @Test
    void getDeviceByIdTest() throws Exception {
        when(deviceService.getDeviceById(1L)).thenReturn(Optional.of(device));

        mockMvc.perform(get("/api/devices/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(device.getName()));
    }

    @Test
    void getDeviceByIdNotFoundTest() throws Exception {
        when(deviceService.getDeviceById(anyLong())).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/devices/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createDeviceTest() throws Exception {
        when(deviceService.saveDevice(any(Device.class))).thenReturn(device);

        mockMvc.perform(post("/api/devices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Test Device\", \"type\": \"LIGHT\", \"status\": true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Device"));
    }

    @Test
    void updateDeviceTest() throws Exception {
        when(deviceService.getDeviceById(1L)).thenReturn(Optional.of(device));
        when(deviceService.saveDevice(any(Device.class))).thenReturn(device);

        mockMvc.perform(put("/api/devices/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Updated Device\", \"type\": \"LIGHT\", \"status\": true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Device"));
    }

    @Test
    void deleteDeviceTest() throws Exception {
        when(deviceService.getDeviceById(1L)).thenReturn(Optional.of(device));

        mockMvc.perform(delete("/api/devices/1"))
                .andExpect(status().isNoContent());
    }
}
