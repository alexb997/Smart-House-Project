package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DeviceService deviceService;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public List<Device> getDevicesForRoom(Long roomId) {
        return deviceService.getDevicesByRoomId(roomId);
    }
}
