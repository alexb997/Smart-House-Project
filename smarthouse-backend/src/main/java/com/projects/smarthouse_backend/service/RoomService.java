package com.projects.smarthouse_backend.service;

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

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        room.setName(roomDetails.getName());
        room.setDevices(roomDetails.getDevices());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
