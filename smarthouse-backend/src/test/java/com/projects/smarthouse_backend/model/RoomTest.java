package com.projects.smarthouse_backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

class RoomTest {

    private Room room;
    private User user;
    private List<Device> devices;

    @BeforeEach
    void setUp() {
        room = new Room();
        user = new User();
        devices = new ArrayList<>();
    }

    @Test
    void testRoomProperties() {
        room.setId(1L);
        room.setName("Living Room");

        assertEquals(1L, room.getId());
        assertEquals("Living Room", room.getName());
    }

    @Test
    void testRoomDevicesRelationship() {
        Device device1 = new Device();
        Device device2 = new Device();

        devices.add(device1);
        devices.add(device2);

        room.setDevices(devices);

        assertEquals(2, room.getDevices().size());
        assertEquals(device1, room.getDevices().get(0));
        assertEquals(device2, room.getDevices().get(1));
    }

    @Test
    void testRoomUserRelationship() {
        room.setUser(user);
        assertEquals(user, room.getUser());
    }
}
