package com.projects.smarthouse_backend.service;

import com.projects.smarthouse_backend.model.Device;
import com.projects.smarthouse_backend.model.Room;
import com.projects.smarthouse_backend.model.User;
import com.projects.smarthouse_backend.repository.RoomRepository;
import com.projects.smarthouse_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private UserService userService;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }


    public Room saveRoom(Room room, Long userId) {

        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        room.setUser(user);
        System.out.println(room.toString());

        return roomRepository.save(room);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getRoomsByUserId(Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return roomRepository.findByUser(user.get());
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public List<Device> getDevicesForRoom(Long roomId) {
        return deviceService.getDevicesByRoomId(roomId);
    }
}
