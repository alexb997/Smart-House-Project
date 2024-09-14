package com.projects.smarthouse_backend.controller;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/{roomId}/devices")
    public ResponseEntity<List<Device>> getRoomDevices(@PathVariable Long roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        if (room.isPresent()) {
            return getRoomDevices(roomId);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
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
