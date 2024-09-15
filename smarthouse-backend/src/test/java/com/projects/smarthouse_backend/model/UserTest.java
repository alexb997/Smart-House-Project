package com.projects.smarthouse_backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

class UserTest {

    private User user;
    private List<Room> rooms;
    private List<Device> devices;

    @BeforeEach
    void setUp() {
        user = new User();
        rooms = new ArrayList<>();
        devices = new ArrayList<>();
    }

    @Test
    void testUserProperties() {
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("password123");

        assertEquals(1L, user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("password123", user.getPassword());
    }

    @Test
    void testUserRoomsRelationship() {
        Room room1 = new Room();
        Room room2 = new Room();

        rooms.add(room1);
        rooms.add(room2);

        user.setRooms(rooms);

        assertEquals(2, user.getRooms().size());
        assertEquals(room1, user.getRooms().get(0));
        assertEquals(room2, user.getRooms().get(1));
    }

    @Test
    void testUserDevicesRelationship() {
        Device device1 = new Device();
        Device device2 = new Device();

        devices.add(device1);
        devices.add(device2);

        user.setDevices(devices);

        assertEquals(2, user.getDevices().size());
        assertEquals(device1, user.getDevices().get(0));
        assertEquals(device2, user.getDevices().get(1));
    }
}
