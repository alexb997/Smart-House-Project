package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.repository.RoomRepository;
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

class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private DeviceService deviceService;

    @InjectMocks
    private RoomService roomService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllRooms() {
        Room room1 = new Room();
        Room room2 = new Room();
        when(roomRepository.findAll()).thenReturn(Arrays.asList(room1, room2));

        List<Room> rooms = roomService.getAllRooms();
        assertEquals(2, rooms.size());
        verify(roomRepository, times(1)).findAll();
    }

    @Test
    void testGetRoomById() {
        Room room = new Room();
        room.setId(1L);
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        Optional<Room> foundRoom = roomService.getRoomById(1L);
        assertTrue(foundRoom.isPresent());
        assertEquals(1L, foundRoom.get().getId());
        verify(roomRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveRoom() {
        Room room = new Room();
        when(roomRepository.save(room)).thenReturn(room);

        Room savedRoom = roomService.saveRoom(room);
        assertEquals(room, savedRoom);
        verify(roomRepository, times(1)).save(room);
    }

    @Test
    void testDeleteRoom() {
        roomService.deleteRoom(1L);
        verify(roomRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetDevicesForRoom() {
        Device device1 = new Device();
        Device device2 = new Device();
        when(deviceService.getDevicesByRoomId(1L)).thenReturn(Arrays.asList(device1, device2));

        List<Device> devices = roomService.getDevicesForRoom(1L);
        assertEquals(2, devices.size());
        verify(deviceService, times(1)).getDevicesByRoomId(1L);
    }
}
