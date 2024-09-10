package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public ResponseEntity<Room> getRoomById(Long id) {
        Room room = roomRepository.findById(id).orElse(null);
        return room != null ? ResponseEntity.ok(room) : ResponseEntity.notFound().build();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public ResponseEntity<Room> updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id).orElse(null);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }
        room.setName(roomDetails.getName());
        return ResponseEntity.ok(roomRepository.save(room));
    }

    public ResponseEntity<Void> deleteRoom(Long id) {
        Room room = roomRepository.findById(id).orElse(null);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }
        roomRepository.delete(room);
        return ResponseEntity.noContent().build();
    }
}
