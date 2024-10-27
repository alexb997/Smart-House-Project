package com.projects.smarthouse_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        return room.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Room>> getRoomsByUserId(@PathVariable Long userId) {
        try {
            List<Room> rooms = roomService.getRoomsByUserId(userId);
            return ResponseEntity.ok(rooms);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/{roomId}/devices")
    public ResponseEntity<?> getRoomDevices(@PathVariable Long roomId) {
        try {
            Optional<Room> room = roomService.getRoomById(roomId);

            if (room.isPresent()) {
                List<Device> devices = room.get().getDevices();
                return ResponseEntity.ok(devices);
            } else {
                return ResponseEntity.status(404).body("Room with ID " + roomId + " not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving devices for Room ID " + roomId + ": " + e.getMessage());
        }
    }

    @PostMapping("/{userId}")
    public Room createRoom(@PathVariable Long userId,@RequestBody Map<String, Object> requestData) {
        String name = requestData.get("name").toString();
        Room room = new Room();
        room.setName(name);
        return roomService.saveRoom(room, userId);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long roomId, @RequestBody Room room) {
        if (roomService.getRoomById(roomId).isPresent()) {
            room.setId(roomId);
            return ResponseEntity.ok(roomService.saveRoom(room));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        if (roomService.getRoomById(roomId).isPresent()) {
            roomService.deleteRoom(roomId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
