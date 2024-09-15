package com.projects.smarthouse_backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class DeviceTest {

    private Device device;
    private Room room;
    private User user;

    @BeforeEach
    void setUp() {
        device = new Device();
        room = new Room();
        user = new User();
    }

    @Test
    void testDeviceProperties() {
        device.setId(1L);
        device.setName("Test Light");
        device.setType(DeviceType.LIGHT);
        device.setStatus(true);
        device.setBrightness(75);
        device.setTemperature(22);
        device.setMotionDetectionEnabled(false);

        assertEquals(1L, device.getId());
        assertEquals("Test Light", device.getName());
        assertEquals(DeviceType.LIGHT, device.getType());
        assertTrue(device.isStatus());
        assertEquals(75, device.getBrightness());
        assertEquals(22, device.getTemperature());
        assertFalse(device.getMotionDetectionEnabled());
    }

    @Test
    void testDeviceRoomRelationship() {
        device.setRoom(room);
        assertEquals(room, device.getRoom());
    }

    @Test
    void testDeviceUserRelationship() {
        device.setUser(user);
        assertEquals(user, device.getUser());
    }
}
