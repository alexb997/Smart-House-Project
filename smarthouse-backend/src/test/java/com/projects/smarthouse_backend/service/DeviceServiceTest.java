package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.DeviceType;
import com.projects.smarthouse_backend.repository.DeviceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DeviceServiceTest {

    @Mock
    private DeviceRepository deviceRepository;

    @InjectMocks
    private DeviceService deviceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllDevices() {
        Device device1 = new Device();
        Device device2 = new Device();
        when(deviceRepository.findAll()).thenReturn(Arrays.asList(device1, device2));

        List<Device> devices = deviceService.getAllDevices();
        assertEquals(2, devices.size());
        verify(deviceRepository, times(1)).findAll();
    }

    @Test
    void testGetDeviceById() {
        Device device = new Device();
        device.setId(1L);
        when(deviceRepository.findById(1L)).thenReturn(Optional.of(device));

        Optional<Device> foundDevice = deviceService.getDeviceById(1L);
        assertTrue(foundDevice.isPresent());
        assertEquals(1L, foundDevice.get().getId());
        verify(deviceRepository, times(1)).findById(1L);
    }

    @Test
    void testGetDevicesByType() {
        Device device1 = new Device();
        device1.setType(DeviceType.LIGHT);
        Device device2 = new Device();
        device2.setType(DeviceType.LIGHT);
        when(deviceRepository.findByType(DeviceType.LIGHT)).thenReturn(Arrays.asList(device1, device2));

        List<Device> devices = deviceService.getDevicesByType(DeviceType.LIGHT);
        assertEquals(2, devices.size());
        verify(deviceRepository, times(1)).findByType(DeviceType.LIGHT);
    }

    @Test
    void testGetDevicesByRoomId() {
        Device device1 = new Device();
        Device device2 = new Device();
        when(deviceRepository.findByRoomId(1L)).thenReturn(Arrays.asList(device1, device2));

        List<Device> devices = deviceService.getDevicesByRoomId(1L);
        assertEquals(2, devices.size());
        verify(deviceRepository, times(1)).findByRoomId(1L);
    }

    @Test
    void testSaveDevice() {
        Device device = new Device();
        when(deviceRepository.save(device)).thenReturn(device);

        Device savedDevice = deviceService.saveDevice(device);
        assertEquals(device, savedDevice);
        verify(deviceRepository, times(1)).save(device);
    }

    @Test
    void testDeleteDevice() {
        deviceService.deleteDevice(1L);
        verify(deviceRepository, times(1)).deleteById(1L);
    }
}
